import { CordWorkClient, DiscordComponent, Inject } from "@cordwork/core";
import { ActionRowBuilder, APIActionRowComponent, APIButtonComponent, APIModalActionRowComponent, ButtonComponent, ModalBuilder, ModalSubmitInteraction, Role, TextInputBuilder, TextInputStyle } from "discord.js";
import { SignupSubmitComponent } from "./submit.button";
import * as lostark from 'lostark';

const guildList = [
	'기사학원',
	'기사혈석학원',
	'기사혈석지부',
    '기사학원실리안지부',
];

@DiscordComponent()
export class SearchModalComponent {

	constructor(
		@Inject(CordWorkClient) private client: CordWorkClient,
		@Inject(SignupSubmitComponent) private submitComponent: SignupSubmitComponent,
	) {}

	create(): ModalBuilder {
		const desc = new TextInputBuilder()
			.setCustomId('search-input')
			.setLabel('닉네임 입력')
			.setStyle(TextInputStyle.Short);
		const builder = new ModalBuilder()
			.setCustomId('search-my-character')
			.setTitle('내 캐릭터 검색');
		builder.addComponents(
			new ActionRowBuilder()
			.addComponents(desc) as any
		);
		builder['customId'] = 'search-my-character';
		return builder;
	}

	async listener(interaction: ModalSubmitInteraction) {
		const nickname = interaction.fields.getTextInputValue('search-input');
		await interaction.deferReply({ ephemeral: true, });
		const user = await lostark.char(nickname);
		if ( user.status !== 'success' ) {
			await interaction.editReply({
				content: `\`${nickname}\`을(를) 찾을 수 없습니다.`,
			});
			return;
		}
		
		const isClanMember = guildList.includes(user.guild);
		const roles = await interaction.guild?.roles.fetch();
		const guildRole = roles?.find(r => r.name === (isClanMember ? '길드원' : '손님')) as Role;
		const serverRole = roles?.find(r => r.name === user.server) as Role;
		this.submitComponent.set('user', user);
		this.submitComponent.set('guild-role', guildRole);
		this.submitComponent.set('server-role', serverRole);
		await interaction.editReply({
			components: [
				new ActionRowBuilder()
				.addComponents(
					this.submitComponent.create(),
				) as any
			],
			content:
			`아래 캐릭터 정보로 참가하시겠습니까?\n\n` +
			`**닉네임**: ${user.nickname}\n` +
			`**아이템레벨**: ${user.itemLevel}\n` +
			`**서버**: <@&${serverRole?.id}>\n` +
			`**역활**: <@&${guildRole?.id}>`,
		});
	}
}
