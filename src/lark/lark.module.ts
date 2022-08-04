import { Module } from '@cordwork/core';
import { LarkApi } from '../utils/lark.api';
import { SearchCommand } from './search.command';
import { GemsCommand } from './gems.command';

@Module({
	imports: [
		{
			id: LarkApi,
			useValue: new LarkApi(),
		},
	],
	commands: [SearchCommand, GemsCommand],
})
export class LarkModule {

}
