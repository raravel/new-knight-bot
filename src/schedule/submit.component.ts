import { DiscordComponent, Inject } from "@cordwork/core";
import { ButtonBuilder, ButtonStyle, ButtonInteraction, TextChannel, ThreadAutoArchiveDuration } from "discord.js";


@DiscordComponent()
export class ScheduleSubmitButtonComponent {
	public data: any = {};

	create(): ButtonBuilder {
		const builder = new ButtonBuilder()
			.setCustomId('schedule-submit-button-builder')
			.setStyle(ButtonStyle.Success)
			.setLabel('레이드 일정 생성');
		builder['customId'] = 'schedule-submit-button-builder';
		return builder;
	}

	dateFormat(date: Date): string {
		return `${date.getMonth()+1}. ${date.getDate()} ${date.getHours()}시 ${date.getMinutes()}분`;
	}

	async listener(interaction: ButtonInteraction): Promise<void> {
		const channel = await interaction.channel?.fetch() as TextChannel;
		await interaction.deferReply({ ephemeral: true });
		const thread = await channel.threads.create({
			name: `${this.dateFormat(this.data.date)} ${this.data.raid}(${this.data.level})`,
			autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
		});
		await interaction.editReply({
			content: `<#${thread.id}> 레이드 일정을 생성했습니다.`,
		});

		await thread.send({
			content:
				`${this.data.dateString}\n` +
				`${this.data.timeString}\n\n` +
				`${this.data.raid}(${this.data.level}) 레이드 스레드입니다.\n`+
				`아래 버튼을 눌러 참여해 주세요.`
		});
	}
}