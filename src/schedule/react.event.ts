import {
	DiscordEvent,
	Inject,
	CordWorkClient,
} from "@cordwork/core";
import { MessageReaction, User } from 'discord.js';
import { emojiRole } from "./tunnel";


@DiscordEvent('messageReactionAdd')
export class ScheduleMessageReactionAdd {

	constructor(
		@Inject(CordWorkClient) private client: CordWorkClient,
	) {}

	async listener(reaction: MessageReaction, user: User) {
		const alarm = emojiRole[reaction.emoji.name || ''];
		const guild = reaction.message.guild;
		const role = guild?.roles.cache.find((role) => role.name === alarm);
		const member = guild?.members.cache.find((member) => member.id === user.id);
		role && await member?.roles.add(role);
	}
}

@DiscordEvent('messageReactionRemove')
export class ScheduleMessageReactionRemove {

	constructor(
		@Inject(CordWorkClient) private client: CordWorkClient,
	) {}

	async listener(reaction: MessageReaction, user: User) {
		const alarm = emojiRole[reaction.emoji.name || ''];
		const guild = reaction.message.guild;
		const role = guild?.roles.cache.find((role) => role.name === alarm);
		const member = guild?.members.cache.find((member) => member.id === user.id);
		role && await member?.roles.remove(role);
	}
}