import { Module } from '@cordwork/core';
import { RiceCalcCommand } from './commands/rice-calc.command';

@Module({
	commands: [
		RiceCalcCommand,
	],
})
export class EtcModule {

}
