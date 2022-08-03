import { Module } from '@cordwork/core';
import { LarkApi } from '../utils/lark.api';
import { SearchCommand } from './search.command';

@Module({
	imports: [
		{
			id: LarkApi,
			useValue: new LarkApi(),
		},
	],
	commands: [SearchCommand],
})
export class LarkModule {

}
