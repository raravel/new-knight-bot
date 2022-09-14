import { Module } from '@cordwork/core';
import { HangangCommand } from './commands/hangang.commands';
import { RiceCalcCommand } from './commands/rice-calc.command';
import { PercentageEvent } from './events/percentage.event';

@Module({
	events: [
		PercentageEvent,
	],
	commands: [
		RiceCalcCommand,
		HangangCommand,
	],
})
export class EtcModule {

}
