import { Module } from '@cordwork/core';
import { HangangCommand } from './commands/hangang.commands';
import { RiceCalcCommand } from './commands/rice-calc.command';
import { SynergyCommand } from './commands/synergy.command';
import { UserPickCommand } from './commands/user-pick.command';
import { NeriaReadyEvent } from './custom-room/ready.event';
import { CreateTableButton } from './custom-room/search.button';
import { CreateTableModalComponent } from './custom-room/search.modal';
import { PercentageEvent } from './events/percentage.event';

@Module({
  components: [
    CreateTableModalComponent,
    CreateTableButton,
  ],
	events: [
		PercentageEvent,
    NeriaReadyEvent,
	],
	commands: [
		RiceCalcCommand,
		HangangCommand,
		UserPickCommand,
		SynergyCommand,
	],
})
export class EtcModule {

}
