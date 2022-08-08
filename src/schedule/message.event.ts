import {
	DiscordEvent,
	Inject,
	CordWorkClient,
} from "@cordwork/core";
import { Message, TextChannel } from 'discord.js';
import { useRaidCreated } from "./tunnel";

@DiscordEvent('messageCreate')
export class ScheduleMessageCreate {

	constructor(
		@Inject(CordWorkClient) private client: CordWorkClient,
	) {}

	async listener(message: Message) {
		const raidCreated = useRaidCreated();
		if ( raidCreated[message.content] ) {
			if ( message.deletable ) {
				await message.delete();
			}
			delete raidCreated[message.content];
		}
	}
}