import path from 'path';
import got from 'got';
import cheerio from 'cheerio';
import axios from 'axios';
import qs from 'querystring';
import {
    LarkUser,
    LarkGemElement,
    LarkWeaponElement,
    LarkAccessoryElement,
    LarkGem,
    LarkWeapon,
    LarkAccessory,
    LarkSkill,
    LarkBracelet,
} from '../interfaces/lark.interface';


declare global {
    interface String {
        text(): string;
        toCDN(): string;
    }
}


String.prototype.text = function(this: string) {
    return cheerio.load(this.replace(/<br>/ig, '\n')).text().trim();
}

String.prototype.toCDN = function(this: string) {
    return 'https://cdn-lostark.game.onstove.com/' + this;
}

const parseWeapon = (weaponList: LarkWeaponElement[]): LarkWeapon[] =>
    weaponList.map((weapon: LarkWeaponElement) => {
        const obj: any = {};
        const nameTag = weapon.Element_000.value.text();
        const nameTagMatch = nameTag.match(/\+(\d+) (.*)/);
        if ( nameTagMatch ) {
            obj.upgrade = +nameTagMatch[1];
            obj.title = nameTagMatch[2];
        }
        obj.quality = weapon.Element_001.value.qualityValue;
        obj.iconPath = weapon.Element_001.value.slotData.iconPath.toCDN();
        return obj as LarkWeapon;
    });

const parseGems = (gemList: LarkGemElement[]): LarkGem[] =>
    gemList.map((gem: LarkGemElement) => {
        const obj: any = {};
        const itemData = gem.Element_001.value;
        obj.level = +itemData.slotData.rtString.replace('Lv.', '');
        obj.iconPath = itemData.slotData.iconPath.toCDN();
        obj.title = gem.Element_000.value.text();
        const itemPart = (gem.Element_004.value?.Element_001 || (gem.Element_005.value as any)?.Element_001)?.text();
        const m = itemPart.match(/\[(\W+)?\] (.*?) (재사용 대기시간|피해) (.*?)% (\W+)/);

        if ( m ) {
            obj.effect = {
                job: m[1],
                skill: m[2],
                description: m[3],
                value: +m[4],
                description2: m[5],
            };
        }
        return obj as LarkGem;
    });

const parseAccessories = (accessoryList: LarkAccessoryElement[]): LarkAccessory[] =>
    accessoryList.map((accessory: LarkAccessoryElement) => {
        const obj: any = {};
        obj.title = accessory.Element_000.value.text();
        obj.quality = accessory.Element_001.value.qualityValue;
        obj.iconPath = accessory.Element_001.value.slotData.iconPath.toCDN();

        const defaultStatusMatch = accessory.Element_004.value.Element_001.text().match(/(\W+?) \+(\d+)/);
        if ( defaultStatusMatch ) {
            obj.defaultStatus = {
                text: defaultStatusMatch[1],
                value: +defaultStatusMatch[2],
            };
        }

        obj.status = accessory.Element_005.value.Element_001.text().split('\n')
            .map((element: string) => {
                const o = { text: '', value: 0 };
                const m = element.match(/(\W+?) \+(\d+)/);
                if ( m ) {
                    o.text = m[1];
                    o.value = +m[2];
                }
                return o;
            });

        obj.engrave = accessory.Element_006.value.Element_001.text().split('\n')
            .map((element: string) => {
                const o = { text: '', value: 0 };
                const m = element.match(/\[(.*?)\] 활성도 \+(\d+)/);
                if ( m ) {
                    o.text = m[1];
                    o.value = +m[2];
                }
                return o;
            });
        
        return obj as LarkAccessory;
    });

const parseSkillTridpod = (tridpods: any) => {
    if ( !tridpods ) {
        return [];
    }
    return Object.values(tridpods.value)
        .filter((v: any) => !!v.name)
        .map((tridpod: any) => ({
            name: tridpod.name.text(),
            description: tridpod.desc.text(),
            iconPath: tridpod.slotData.iconPath.toCDN(),
            level: +tridpod.tier.text().replace('레벨 ', '').replace(' (최대)', ''),
        }));
}

const parseSkillRune = (rune: any) => {
    if ( !rune ) {
        return;
    }
    const m = rune.value.Element_001.text().match(/\[(.*?)\] (.*)/);
    if ( m ) {
        return {
            name: m[1],
            description: m[2],
        };
    }
}

const parseSkills = (skills: any[]): LarkSkill[] =>
    skills.map((skill: any) => {
        const obj: any = {};
        obj.title = skill.Element_000.value;
        obj.iconPath = skill.Element_001.value.slotData.iconPath.toCDN();
        obj.level = +skill.Element_003.value.replace('스킬 레벨 ', '') || 1;
        obj.tridpods = parseSkillTridpod(
            Object.values(skill)
            .find((v: any) => v.type === 'TripodSkillCustom')
        );
        obj.rune = parseSkillRune(
            Object.values(skill)
            .find((v: any) => v.type === 'ItemPartBox' && v.value?.Element_000.includes('스킬 룬 효과'))
        );
        return obj as LarkSkill;
    });

const parseBracelet = (element) => {
    const obj: any = {};
    obj.title = element.Element_000.value.text();
    obj.values = element.Element_004.value.Element_001.text().split('\n');
    return obj as LarkBracelet;
}

export class LarkApi {

	private schema = 'https://';
	private host = 'lostark.game.onstove.com';

	private async req(url: string, ...args: string[]) {
		args.forEach((arg: string, idx: number) => {
			url = url.replaceAll(`{${idx}}`, qs.escape(arg));
		});

		url = this.schema + path.join(this.host, url);
		let res: any;
		try {
			res = await got.get(url);
		} catch {
			res = await axios.get(url);
			res.body = res.data;
			res.isAxiosRequest = true;
		}
		return res;
	}

	async getUser(name: string): Promise<LarkUser> {
		const res = await this.req('/Profile/Character/{0}', name);
		const $ = cheerio.load(res.body);
		const expLevel = parseInt($('.level-info__expedition').text().match(/Lv\.([0-9,.]*)/)?.[1] as string) || 0;
		const level = parseInt($('.level-info__item').text().match(/Lv\.([0-9,.]*)/)?.[1] as string) || 0;
		const itemLevel = parseFloat($('.level-info2__item').text().match(/Lv\.([0-9,.]*)/)?.[1].replace(',', '') as string) || 0;
		const server = $('.profile-character-info__server').text().replace('@', '');
		const clan = $($('.game-info__guild').children()[1]).text();
		
		const basicTmp = $('.profile-ability-basic ul li span');
		const offense = parseInt($(basicTmp[1]).text());
		const life = parseInt($(basicTmp[3]).text());

		const battle: any[] = [];
		$('.profile-ability-battle ul > li').each((idx, elem) => {
			const child = $(elem).children('span');
			const text = $(child[0]).text();
			const value = parseInt($(child[1]).text());

			if ( text ) {
				battle.push({ text, value });
			}
		});

		const engrave: any[] = [];
		$('.profile-ability-engrave ul.swiper-slide li > span').each((idx, elem) => {
			const m = $(elem).text().match(/(.*)? Lv\. (\d+)/);
			if ( m ) {
				engrave.push({
					text: m[1],
					value: parseInt(m[2]),
				});
			}
		});

        const servers: string[] = [];
        const characters: any[] = [];
        $('#expand-character-list .profile-character-list__server').each((idx, elem) => {
            servers.push($(elem).text());
        });
        $('#expand-character-list .profile-character-list__char').each((idx, e) => {
            const serverCharaters: any[] = [];
            $(e).find('li button').each((idx, elem) => {
                const job = $(elem).children('img').attr('alt');
                const nickname = $(elem).children('span').text().trim();
                const txt = $(elem).text().trim().replace(
                    new RegExp(`${nickname}$`), ''
                );
                let level = 0;
                const m = txt.match(/Lv\.(\d+)/);
                if ( m ) level = +m[1];

                serverCharaters.push({
                    job,
                    level,
                    nickname,
                });
            });
            characters.push({
                server: servers[idx],
                values: serverCharaters,
            });
        });

        const avatarImg = $('#profile-equipment .profile-equipment__character img').attr('src') || '';

        const user: any = {
			engrave,
			battle,
			server,
			expLevel,
			level,
			name,
			clan,
			itemLevel,
			class: $('.profile-character-info__img').attr('alt') as string,
			offense,
			life,
            characters,
            avatarImg,
		};

		{
			const t: any = res.body.match(/<script type="text\/javascript">[\s\S]*?= ([\s\S]*})?;/);
			if ( t ) {
				const profile: any = JSON.parse(t[1] as string);
				const equip = profile['Equip'];

                user.gems = parseGems(
                    Object.entries(equip)
                    .filter(([key]) => key.includes('Gem'))
                    .map(([key, val]) => val) as LarkGemElement[]
                );

                const ignoreGemsList: any[] = Object.entries(equip)
                    .filter(([key]) => /.*?(?<!Gem)_/.test(key))
                    .map(([key, val]) => val);

                const weaponElementList = ignoreGemsList.filter((val: any) => {
                    const element_007 = val?.Element_007?.value?.Element_000;
                    if ( typeof element_007 === 'string' ) {
                        if ( element_007.text() === '세트 효과 레벨' ) {
                            return true;
                        }
                    }

                    const element_008 = val?.Element_008?.value?.Element_000;
                    if ( typeof element_008 === 'string' ) {
                        if ( element_008.text() === '세트 효과 레벨' ) {
                            return true;
                        }
                    }

                    const element_009 = val?.Element_009?.value?.Element_000;
                    if ( typeof element_009 === 'string' ) {
                        if ( element_009.text() === '세트 효과 레벨' ) {
                            return true;
                        }
                    }

                    return false;
                });
                user.weapons = parseWeapon(weaponElementList);

                const accessoryElementList = ignoreGemsList.filter((val) => {
                    return val.Element_004?.value?.Element_000?.text() === '기본 효과' &&
                        val.Element_005?.value?.Element_000?.text() === '추가 효과';
                });
                user.accessories = parseAccessories(accessoryElementList);

                const braceletElement = ignoreGemsList.find((val) => {
                    return val.Element_000?.value?.text().includes('팔찌') &&
                        val.Element_001?.value?.leftStr0?.text().includes('팔찌');
                });
                user.bracelet = parseBracelet(braceletElement);

                const skills = Object.values(profile['Skill']);
                user.skills = parseSkills(skills).filter((skill) => !!skill.rune || skill.level > 1);
			}
		}

		return user as LarkUser;
	}

}
