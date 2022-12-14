import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder, TextBasedChannel } from 'discord.js';
import { DiscordCommand, Inject } from '@cordwork/core';
import { LarkApi } from '../utils/lark.api';
import * as lostark from 'lostark';

@DiscordCommand({
  name: '장비',
  description: '로스트아크 캐릭터의 장비 정보를 가져옵니다.',
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: '캐릭터',
      description: '정보를 가져올 캐릭터 닉네임',
      required: true,
    },
  ],
})
export class WeaponCommand {

  constructor(
    @Inject(LarkApi) private larkApi: LarkApi,
  ) {}
  
  async listener(interaction: CommandInteraction): Promise<void> {
    const nickname = interaction.options.get('캐릭터')?.value as string || '';
    const user = await lostark.char(nickname);
    if ( user.status === 'success' ) {
      const msg = new EmbedBuilder()
      .setColor('#c231c4')
      .setTitle(`${user.nickname}님의 장비`)
      .addFields(
        {
          name: '\u200B',
          value: user.equipment.map(({ upgrade, name, quality }) => 
            `+${upgrade} ${name} (품질: ${quality})`,
          ).join('\n')
        }
      );

      await interaction.reply({ embeds: [msg] });
    } else {
      await interaction.reply({
        content: `**${nickname}** 유저의 정보를 찾을 수 없습니다.`
      });
    }
  }

}