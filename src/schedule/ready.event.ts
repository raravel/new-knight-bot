import {
	DiscordEvent,
	Inject,
	CordWorkClient,
	CORDWORK_EVENTS,
} from "@cordwork/core";
import { ActionRowBuilder, ButtonComponent, TextChannel } from 'discord.js';
import { ScheduleCreateButtonComponent } from "./create.component";
import { useRequestMessages, emojiRole } from "./tunnel";


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
		this.channels.forEach(async (channel, idx) => {
			const messages = await channel.messages.fetch({ limit: 10 });
			let component = messages.find(message => {
				const button = message?.components[0]?.components[0] as ButtonComponent;
				return button?.customId === 'schedule-create-button-builder-v1';
			});
			if ( !component ) {
				const { threads } = await channel.threads.fetchActive();
				const emojis = Array.from(channel.guild.emojis.cache.values())
				.filter((emoji) => Object.keys(emojiRole).includes(emoji.name || ''));
				component = await channel.send({
					content: 
						`현재 활성화된 레이드 일정입니다.\n`+
						`**레이드 공격대 생성**을 눌러 새로운 일정을 만들 수 있습니다.\n\n` +
						Array.from(threads.values())
						.map((thread) => `<#${thread.id}>`)
						.join('\n') + '\n\n' +
						`아래 이모지들을 눌러서 원하는 레이드의 일정을 알림받을 수 있습니다.\n` +
						emojis.map((emoji) => `<:${emoji.name}:${emoji.id}> - ${emojiRole[emoji.name || '']}`).join('\n'),
					components: [
						row as any,
					],
				});

				await Promise.all(
					emojis.map((emoji) => component?.react(emoji))
				);
			}

			
			

			const reqMsgs = useRequestMessages();
			reqMsgs[channel.id] = component;
		})
	}
}