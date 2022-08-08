import { DiscordComponent, Inject } from "@cordwork/core";
import { ButtonBuilder, ButtonStyle, ButtonInteraction, ActionRowBuilder } from "discord.js";
import { ScheduleRaidComponent } from "./raid.component";


@DiscordComponent()
export class ScheduleCreateButtonComponent {

	constructor(
		@Inject(ScheduleRaidComponent) private raidComponent: ScheduleRaidComponent,
	) {

	}

	create(): ButtonBuilder {
		const builder = new ButtonBuilder()
			.setCustomId('schedule-create-button-builder-v1')
			.setStyle(ButtonStyle.Primary)
			.setLabel('레이드 공격대 생성');
		builder['customId'] = 'schedule-create-button-builder-v1';
		return builder;
	}

	async listener(interaction: ButtonInteraction): Promise<void> {
		interaction.reply({
			components: [
				new ActionRowBuilder().addComponents(
					this.raidComponent.create()
				) as any
			],
			ephemeral: true,
		});
	}
}