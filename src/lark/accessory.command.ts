import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder, TextBasedChannel } from 'discord.js';
import { DiscordCommand, Inject } from '@cordwork/core';
import { LarkApi } from '../utils/lark.api';
import * as lostark from 'lostark';

@DiscordCommand({
  name: '악세',
  description: '로스트아크 캐릭터의 장신구 정보를 검색합니다.',
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: '캐릭터',
      description: '장신구 정보를 가져올 캐릭터 닉네임',
      required: true,
    },
  ],
})
export class AccessoryCommand {

  constructor(
    @Inject(LarkApi) private larkApi: LarkApi,
  ) {}
  
  async listener(interaction: CommandInteraction): Promise<void> {
    const nickname = interaction.options.get('캐릭터')?.value as string || '';
    const user = await lostark.char(nickname);
    if ( user.status !== 'success' ){
      await interaction.reply({
        content: `**${nickname}** 유저의 정보를 찾을 수 없습니다.`
      });
      return;
    }
    const msg = new EmbedBuilder()
    .setColor('#c231c4')
    .setTitle(`${user.nickname}님의 장신구`)
    .addFields(
      ...user.accessory.map((accessory) => ({
        name: `${accessory.name} +${accessory.quality}`,
        value: accessory.status.map((s) => `${s.name} +${s.amount}`).join(`, `) + '\n'
            + accessory.engraves.map((e) => `[${e.name}] +${e.level}`).join('\n'),
      })),
      { name: '\u200B', value: '\u200B' },
      {
        name: user.bracelet?.title || '',
        value: (user.bracelet?.effects || []).join('\n'),
      },
    );

    await interaction.reply({ embeds: [msg] });
  }

}