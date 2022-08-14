import { DiscordComponent, Inject } from "@cordwork/core";
import { ActionRowBuilder, SelectMenuBuilder, SelectMenuComponentOptionData } from "discord.js";
import { ScheduleDayComponent } from "./day.component";
import { ScheduleDayButtonComponent } from "./day-button.component";
import { LEVEL, RAIDS, RAIDS_LEVEL } from './tunnel';




@DiscordComponent()
export class ScheduleLevelComponent {
	private rows: any[] = [];

	constructor(
		@Inject(ScheduleDayButtonComponent) private dayBtnComponent: ScheduleDayButtonComponent,
		@Inject(ScheduleDayComponent) private dayComponent: ScheduleDayComponent,
	) {}


	setRows(rows: any) {
		this.rows = rows;
	}

	create(raid: string): SelectMenuBuilder {
		const builder = new SelectMenuBuilder()
			.setCustomId('schedule-level-builder')
			.setMinValues(1)
			.setMaxValues(1)
			.setPlaceholder('난이도를 선택해 주세요.')
			.addOptions((RAIDS_LEVEL[raid] || []).map((v) => ({ ...v, value: `${raid}/${v.value}` })));
		builder['customId'] = 'schedule-level-builder';
		return builder;
	}

	listener(interaction) {
		const [selected] = interaction.values;
		const [raid, level] = selected.split('/');

		this.rows.push(
			new ActionRowBuilder()
			.addComponents(
				this.create(raid)
					.setDisabled(true)
					.setPlaceholder(LEVEL[level].label)
			)
		);

		this.rows.push(
			new ActionRowBuilder()
			.addComponents(
				this.dayBtnComponent.create()
			)
		);

		this.dayComponent.setData(
			RAIDS.find(r => r.value === raid)?.label || '',
			LEVEL[level].label,
			raid,
			level,
		);

		interaction.update({
			content: 
			'년, 월, 일, 시 분을 지정할 수 있습니다.\n'+
			'년, 월, 분은 생략 가능합니다.\n' +
			'공란이면 지금으로부터 1시간 뒤입니다.\n'+
			'예)\n'+
			'2022년 12월 1일 13시 5분\n'+
			'1일 0시',
			components: this.rows,
		});
	}
}