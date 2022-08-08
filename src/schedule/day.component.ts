import { DiscordComponent, Inject } from "@cordwork/core";
import { ActionRowBuilder, ModalBuilder, ModalSubmitInteraction, TextInputBuilder, TextInputStyle } from "discord.js";
import { ScheduleSubmitButtonComponent } from "./submit.component";

const timeIcon = [
	'🕛',
	'🕐',
	'🕑',
	'🕒',
	'🕓',
	'🕔',
	'🕕',
	'🕖',
	'🕗',
	'🕘',
	'🕙',
	'🕚',
	'🕛',
	'🕐',
	'🕑',
	'🕒',
	'🕓',
	'🕔',
	'🕕',
	'🕖',
	'🕗',
	'🕘',
	'🕙',
	'🕚',
];

@DiscordComponent()
export class ScheduleDayComponent {
	private raid = '';
	private level = '';

	constructor(
		@Inject(ScheduleSubmitButtonComponent) private submitComponent: ScheduleSubmitButtonComponent,
	) {}

	create(): ModalBuilder {
		const desc = new TextInputBuilder()
			.setCustomId('schedule-day-desc-builder')
			.setLabel('레이드를 진행할 날짜를 적습니다.')
			.setStyle(TextInputStyle.Short);
		const builder = new ModalBuilder()
			.setCustomId('schedule-day-builder')
			.setTitle('레이드 시간 지정');
		builder.addComponents(
			new ActionRowBuilder()
			.addComponents(desc) as any
		);
		builder['customId'] = 'schedule-day-builder';
		return builder;
	}

	listener(interaction: ModalSubmitInteraction) {
		const day = interaction.fields.getTextInputValue('schedule-day-desc-builder');
		let year: any = day.match(/(\d+)년/);
		year = year ? +year[1] : new Date().getFullYear();

		let month: any = day.match(/(\d+)월/);
		month = month ? +month[1] : new Date().getMonth()+1;

		let date: any = day.match(/(\d+)일/);
		date = date ? +date[1] : new Date().getDate();

		let hour: any = day.match(/(\d+)시/);
		hour = hour ? +hour[1] : new Date().getHours()+1;

		let minute: any = day.match(/(\d+)분/);
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
			dateString: `📆 ${year}년 ${month}월 ${date}일`,
			timeString: `${timeIcon[hour]} ${hour}시 ${minute}분`,
		};


		interaction.reply({
			content:
				`📆 ${year}년 ${month}월 ${date}일\n`+
				`${timeIcon[hour]} ${hour}시 ${minute}분\n` +
				`${this.raid} (${this.level}) 레이드를 진행합니다.\n\n` +
				`지정한 정보가 맞다면 아래 레이드 일정 생성 버튼을 눌러주세요.`,
			components: [
				new ActionRowBuilder()
				.addComponents(this.submitComponent.create()) as any
			],
			ephemeral: true,
		});
	}

	setData(raid: string, level: string) {
		this.raid = raid;
		this.level = level;
	}
}