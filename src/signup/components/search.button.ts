import { DiscordComponent, Inject } from "@cordwork/core";
import { ButtonBuilder, ButtonStyle, ButtonInteraction, ActionRowBuilder } from "discord.js";
import { SearchModalComponent } from "./search.modal";


@DiscordComponent()
export class SignupSearchButton {

	constructor(
		@Inject(SearchModalComponent) private modalComponent: SearchModalComponent,
	) {

	}

	create(): ButtonBuilder {
		const builder = new ButtonBuilder()
			.setCustomId('signup-button-v1')
			.setStyle(ButtonStyle.Primary)
			.setLabel('내 캐릭터 검색');
		builder['customId'] = 'signup-button-v1';
		return builder;
	}

	async listener(interaction: ButtonInteraction): Promise<void> {
		const modal = this.modalComponent.create();
		await interaction.showModal(modal);
	}
}