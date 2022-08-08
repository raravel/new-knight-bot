import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder, TextBasedChannel } from 'discord.js';
import { DiscordCommand, Inject } from '@cordwork/core';
import { LarkApi } from '../utils/lark.api';

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
    const user = await this.larkApi.getUser(nickname);
    if ( !Number.isNaN(user.life) ) {
      const msg = new EmbedBuilder()
      .setColor('#c231c4')
      .setTitle(`${user.name}님의 장신구`)
      .addFields(
        ...user.accessories.map((accessory) => ({
          name: `${accessory.title} +${accessory.quality}`,
          value: accessory.status.map((s) => `${s.text} +${s.value}`).join(`, `) + '\n'
              + accessory.engrave.map((e) => `[${e.text}] +${e.value}`).join('\n'),
        })),
        { name: '\u200B', value: '\u200B' },
        {
          name: user.bracelet.title,
          value: user.bracelet.values.join('\n'),
        },
      );

      await interaction.reply({ embeds: [msg] });
    } else {
      await interaction.reply({
        content: `**${nickname}** 유저의 정보를 찾을 수 없습니다.`
      });
    }
  }

}