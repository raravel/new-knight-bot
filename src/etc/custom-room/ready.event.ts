import {
	DiscordEvent,
	Inject,
	CordWorkClient,
	CORDWORK_EVENTS,
} from "@cordwork/core";
import { ActionRowBuilder, ButtonComponent, CategoryChannel, TextChannel, VoiceChannel } from 'discord.js';
import { CreateTableButton } from "./search.button";
import { tableList } from "./tables";

const ONE_DAY = 1000 * 60 * 60 * 24;

@DiscordEvent(CORDWORK_EVENTS.READY)
export class NeriaReadyEvent {

	private channels: TextChannel[] = [];

	constructor(
		@Inject(CordWorkClient) private client: CordWorkClient,
		@Inject(CreateTableButton) private searchButton: CreateTableButton,
	) {}

	private async initialize(): Promise<void> {
		const guilds = await this.client.guilds.fetch();
		for ( const oAuthGuild of guilds.values() ) {
			const guild = await oAuthGuild.fetch();
			const channels = await guild.channels.fetch();
      const neria = await channels.find( channel => channel?.name === '🍺 네리아의 주점' )?.fetch() as CategoryChannel;
      neria?.children.cache.forEach( channel => {
        if ( channel.name !== '🍱새로운테이블' && channel.name !== '🍸 항상 있는 방' ) {
          tableList.push({
            member_timestamp: Date.now(),
            channel: channel as VoiceChannel,
          });
        }
      });
			const channel = channels.find( channel => channel?.name === '🍱새로운테이블' )
			if ( !channel ) continue;
			this.channels.push(
				await channel.fetch() as TextChannel
			);
		}

    setInterval(async () => {
      const idx: number[] = [];
      for ( let i = 0;i < tableList.length;i++ ) {
        const table = await tableList[i].channel.fetch();
        if ( table.members.size === 0 ) {
          if ( tableList[i].member_timestamp + (ONE_DAY) < Date.now() ) {
            idx.unshift(i);
          }
        } else {
          tableList[i].member_timestamp = Date.now();
        }
      }
      for ( let i = 0;i < idx.length;i++ ) {
        const t = idx.shift();
        if ( typeof t === 'number' ) {
          const table = tableList[t];
          await table.channel.delete();
          tableList.splice(t, 1);
        }
      }
    }, 1000 * 10);
	}

	async listener() {
		await this.initialize();
		const row = new ActionRowBuilder()
			.addComponents(
				this.searchButton.create(),
			);
		const chat = {
			components: [
				row as any,
			],
			content:
			`> 어서오세요! 원하는 자리에 앉아주세요.\n\n` +
			`새로운 음성 대화 채널을 만들 수 있습니다.\n` +
			`아래 \`테이블 착석\` 버튼을 눌러 음성 대화 채널을 만들어 보세요.\n` +
      `생성된 음성 채널에 오랫동안 아무도 없으면 네리아가 테이블을 치워버립니다.!`
		};

		this.channels.forEach(async (channel, idx) => {
			const messages = await channel.messages.fetch({ limit: 10 });
			let component = messages.find(message => {
				const button = message?.components[0]?.components[0] as ButtonComponent;
				return button?.customId === 'create-table-v1';
			});
			if ( !component ) {
				component = await channel.send(chat);
			} else {
				await component.edit(chat);
			}
		});
	}
}