import { DiscordComponent, Inject } from "@cordwork/core";
import { ButtonBuilder, ButtonStyle, ButtonInteraction, ActionRowBuilder } from "discord.js";
import { CreateTableModalComponent } from "./search.modal";


@DiscordComponent()
export class CreateTableButton {

	constructor(
		@Inject(CreateTableModalComponent) private modalComponent: CreateTableModalComponent,
	) {

	}

	create(): ButtonBuilder {
		const builder = new ButtonBuilder()
			.setCustomId('create-table-v1')
			.setStyle(ButtonStyle.Primary)
			.setLabel('테이블 착석');
		builder['customId'] = 'create-table-v1';
		return builder;
	}

	async listener(interaction: ButtonInteraction): Promise<void> {
		const modal = this.modalComponent.create();
		await interaction.showModal(modal);
	}
}