// https://api.hangang.msub.kr/

import { ApplicationCommandOptionType, Collection, CommandInteraction, EmbedBuilder, GuildMember, Snowflake } from 'discord.js';
import { DiscordCommand, Inject } from '@cordwork/core';
import { random } from '../../utils/shared.utils';
import axios from 'axios';

@DiscordCommand({
  name: '한강',
  description: '현재 한강 물 온도를 불러옵니다.',
})
export class HangangCommand {

  private randomString = [
	'갈 땐 가더라도 보석 주고 가라',
	'아크의 계승자가 떠난다면 아크라시아는 분명 멸망하고 말거다.',
	'한강물에 빠지려거든 다이빙부터 연습하고 와라.',
	'만약 방금전까지 돌을 깎다 왔다면 강화를 눌러보는게 어떤가?',
	'내가 쌓은 스택을 내가 보답받지 않는다면, 다른 누군가가 받게 되어있다.',
	'지금 장기백이 온도의 3배보다 낮다면 아직 살만한 것이다.',
  ];

  constructor(
  ) {}
  
  async listener(interaction: CommandInteraction): Promise<void> {
	const { data } = await axios.get('https://api.hangang.msub.kr/');
	if ( data.status === 'success' ) {
		const str = random(this.randomString);
		const date = new Date();
		const content = `:thermometer: 현재 한강물 온도는 \`${data.temp}°C\`입니다.\n\n`+
			`> ${str}\n\n` +
			`${data.station}에서 ${date.getMonth()+1}월 ${date.getDate()}일 ${data.time}에 측정된 온도입니다.`;
		interaction.reply({ content, ephemeral: false });
	} else {
		interaction.reply({ content: ':sob: 한강물 온도를 불러올 수 없어요.\n아마 지금 들어가면 뒤지지 않을까요?', ephemeral: false });
	}
  }

}