import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder, TextBasedChannel } from 'discord.js';
import { DiscordCommand, Inject } from '@cordwork/core';
import { LarkApi } from '../utils/lark.api';

@DiscordCommand({
  name: '아바타',
  description: '로스트아크 캐릭터의 아바타 이미지를 가져옵니다.',
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: '캐릭터',
      description: '아바타를 가져올 캐릭터 닉네임',
      required: true,
    },
  ],
})
export class AvatarCommand {

  constructor(
    @Inject(LarkApi) private larkApi: LarkApi,
  ) {}
  
  async listener(interaction: CommandInteraction): Promise<void> {
    const nickname = interaction.options.get('캐릭터')?.value as string || '';
    const user = await this.larkApi.getUser(nickname);
    if ( !Number.isNaN(user.life) || user.avatarImg ) {
      await interaction.reply({
        content: '아바타 반영은 실시간이 아닙니다.',
        files: [user.avatarImg],
      });
    } else {
      await interaction.reply({
        content: `**${nickname}** 유저의 정보를 찾을 수 없습니다.`
      });
    }
  }

}