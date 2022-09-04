import { Module } from '@cordwork/core';
import { RiceCalcCommand } from './commands/rice-calc.command';
import { PercentageEvent } from './events/percentage.event';

@Module({
	events: [
		PercentageEvent,
	],
	commands: [
		RiceCalcCommand,
	],
})
export class EtcModule {

}
