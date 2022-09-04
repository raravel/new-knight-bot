import { ApplicationCommandOptionType, Collection, CommandInteraction, EmbedBuilder, GuildMember, Snowflake } from 'discord.js';
import { DiscordCommand, Inject } from '@cordwork/core';

@DiscordCommand({
  name: '분배금',
  description: '경매 최적가를 계산합니다.',
  options: [
    {
      type: ApplicationCommandOptionType.Integer,
      name: '금액',
      description: '거래소 최저가 금액',
      required: true,
    },
  ],
})
export class RiceCalcCommand {

  constructor(
  ) {}
  
  async listener(interaction: CommandInteraction): Promise<void> {
	const number = interaction.options.get('금액')?.value as number || 0;
	if ( number > 0 ) {
		const people4 = Math.floor(number * 0.95 * (3/4));
		const people8 = Math.floor(number * 0.95 * (7/8)); 
		const people16 = Math.floor(number * 0.95 * (15/16));

		interaction.reply({
			content: `:yum:  맛있는 아이템이 나왔나요?\n\n` +
			`4인  입찰가 : ${people4}골드\n` +
			`8인  입찰가 : ${people8}골드\n` +
			`16인 입찰가 : ${people16}골드`,
		});
	} else {
		interaction.reply({ content: '금액 입력이 잘못되었습니다.', ephemeral: true });
	}
  }

}