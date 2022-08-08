import {
	DiscordEvent,
	Inject,
	CordWorkClient,
} from "@cordwork/core";
import { Message, TextChannel } from 'discord.js';

@DiscordEvent('messageCreate')
export class ScheduleMessageCreate {

	constructor(
		@Inject(CordWorkClient) private client: CordWorkClient,
	) {}

	async listener(message: Message) {
		console.log('message?', message.content);
	}
}