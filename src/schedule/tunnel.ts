import { Interaction, Message, Snowflake } from "discord.js";

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
};