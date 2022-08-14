import { Interaction, Message, SelectMenuComponentOptionData, Snowflake } from "discord.js";

const RaidCreated: Record<string, true> = {};
const RequestMessages: Record<Snowflake, Message> = {};

export const useRaidCreated = () => RaidCreated;
export const useRequestMessages = () => RequestMessages;
export const emojiRole = {
	'valtan_normal': '알람:발탄노말',
	'valtan_hard': '알람:발탄하드',
	'valtan_hell': '알람:발탄헬',
	'viakiss_normal': '알람:비아노말',
	'viakiss_hard': '알람:비아하드',
	'viakiss_hell': '알람:비아헬',
	'kuku_normal': '알람:쿠크노말',
	'kuku_hell': '알람:쿠크헬',
	'abrel_normal': '알람:아브노말',
	'abrel_hard': '알람:아브하드',
	'akkan_normal': '알람:아칸노말',
	'akkan_hard': '알람:아칸하드',
};

export const RAIDS: SelectMenuComponentOptionData[] = [
	{
		label: '발탄',
		value: 'valtan',
	},
	{
		label: '비아키스',
		value: 'viakiss',
	},
	{
		label: '쿠크세이튼',
		value: 'kuku',
	},
	{
		label: '아브렐슈드',
		value: 'abrel',
	},
	{
		label: '일리아칸',
		value: 'akkan',
	},
];

export const LEVEL: Record<string, SelectMenuComponentOptionData> = {
	'normal': {
		label: '노말',
		value: 'normal',
	},
	'hard': {
		label: '하드',
		value: 'hard',
	},
	'hell': {
		label: '헬',
		value: 'hell',
	},
};

export const RAIDS_LEVEL: Record<string, SelectMenuComponentOptionData[]> = {
	'valtan': [
		LEVEL['normal'],
		LEVEL['hard'],
		LEVEL['hell'],
	],
	'viakiss': [
		LEVEL['normal'],
		LEVEL['hard'],
		LEVEL['hell'],
	],
	'kuku': [
		LEVEL['normal'],
		LEVEL['hell'],
	],
	'abrel': [
		LEVEL['normal'],
		LEVEL['hard'],
	],
	'akkan': [
		LEVEL['normal'],
		LEVEL['hard'],
	],
}