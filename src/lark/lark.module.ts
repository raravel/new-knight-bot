import { Module } from '@cordwork/core';
import { LarkApi } from '../utils/lark.api';
import { SearchCommand } from './search.command';
import { GemsCommand } from './gems.command';
import { WeaponCommand } from './weapon.command';
import { SkillCommand } from './skill.command';

@Module({
	imports: [
		{
			id: LarkApi,
			useValue: new LarkApi(),
		},
	],
	commands: [
		SearchCommand,
		GemsCommand,
		WeaponCommand,
    SkillCommand,
	],
})
export class LarkModule {

}
