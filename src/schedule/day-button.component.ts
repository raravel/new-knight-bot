import { DiscordComponent, Inject } from "@cordwork/core";
import { ButtonBuilder, ButtonStyle, ButtonInteraction } from "discord.js";
import { ScheduleDayComponent } from "./day.component";


@DiscordComponent()
export class ScheduleDayButtonComponent {

	constructor(
		@Inject(ScheduleDayComponent) private dayComponent: ScheduleDayComponent,
	) {

	}

	create(): ButtonBuilder {
		const builder = new ButtonBuilder()
			.setCustomId('schedule-day-button-builder')
			.setStyle(ButtonStyle.Primary)
			.setLabel('날짜 입력');
		builder['customId'] = 'schedule-day-button-builder';
		return builder;
	}

	async listener(interaction: ButtonInteraction): Promise<void> {
		const modal = this.dayComponent.create();
		await interaction.showModal(modal);
	}
}