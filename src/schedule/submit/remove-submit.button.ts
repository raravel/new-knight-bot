import { CordWorkClient, CORDWORK_EVENTS, DiscordComponent, Inject } from "@cordwork/core";
import { ButtonBuilder, ButtonStyle, ButtonInteraction, ActionRowBuilder, TextChannel } from "discord.js";

@DiscordComponent()
export class ScheduleRemoveSubmitComponent {

	constructor(
		@Inject(CordWorkClient) private client: CordWorkClient,
	) {}

	create(): ButtonBuilder {
		const builder = new ButtonBuilder()
			.setCustomId('schedule-remove-submit')
			.setStyle(ButtonStyle.Success)
			.setLabel('네, 해체하겠습니다.');
		builder['customId'] = 'schedule-remove-submit';
		return builder;
	}

	async listener(interaction: ButtonInteraction): Promise<void> {
		await interaction.channel?.delete();
		this.client.emit(CORDWORK_EVENTS.READY);
	}
}