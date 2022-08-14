import {
	DiscordEvent,
	Inject,
	CordWorkClient,
	CORDWORK_EVENTS,
} from "@cordwork/core";
import { ActionRowBuilder, ButtonComponent, TextChannel } from 'discord.js';
import { SignupSearchButton } from "../components/search.button";

@DiscordEvent(CORDWORK_EVENTS.READY)
export class SignupReadyEvent {

	private channels: TextChannel[] = [];

	constructor(
		@Inject(CordWorkClient) private client: CordWorkClient,
		@Inject(SignupSearchButton) private searchButton: SignupSearchButton,
	) {}

	private async initialize(): Promise<void> {
		const guilds = await this.client.guilds.fetch();
		for ( const oAuthGuild of guilds.values() ) {
			const guild = await oAuthGuild.fetch();
			const channels = await guild.channels.fetch();
			const channel = channels.find( channel => channel.name === '레온하트' )
			if ( !channel ) continue;
			this.channels.push(
				await channel.fetch() as TextChannel
			);
		}
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
			`> 이봐 들었어? 기사학원에 새로운 모험가가 나타났대!\n\n` +
			`안녕하세요. **기사학원** 디스코드방에 오신 것을 환영합니다.\n` +
			`무분별한 가입을 방지하기 위해 간단한 모험가분의 인증 절차가 필요합니다.\n` +
			`아래 \`내 캐릭터 검색\` 버튼을 눌러 본인의 캐릭터를 검색해 주세요.`,
		};

		this.channels.forEach(async (channel, idx) => {
			const messages = await channel.messages.fetch({ limit: 10 });
			let component = messages.find(message => {
				const button = message?.components[0]?.components[0] as ButtonComponent;
				return button?.customId === 'signup-button-v1';
			});
			if ( !component ) {
				component = await channel.send(chat);
			} else {
				await component.edit(chat);
			}
		});
	}
}