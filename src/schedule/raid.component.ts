import { DiscordComponent, Inject } from "@cordwork/core";
import { SelectMenuInteraction, SelectMenuBuilder, SelectMenuComponentOptionData, ActionRowBuilder } from "discord.js";
import { ScheduleLevelComponent } from "./level.component";
import { cloneDeep } from 'lodash';


const RAIDS: SelectMenuComponentOptionData[] = [
	{
		label: '발탄',
		value: 'valtan',
	},
	{
		label: '비아키스',
		value: 'viakiss',
	},
];

@DiscordComponent()
export class ScheduleRaidComponent {
	constructor(
		@Inject(ScheduleLevelComponent) private levelComponent: ScheduleLevelComponent
	) {}

	create(): SelectMenuBuilder {
		const builder = new SelectMenuBuilder()
			.setCustomId('schedule-builder')
			.setMinValues(1)
			.setMaxValues(1)
			.setPlaceholder('레이드를 선택해 주세요.')
			.addOptions(RAIDS);
		builder['customId'] = 'schedule-builder';
		return builder;
	}

	listener(interaction: SelectMenuInteraction) {
		const [value] = interaction.values;
		const resultComponent = this.create()
			.setDisabled(true)
			.setPlaceholder(RAIDS.find((r) => r.value === value)?.label || 'Unknown');
		const row = [
			new ActionRowBuilder().addComponents(resultComponent),
		];

		this.levelComponent.setRows(cloneDeep(row));
		row.push(
			new ActionRowBuilder()
			.addComponents(
				this.levelComponent.create(value)
			)
		);
		interaction.update({
			components: row as any[],
		})
	}
}