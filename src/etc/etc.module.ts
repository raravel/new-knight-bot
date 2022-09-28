import { Module } from '@cordwork/core';
import { HangangCommand } from './commands/hangang.commands';
import { RiceCalcCommand } from './commands/rice-calc.command';
import { UserPickCommand } from './commands/user-pick.command';
import { PercentageEvent } from './events/percentage.event';

@Module({
	events: [
		PercentageEvent,
	],
	commands: [
		RiceCalcCommand,
		HangangCommand,
		UserPickCommand,
	],
})
export class EtcModule {

}
