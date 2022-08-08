import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder, TextBasedChannel } from 'discord.js';
import { DiscordCommand, Inject } from '@cordwork/core';
import { LarkApi } from '../utils/lark.api';

@DiscordCommand({
  name: '부캐',
  description: '로스트아크 캐릭터의 부캐 정보를 가져옵니다.',
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: '캐릭터',
      description: '부캐 정보를 가져올 캐릭터 닉네임',
      required: true,
    },
  ],
})
export class CharacterCommand {

  constructor(
    @Inject(LarkApi) private larkApi: LarkApi,
  ) {}
  
  async listener(interaction: CommandInteraction): Promise<void> {
    const nickname = interaction.options.get('캐릭터')?.value as string || '';
    const user = await this.larkApi.getUser(nickname);
    if ( !Number.isNaN(user.life) ) {
      let maxJobLength = 0;
      for ( const { values: chars } of user.characters ) {
        for ( const char of chars ) {
          if ( maxJobLength < char.job.length )
            maxJobLength = char.job.length;
        }
      }
      const msg = new EmbedBuilder()
      .setColor('#c231c4')
      .setTitle(`${user.name}님의 부캐`)
      .addFields(
        ...user.characters.map(({ server, values }) => ({
          name: server,
          value: values.map(({ job, level, nickname }) =>
            `${`${job}`.padEnd(maxJobLength, 'ㅤ')} ⎟ **Lv. ${level}** [${nickname}]`
          ).join('\n'),
        }))
      );

      await interaction.reply({ embeds: [msg] });
    } else {
      await interaction.reply({
        content: `**${nickname}** 유저의 정보를 찾을 수 없습니다.`
      });
    }
  }

}