import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder, TextBasedChannel } from 'discord.js';
import { DiscordCommand, Inject } from '@cordwork/core';
import { LarkApi } from '../utils/lark.api';
import * as lostark from 'lostark';

const levelEmoji = [
  '0⃣',
  '1⃣',
  '2⃣',
  '3⃣',
  '4⃣',
  '5⃣',
  '6⃣',
  '7⃣',
  '8⃣',
  '9⃣',
  '🔟',
];

@DiscordCommand({
  name: '보석',
  description: '로스트아크 캐릭터의 보석 목록을 가져옵니다.',
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: '캐릭터',
      description: '보석 목록을 가져올 캐릭터 닉네임',
      required: true,
    },
  ],
})
export class GemsCommand {
  
  constructor(
    @Inject(LarkApi) private larkApi: LarkApi,
  ) {}
    
  async listener(interaction: CommandInteraction): Promise<void> {
    const nickname = interaction.options.get('캐릭터')?.value as string || '';
    const user = await lostark.char(nickname);
    if ( user.status === 'success' ) {
      const msg = new EmbedBuilder()
      .setColor('#c231c4')
      .setTitle(`${user.nickname}님의 보석`)
      .addFields(
        ...user.jewels.sort((a, b) => b.level - a.level)
        .map(({ name, effect }) => ({
          name: `${name.includes('멸화') ? '💎' : '📀'}  ${name.replace(/^(\d+)/, (m, p1) => levelEmoji[p1])}`,
          value: effect,
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