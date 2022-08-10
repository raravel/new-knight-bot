import { CordWorkClient, DiscordComponent, Inject } from "@cordwork/core";
import { ButtonBuilder, ButtonStyle, ButtonInteraction, TextChannel, ActionRowBuilder, ButtonComponent } from "discord.js";
import { ScheduleCreateButtonComponent } from "./create.component";
import { emojiRole } from "./tunnel";

@DiscordComponent()
export class ScheduleRefreshButtonComponent {
	public data: any = {};
	
	constructor(
		@Inject(CordWorkClient) private client: CordWorkClient,
		@Inject(ScheduleCreateButtonComponent) private createButtonComponent: ScheduleCreateButtonComponent,
	) {}

	create(): ButtonBuilder {
		const builder = new ButtonBuilder()
			.setCustomId('refresh-schedule')
			.setStyle(ButtonStyle.Secondary)
			.setLabel('일정 목록 갱신');
		builder['customId'] = 'refresh-schedule';
		return builder;
	}

	async listener(interaction: ButtonInteraction) {
		const row = new ActionRowBuilder()
			.addComponents(
				this.createButtonComponent.create(),
				this.create()
			);
		const channel = interaction.channel as TextChannel;
		const { threads } = await channel.threads.fetchActive();
		const emojis = Array.from(channel.guild.emojis.cache.values())
		.filter((emoji) => Object.keys(emojiRole).includes(emoji.name || ''));
		const chat = {
			content: 
				`현재 활성화된 레이드 일정입니다.\n`+
				`**레이드 공격대 생성**을 눌러 새로운 일정을 만들 수 있습니다.\n\n` +
				(Array.from(threads.values())
				.map((thread) => `<#${thread.id}>`)
				.join('\n') || '```\n활성화된 레이드가 없습니다.\n```') + '\n\n' +
				`아래 이모지들을 눌러서 원하는 레이드의 일정을 알림받을 수 있습니다.\n` +
				emojis.map((emoji) => `<:${emoji.name}:${emoji.id}> - ${emojiRole[emoji.name || '']}`).join('\n'),
			components: [
				row as any,
			],
		};


		const messages = await channel.messages.fetch({ limit: 10 });
		let component = messages.find(message => {
			const button = message?.components[0]?.components[0] as ButtonComponent;
			return button?.customId === 'schedule-create-button-builder-v1';
		});
		if ( !component ) {
			component = await channel.send(chat);

			await Promise.all(
				emojis.map((emoji) => component?.react(emoji))
			);
		} else {
			await component.edit(chat);
		}
		await interaction.reply({ content: '레이드 일정 목록을 갱신했습니다.', ephemeral: true });
	}
}