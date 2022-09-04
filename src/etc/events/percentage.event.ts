import {
	DiscordEvent,
	Inject,
	CordWorkClient,
} from "@cordwork/core";
import { Message, TextChannel } from 'discord.js';

@DiscordEvent('messageCreate')
export class PercentageEvent {

	constructor(
		@Inject(CordWorkClient) private client: CordWorkClient,
	) {}

	async listener(message: Message) {
		if ( this.client.user?.id === message.author.id ) return;

		if ( message.content.includes('확률') ) {
			const num = Math.floor(Math.random() * 101);
			await message.reply({
				content: `<@${message.author.id}>님이 \`${message.content}\`은(는) 아마도 ${num}% 일까요?`,
			});
		}
	}
}