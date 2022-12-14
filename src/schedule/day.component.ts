import { DiscordComponent, Inject } from "@cordwork/core";
import { ActionRowBuilder, ModalBuilder, ModalSubmitInteraction, TextInputBuilder, TextInputStyle } from "discord.js";
import { ScheduleSubmitButtonComponent } from "./submit.component";

const timeIcon = [
	'π',
	'π',
	'π',
	'π',
	'π',
	'π',
	'π',
	'π',
	'π',
	'π',
	'π',
	'π',
	'π',
	'π',
	'π',
	'π',
	'π',
	'π',
	'π',
	'π',
	'π',
	'π',
	'π',
	'π',
	'π',
];

@DiscordComponent()
export class ScheduleDayComponent {
	private raid = '';
	private level = ''
	private rawRaid = '';
	private rawLevel = '';

	constructor(
		@Inject(ScheduleSubmitButtonComponent) private submitComponent: ScheduleSubmitButtonComponent,
	) {}

	create(): ModalBuilder {
		const desc = new TextInputBuilder()
			.setCustomId('schedule-day-desc-builder')
			.setLabel('λ μ΄λλ₯Ό μ§νν  λ μ§λ₯Ό μ μ΅λλ€.')
			.setStyle(TextInputStyle.Short);
		const builder = new ModalBuilder()
			.setCustomId('schedule-day-builder')
			.setTitle('λ μ΄λ μκ° μ§μ ');
		builder.addComponents(
			new ActionRowBuilder()
			.addComponents(desc) as any
		);
		builder['customId'] = 'schedule-day-builder';
		return builder;
	}

	listener(interaction: ModalSubmitInteraction) {
		const day = interaction.fields.getTextInputValue('schedule-day-desc-builder');
		let year: any = day.match(/(\d+)λ/);
		year = year ? +year[1] : new Date().getFullYear();

		let month: any = day.match(/(\d+)μ/);
		month = month ? +month[1] : new Date().getMonth()+1;

		let date: any = day.match(/(\d+)μΌ/);
		date = date ? +date[1] : new Date().getDate();

		let hour: any = day.match(/(\d+)μ/);
		hour = hour ? +hour[1] : new Date().getHours()+1;

		let minute: any = day.match(/(\d+)λΆ/);
		minute = minute ? +minute[1] : new Date().getMinutes();

		const d = new Date();
		d.setFullYear(year);
		d.setMonth(month-1);
		d.setDate(date);
		d.setHours(hour);
		d.setMinutes(minute);

		this.submitComponent.data = {
			date: d,
			raid: this.raid,
			level: this.level,
			dateString: `π ${year}λ ${month}μ ${date}μΌ`,
			timeString: `${timeIcon[hour]} ${hour}μ ${minute}λΆ`,
			rawRaid: this.rawRaid,
			rawLevel: this.rawLevel,
		};


		interaction.reply({
			content:
				`π ${year}λ ${month}μ ${date}μΌ\n`+
				`${timeIcon[hour]} ${hour}μ ${minute}λΆ\n` +
				`${this.raid} (${this.level}) λ μ΄λλ₯Ό μ§νν©λλ€.\n\n` +
				`μ§μ ν μ λ³΄κ° λ§λ€λ©΄ μλ λ μ΄λ μΌμ  μμ± λ²νΌμ λλ¬μ£ΌμΈμ.`,
			components: [
				new ActionRowBuilder()
				.addComponents(this.submitComponent.create()) as any
			],
			ephemeral: true,
		});
	}

	setData(raid: string, level: string, rawRaid: string, rawLevel: string) {
		this.raid = raid;
		this.level = level;
		this.rawRaid = rawRaid;
		this.rawLevel = rawLevel;
	}
}