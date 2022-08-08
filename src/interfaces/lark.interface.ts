export interface LarkUser {
	name: string;
	clan: string;
	expLevel: number;
	level: number;
	itemLevel: number;
	server: string;
	class: string;
	offense: number;
	life: number;
	battle: { text: string, value: string }[];
	engrave: { text: string, value: string }[];
    gems: LarkGem[];
    weapons: LarkWeapon[];
    accessories: LarkAccessory[];
    skills: LarkSkill[];
    bracelet: LarkBracelet;
    characters: LarkCharacter[];
    avatarImg: string;
}

export type LarkGemElement = {
    Element_000: {
        type: 'NameTagBox';
        value: string; // "<P ALIGN='CENTER'><FONT COLOR='#F99200'>7레벨 홍염의 보석</FONT></P>"
    };

    Element_001: {
        type: 'ItemTitle',
        value: {
            leftStr0: string; //"<FONT SIZE='12'><FONT COLOR='#F99200'>전설 보석</FONT></FONT>",
            leftStr2: string; //"<FONT SIZE='14'>아이템 티어 3</FONT>",
            qualityValue: number;
            rightStr0: string;
            slotData: {
                advBookIcon: number;
                friendship: number;
                iconGrade: number;
                iconPath: string; //'EFUI_IconAtlas/Use/Use_9_62.png',
                imagePath: string;
                islandIcon: number;
                rtString: string; //'Lv.7',
                seal: boolean;
                temporary: number;
                town: number;
                trash: number;
            };
        };
    };

    Element_002: { type: 'MultiTextBox', value: string /*'|거래가능'*/ },
    Element_003: { type: 'SingleTextBox', value: string /*'보석 레벨 7'*/ },
    Element_004: {
        type: 'ItemPartBox',
        value: {
            Element_000: string; //"<FONT COLOR='#A9D0F5'>효과</FONT>",
            Element_001: string; //"[리퍼] <FONT COLOR='#FFD200'>쉐도우 닷</FONT> 재사용 대기시간 14.00% 감소"
        }
    },
    Element_005: {
        type: 'SingleTextBox',
        value: string; //"<FONT SIZE='12'><FONT COLOR='#C24B46'>분해불가</FONT></FONT>"
    }
}

export type LarkWeaponElement = {
    "Element_000": {
        "type": "NameTagBox",
        "value": string; //"<P ALIGN='CENTER'><FONT COLOR='#FA5D00'>+17 메마른 사멸의 밤 대거</FONT></P>"
    },
    "Element_001": {
        "type": "ItemTitle",
        "value": {
            "leftStr0": string; //"<FONT SIZE='12'><FONT COLOR='#FA5D00'>유물 대거</FONT></FONT>",
            "leftStr1": string; //"<FONT SIZE='14'>품질</FONT>",
            "leftStr2": string; //"<FONT SIZE='14'>아이템 레벨 1560 (티어 3)</FONT>",
            "qualityValue": number; //87,
            "rightStr0": string; //"<FONT SIZE='12'><FONT COLOR='#FFD200'>장착중</FONT></FONT>",
            "slotData": {
                "advBookIcon": number; //0,
                "friendship": number; //0,
                "iconGrade": number; //5,
                "iconPath": string; //"EFUI_IconAtlas/DRP_item/DRP_Item_151.png",
                "imagePath": string; //"",
                "islandIcon": number; //0,
                "rtString": string; //"",
                "seal": boolean; //false,
                "temporary": number; //0,
                "town": number; //0,
                "trash": number; //0
            }
        }
    },
    "Element_002": {
        "type": "SingleTextBox",
        "value": string; //"<FONT SIZE='12'>리퍼 전용</FONT>"
    },
    "Element_003": {
        "type": "SingleTextBox",
        "value": string; //"<FONT SIZE='12'>귀속됨</FONT>"
    },
    "Element_004": {
        "type": "MultiTextBox",
        "value": string; //"|<font color='#C24B46'>거래 불가</font>"
    },
    "Element_005": {
        "type": "ItemPartBox",
        "value": {
            "Element_000": string; //"<FONT COLOR='#A9D0F5'>기본 효과</FONT>",
            "Element_001": string; //"무기 공격력 +43696"
        }
    },
    "Element_006": {
        "type": "ItemPartBox",
        "value": {
            "Element_000": string; //"<FONT COLOR='#A9D0F5'>추가 효과</FONT>",
            "Element_001": string; //"추가 피해 +25.14%"
        }
    },
    "Element_007": {
        "type": "Progress",
        "value": {
            "forceValue": string; //"장비 재련 가능",
            "maximum": number; //180000,
            "minimum": number; //0,
            "title": string; //"<FONT SIZE='12'><FONT COLOR='#A9D0F5'>현재 단계 재련 경험치</FONT></FONT>",
            "value": number; //180000,
            "valueType": number; //-1
        }
    },
    "Element_008": {
        "type": "IndentStringGroup",
        "value": {
            "Element_000": {
                "contentStr": {
                    "Element_000": {
                        "bPoint": boolean; //false,
                        "contentStr": string; //"[리퍼] [<FONT COLOR='#FFD200'>디스토션</FONT>] 빠른 준비 <FONT COLOR='#73dc04'>Lv +3</FONT>",
                        "pointType": number; //1
                    },
                    "Element_001": {
                        "bPoint": boolean; // false,
                        "contentStr": string; //"[리퍼] [<FONT COLOR='#FFD200'>사일런트 스매셔</FONT>] 지면 강타 <FONT COLOR='#73dc04'>Lv +3</FONT>",
                        "pointType": number; //1
                    },
                    "Element_002": {
                        "bPoint": boolean; //false,
                        "contentStr": string; //"[리퍼] [<FONT COLOR='#FFD200'>라스트 그래피티</FONT>] 급소 타격 <FONT COLOR='#73dc04'>Lv +3</FONT>",
                        "pointType": number; //1
                    }
                },
                "topStr": string; //"<FONT COLOR='#A9D0F5'>트라이포드 효과</FONT>"
            }
        }
    },
    "Element_009": {
        "type": "ItemPartBox",
        "value": {
            "Element_000": string; //"<FONT COLOR='#A9D0F5'>세트 효과 레벨</FONT>",
            "Element_001": string; //"사멸 <FONT COLOR='#FFD200'>Lv.2</FONT>"
        }
    },
    "Element_010": {
        "type": "IndentStringGroup",
        "value": {
            "Element_000": {
                "contentStr": {
                    "Element_000": {
                        "bPoint": boolean; //false,
                        "contentStr": string; //"<font size='12'>사멸 (대거)</font> [<FONT COLOR='#FFD200'>Lv.2</FONT>]"
                    },
                    "Element_001": {
                        "bPoint": boolean; //false,
                        "contentStr": string; //"<font size='12'>사멸 (머리 방어구)</font> [<FONT COLOR='#FFD200'>Lv.2</FONT>]"
                    },
                    "Element_002": {
                        "bPoint": boolean; //false,
                        "contentStr": string; //"<font size='12'>사멸 (상의)</font> [<FONT COLOR='#FFD200'>Lv.1</FONT>]"
                    },
                    "Element_003": {
                        "bPoint": boolean; //false,
                        "contentStr": string; //"<font size='12'>사멸 (하의)</font> [<FONT COLOR='#FFD200'>Lv.2</FONT>]"
                    },
                    "Element_004": {
                        "bPoint": boolean; //false,
                        "contentStr": string; //"<font size='12'>사멸 (장갑)</font> [<FONT COLOR='#FFD200'>Lv.2</FONT>]"
                    },
                    "Element_005": {
                        "bPoint": boolean; //false,
                        "contentStr": string; //"<font size='12'>사멸 (어깨 방어구)</font> [<FONT COLOR='#FFD200'>Lv.2</FONT>]"
                    }
                },
                "topStr": string; //"<font size='14'><font color='#91fe02'>사멸</font></font>"
            },
            "Element_001": {
                "contentStr": {
                    "Element_000": {
                        "bPoint": boolean; //true,
                        "contentStr": string; //"<font size='12'><font color='#ffffff'>치명타 피해가 <FONT COLOR='#99FF99'>20%</FONT> 증가한다.<BR>백어택 및 헤드어택 공격 적중 시 치명타 피해 증가 수치가 <FONT COLOR='#99FF99'>60%</FONT>로 적용된다.</font></font>"
                    }
                },
                "topStr": string; //"<font size='14'><font color='#91fe02'>2 세트 효과<BR>[<font size='14'><font color='#aaaaaa'>Lv.1 / <FONT COLOR='#FFD200'>Lv.2</FONT> / Lv.3</font></font>]</font></font>"
            },
            "Element_002": {
                "contentStr": {
                    "Element_000": {
                        "bPoint": boolean; //true,
                        "contentStr": string; //"<font size='12'><font color='#ffffff'>치명타 적중률이 <FONT COLOR='#99FF99'>20%</FONT> 증가한다.</font></font>"
                    }
                },
                "topStr": string; //"<font size='14'><font color='#91fe02'>4 세트 효과<BR>[<font size='14'><font color='#aaaaaa'>Lv.1 / <FONT COLOR='#FFD200'>Lv.2</FONT> / Lv.3</font></font>]</font></font>"
            },
            "Element_003": {
                "contentStr": {
                    "Element_000": {
                        "bPoint": boolean; //true,
                        "contentStr": string; //"<font size='12'><font color='#ffffff'>적에게 주는 피해가 <FONT COLOR='#99ff99'>7%</FONT> 증가한다.<BR>백어택 및 헤드어택 공격 적중 시 적에게 주는 피해 수치가 <FONT COLOR='#99ff99'>21%</FONT>로 적용된다.</font></font>"
                    }
                },
                "topStr": string; //"<font size='14'><font color='#91fe02'>6 세트 효과<BR>[<font size='14'><font color='#aaaaaa'><FONT COLOR='#FFD200'>Lv.1</FONT> / Lv.2 / Lv.3</font></font>]</font></font>"
            }
        }
    },
    "Element_011": {
        "type": "SingleTextBox",
        "value": string; //"<FONT SIZE='12'><FONT COLOR='#C24B46'>분해불가</FONT>, <FONT COLOR='#C24B46'>전승 재료로 사용 불가</FONT></FONT>"
    },
    "Element_012": {
        "type": "SingleTextBox",
        "value": string; //"<Font color='#5FD3F1'>[세트 업그레이드] </font>"
    },
    "Element_013": {
        "type": "ShowMeTheMoney",
        "value": string; //"<FONT SIZE='12'><FONT COLOR='#FFFFFF'>내구도 <FONT COLOR='#FFFFFF'>149 / 169</FONT></FONT></FONT>|"
    }
}

export type LarkAccessoryElement = {
    "Element_000": {
        "type": "NameTagBox",
        "value": string; //"<P ALIGN='CENTER'><FONT COLOR='#FA5D00'>울부짖는 혼돈의 목걸이</FONT></P>"
    },
    "Element_001": {
        "type": "ItemTitle",
        "value": {
            "leftStr0": string; //"<FONT SIZE='12'><FONT COLOR='#FA5D00'>유물 목걸이</FONT></FONT>",
            "leftStr1": string; //"<FONT SIZE='14'>품질</FONT>",
            "leftStr2": string; //"<FONT SIZE='14'>아이템 티어 3</FONT>",
            "qualityValue": number; //94,
            "rightStr0": string; //"<FONT SIZE='12'><FONT COLOR='#FFD200'>장착중</FONT></FONT>",
            "slotData": {
                "advBookIcon": number; //0,
                "friendship": number; //0,
                "iconGrade": number; //5,
                "iconPath": string; //"EFUI_IconAtlas/Acc/Acc_212.png",
                "imagePath": string; //"",
                "islandIcon": number; //0,
                "rtString": string; //"",
                "seal": boolean; //false,
                "temporary": number; //0,
                "town": number; //0,
                "trash": number; //0
            }
        }
    },
    "Element_002": {
        "type": "SingleTextBox",
        "value": string; //"<FONT SIZE='12'>귀속됨<BR>거래 <FONT COLOR='#FFD200'>2</FONT>회 가능<BR><FONT COLOR='#C24B46'>거래 제한 아이템 레벨</FONT> 1415</FONT>"
    },
    "Element_003": {
        "type": "MultiTextBox",
        "value": string; //"|거래가능"
    },
    "Element_004": {
        "type": "ItemPartBox",
        "value": {
            "Element_000": string; //<FONT COLOR='#A9D0F5'>기본 효과</FONT>",
            "Element_001": string; //<FONT COLOR='#686660'>힘 +9872</FONT><BR>민첩 +9872<BR><FONT COLOR='#686660'>지능 +9872</FONT><BR>체력 +2848"
        }
    },
    "Element_005": {
        "type": "ItemPartBox",
        "value": {
            "Element_000": string; //"<FONT COLOR='#A9D0F5'>추가 효과</FONT>",
            "Element_001": string; //"특화 +492<BR>신속 +497"
        }
    },
    "Element_006": {
        "type": "ItemPartBox",
        "value": {
            "Element_000": string; //<FONT COLOR='#A9D0F5'>무작위 각인 효과</FONT>",
            "Element_001": string; //[<FONT COLOR='#FFFFAC'>기습의 대가</FONT>] 활성도 +5<BR>[<FONT COLOR='#FFFFAC'>저주받은 인형</FONT>] 활성도 +3<BR>[<FONT COLOR='#FE2E2E'>공격속도 감소</FONT>] 활성도 +1"
        }
    },
    "Element_007": {
        "type": "SingleTextBox",
        "value": string; //"<FONT SIZE='12'><FONT COLOR='#C24B46'>품질 업그레이드 불가</FONT></FONT>"
    },
    "Element_008": {
        "type": "SingleTextBox",
        "value": string; //"<Font color='#5FD3F1'>[군단장 레이드] 마수군단장 발탄</font><BR><Font color='#5FD3F1'>[군단장 레이드] 욕망군단장 비아키스</font><BR><Font color='#5FD3F1'>[군단장 레이드] 광기군단장 쿠크세이튼</font><BR><Font color='#5FD3F1'>그 외에 획득처가 더 존재합니다.</FONT>"
    }
}

export type LarkSkillElement = {
    "Element_000": {
        "type": "NameTagBox",
        "value": string; //"나이트메어"
    },
    "Element_001": {
        "type": "CommonSkillTitle",
        "value": {
            "leftText": string; //"<FONT SIZE='12'>재사용 대기시간 12초</FONT>",
            "level": string; //"<FONT SIZE='12'><FONT COLOR='#B7DEE8'><FONT COLOR='#008000'>[단검 스킬]</FONT></FONT></FONT>",
            "middleText": string; //"",
            "name": string; //"<FONT SIZE='12'><FONT SIZE='14' COLOR='#00ADEC'>체인</FONT></FONT>",
            "slotData": {
                "iconGrade": number; //0,
                "iconPath": string; //"EFUI_IconAtlas/RP_Skill/RP_Skill_01_6.png",
                "imagePath": string; //""
            }
        }
    },
    "Element_002": {
        "type": "MultiTextBox",
        "value": string; //"|<FONT COLOR='#3C78FF'>PvE</FONT>"
    },
    "Element_003": {
        "type": "SingleTextBox",
        "value": string; //"스킬 레벨 10"
    },
    "Element_004": {
        "type": "SingleTextBox",
        "value": string; //"<FONT COLOR='#efefdf'><FONT SIZE='11'>마우스 방향으로 단검을 던져 <FONT COLOR='#ffbb00'>269561</FONT>의 피해를 주고 단검에 맞은 대상과 리퍼와의 거리에 장애물이 없다면, 스킬을 다시 한번 입력 시 대상의 반대쪽으로 이동한다. 이동 후 이동속도가 <FONT COLOR='#ffff99'>2</FONT>초 동안 <FONT COLOR='#99ff99'>10%</FONT> 증가한다.</FONT></FONT><BR><FONT SIZE='12'><FONT COLOR='#EEA839'>공격 타입 : 백 어택</FONT></FONT><BR><FONT SIZE='12'><FONT COLOR='#EEA839'>카운터 : 가능</FONT></FONT>"
    },
    "Element_005": {
        "type": "TripodSkillCustom",
        "value": {
            "Element_000": {
                "desc": string; //"<font color='#FFFDE7'>단검 공격에 '부식 독'을 부여한다. 부식 독은 <FONT COLOR='#ffff99'>8.0</FONT>초 동안 매 초마다  <FONT COLOR='#00ccff'>5272</FONT>의 중독 피해를 주며, 최대 <FONT COLOR='#ffff99'>3</FONT>회까지 중첩된다. 또한 독에 걸린 적에게 '부식화'를 부여하여 <FONT COLOR='#ffff99'>12.0</FONT>초간 모든 방어력을 <FONT COLOR='#99ff99'>12.0%</FONT> 감소시킨다.</font>",
                "lock": boolean; //false,
                "name": string; //"<font color='#FFBB63'>독 : 부식</font>",
                "slotData": {
                    "iconGrade": number; //10,
                    "iconPath": string; //"EFUI_IconAtlas/Tripod_Tier/Tripod_Tier_1_113.png",
                    "imagePath": string; //""
                },
                "tier": string; //"<font color='#FFD200'>레벨 1 (최대)</font>"
            },
            "Element_001": {
                "desc": string; //"<font color='#FFFDE7'>재사용 대기시간이 <FONT COLOR='#99ff99'>5.0</FONT>초 감소한다.</font>",
                "lock": boolean; //false,
                "name": string; //"<font color='#FFBB63'>빠른 준비</font>",
                "slotData": {
                    "iconGrade": number; //10,
                    "iconPath": string; //"EFUI_IconAtlas/Tripod_Tier/Tripod_Tier_2_56.png",
                    "imagePath": string; //""
                },
                "tier": string; //"<font color='#FFD200'>레벨 5 (최대)</font>"
            },
            "Element_002": {
                "desc": string; //"<font color='#FFFDE7'>이동 시 추가로 주변 <FONT COLOR='#99ff99'>3.0m</FONT>를 내려찍어 기본 피해량의 <FONT COLOR='#99ff99'>30.0%</FONT> 피해를 주며, <FONT COLOR='#ffff99'>카운터 어택</FONT>이 가능하다.</font>",
                "lock": boolean; //false,
                "name": string; //"<font color='#FFBB63'>배후 공격</font>",
                "slotData": {
                    "iconGrade": number; //10,
                    "iconPath": string; //"EFUI_IconAtlas/Tripod_Tier/Tripod_Tier_3_101.png",
                    "imagePath": string; //""
                },
                "tier": string; //"<font color='#FFD200'>레벨 1</font>"
            }
        }
    },
    "Element_006": {
        "type": "ItemPartBox",
        "value": {
            "Element_000": string; //"<FONT COLOR='#A9D0F5'>스킬 룬 효과</FONT>",
            "Element_001": string; //"[<FONT COLOR='#F99200'>단죄</FONT>] 스킬 적중 시 40% 확률로 자신에게 3초간 지속되는 '단죄' 상태 부여하며 해당 상태 일 때 '심판' 을 통해 추가 효과를 발동"
        }
    },
    "Element_007": {
        "type": string; //"BlinkLineStart",
        "value": boolean; //true
    },
    "Element_008": {
        "type": "SingleTextBox",
        "value": string; //"다음 스킬 레벨 11"
    },
    "Element_009": {
        "type": "MultiTextBox",
        "value": string; //"|<FONT COLOR='#808080'>필요 레벨</FONT> 55"
    },
    "Element_010": {
        "type": "MultiTextBox",
        "value": string; //"|<FONT COLOR='#808080'>필요 스킬 포인트 </FONT>6"
    },
    "Element_011": {
        "type": "SingleTextBox",
        "value": string; //"<FONT COLOR='#efefdf'><FONT SIZE='11'>마우스 방향으로 단검을 던져 <FONT COLOR='#ffbb00'>293112</FONT>의 피해를 주고 단검에 맞은 대상과 리퍼와의 거리에 장애물이 없다면, 스킬을 다시 한번 입력 시 대상의 반대쪽으로 이동한다. 이동 후 이동속도가 <FONT COLOR='#ffff99'>2</FONT>초 동안 <FONT COLOR='#99ff99'>10%</FONT> 증가한다.</FONT></FONT><BR><FONT SIZE='12'><FONT COLOR='#EEA839'>공격 타입 : 백 어택</FONT></FONT>"
    },
    "Element_012": {
        "type": "BlinkLineEnd",
        "value": boolean; //true
    }
}

export type LarkGem = {
    level: string;
    iconPath: string;
    title: string;
    effect: {
      job: string;
      skill: string;
      description: string;
      value: number;
      description2: string;
    };
}

export type LarkWeapon = {
    upgrade: number;
    title: string;
    quality: number;
    iconPath: string;
}

export type LarkAccessory = {
    title: string;
    quality: number;
    iconPath: string;
    defaultStatus: {
        text: string;
        value: number;
    };
    status: { text: string; value: number; }[];
    engrave: { text: string; value: number; }[];
}

export type LarkSkill = {
    title: string;
    iconPath: string;
    level: number;
    tridpods: {
        name: string;
        description: string;
        iconPath: string;
        level: number;
    }[];
    rune: {
        name: string;
        description: string;
    };
}

export type LarkBracelet = {
    title: string;
    values: string[];
}

export type LarkCharacter = {
    server: string;
    values: LarkCharacterItem[];
}

export type LarkCharacterItem = {
    job: string;
    level: number;
    nickname: string;
}