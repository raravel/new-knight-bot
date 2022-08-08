import {
	DiscordEvent,
	Inject,
	CordWorkClient,
	CORDWORK_EVENTS,
} from "@cordwork/core";
import { ActionRowBuilder, ButtonComponent, TextChannel } from 'discord.js';
import { ScheduleCreateButtonComponent } from "./create.component";

@DiscordEvent(CORDWORK_EVENTS.READY)
export class ScheduleReady {

	private channels: TextChannel[] = [];

	constructor(
		@Inject(CordWorkClient) private client: CordWorkClient,
		@Inject(ScheduleCreateButtonComponent) private createButtonComponent: ScheduleCreateButtonComponent,
	) {}

	private async initialize(): Promise<void> {
		const guilds = await this.client.guilds.fetch();
		for ( const oAuthGuild of guilds.values() ) {
			const guild = await oAuthGuild.fetch();
			const channels = await guild.channels.fetch();
			const channel = channels.find( channel => channel.name === '모험가길드' )
			if ( !channel ) continue;
			this.channels.push(
				await channel.fetch() as TextChannel
			);
		}
	}

	async listener() {
		await this.initialize();
		const row = new ActionRowBuilder()
			.addComponents(this.createButtonComponent.create());
		this.channels.forEach(async channel => {
			const messages = await channel.messages.fetch({ limit: 10 });
			const component = messages.find(message => {
				const button = message?.components[0]?.components[0] as ButtonComponent;
				return button?.customId === 'schedule-create-button-builder-v1';
			});
			if ( !component ) {
				await channel.send({
					components: [
						row as any,
					],
				})
			}
		})
	}
}