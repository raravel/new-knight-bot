import { Module } from '@cordwork/core';
import { LarkApi } from '../utils/lark.api';
import { SearchCommand } from './search.command';
import { GemsCommand } from './gems.command';
import { WeaponCommand } from './weapon.command';
import { SkillCommand } from './skill.command';
import { AccessoryCommand } from './accessory.command';
import { CharacterCommand } from './char.command';
import { AvatarCommand } from './avatar.command';

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
    AccessoryCommand,
    CharacterCommand,
    AvatarCommand,
  ],
})
export class LarkModule {

}
