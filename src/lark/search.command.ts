import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder, TextBasedChannel } from 'discord.js';
import { DiscordCommand, Inject } from '@cordwork/core';
import { LarkApi } from '../utils/lark.api';

@DiscordCommand({
  name: '정보',
  description: '로스트아크 캐릭터의 정보를 검색합니다.',
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: '캐릭터',
      description: '정보를 가져올 캐릭터 닉네임',
      required: true,
    },
  ],
})
export class SearchCommand {

  constructor(
    @Inject(LarkApi) private larkApi: LarkApi,
  ) {}
  
  async listener(interaction: CommandInteraction): Promise<void> {
    const nickname = interaction.options.get('캐릭터')?.value as string || '';
    const user = await this.larkApi.getUser(nickname);
    if ( !Number.isNaN(user.life) ) {
      const msg = new EmbedBuilder()
      .setColor('#c231c4')
      .setTitle(`${user.name}님의 정보`)
      .addFields(
        {
          name: '기본 정보',
          value: `서버: ${user.server}\n` +
              `전투: Lv. ${user.level}\n` +
              `원정대: Lv. ${user.expLevel}\n` +
              `아이템: Lv. ${user.itemLevel}`,
          inline: true
        },
        {
          name: '기본 특성',
          value: `공격력: ${user.offense}\n` +
              `최대 생명력: ${user.life}\n`,
          inline: true,
        },
        {
          name: '길드',
          value: '```yaml\n'+
            user.clan + '\n'+
            '```',
          inline: true
        },
      )
      .addFields({ name: '\u200B', value: '\u200B' })
      .addFields(
        {
          name: '전투 특성',
          value: user.battle
            .map(({ text, value }) => `${text} +${value}`)
            .join('\n'),
          inline: true
        },
        { name: '\u200B', value: '\u200B', inline: true },
        {
          name: '장착 각인',
          value: user.engrave
            .map(({ text, value }) => `${text} +${value}`)
            .join('\n'),
          inline: true,
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