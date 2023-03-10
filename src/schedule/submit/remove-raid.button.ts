import { CordWorkClient, DiscordComponent, Inject } from "@cordwork/core";
import { ButtonBuilder, ButtonStyle, ButtonInteraction, ActionRowBuilder, TextChannel } from "discord.js";
import { ScheduleRemoveSubmitComponent } from "./remove-submit.button";

@DiscordComponent()
export class ScheduleRemoveButtonComponent {

	constructor(
		@Inject(CordWorkClient) private client: CordWorkClient,
		@Inject(ScheduleRemoveSubmitComponent) private submitButton: ScheduleRemoveSubmitComponent,
	) {}

	create(): ButtonBuilder {
		const builder = new ButtonBuilder()
			.setCustomId('schedule-remove-button')
			.setStyle(ButtonStyle.Danger)
			.setLabel('공격대 해체');
		builder['customId'] = 'schedule-remove-button';
		return builder;
	}

	async listener(interaction: ButtonInteraction): Promise<void> {
		const messages = await (interaction.channel as TextChannel)?.messages.fetchPinned();
		const message = (messages as any).find((message) => 
			!!message
			.components
			.find((component) =>
				component
				.components[0]
				.customId === 'schedule-remove-button'
			)
		);

		if ( message ) {
			const [org, userId] = message.content.match(/생성자: <@(\d+)>/) as RegExpMatchArray;
			if ( userId === interaction.user.id ) {
				await interaction.reply({
					content: '공격대를 해산하시겠습니까?',
					ephemeral: true,
					components: [
						new ActionRowBuilder()
						.addComponents(
							this.submitButton.create()
						) as any,
					],
				});
			} else {
				await interaction.reply({
					content: '공격대를 해산할 권한이 없습니다.',
					ephemeral: true,
				});
			}
		}
	}
}