import { CordWorkClient, DiscordComponent, Inject } from "@cordwork/core";
import { ActionRowBuilder, TextChannel, ModalBuilder, ModalSubmitInteraction, ChannelType, TextInputBuilder, TextInputStyle } from "discord.js";
import { tableList } from "./tables";

const emojiList = [
  '🍜', '🍳', '🍲', '🍕', '🍻', '🍷', '🍹', '🍾', '🍶'
];

@DiscordComponent()
export class CreateTableModalComponent {

	constructor(
		@Inject(CordWorkClient) private client: CordWorkClient,
	) {}

	create(): ModalBuilder {
		const desc = new TextInputBuilder()
			.setCustomId('search-input')
			.setLabel('테이블 착석')
			.setStyle(TextInputStyle.Short);
		const builder = new ModalBuilder()
			.setCustomId('table-name')
			.setTitle('테이블 이름');
		builder.addComponents(
			new ActionRowBuilder()
			.addComponents(desc) as any
		);
		builder['customId'] = 'table-name';
		return builder;
	}

	async listener(interaction: ModalSubmitInteraction) {
		const name = interaction.fields.getTextInputValue('search-input');
		await interaction.deferReply({ ephemeral: true, });
    const channel = await interaction.channel?.fetch() as TextChannel;
    const guild = await interaction.guild?.fetch();
    const emoji = emojiList[Math.floor(Math.random() * emojiList.length)];

    const newc = await guild?.channels.create({
      name: `${emoji} ${name}`,
      type: ChannelType.GuildVoice,
      parent: channel?.parentId,
    });

    if ( newc ) {
      tableList.push({
        member_timestamp: Date.now(),
        channel: newc,
      });

      interaction.editReply({
        content: `<#${newc?.id}> 테이블이 준비되었습니다.`,
      });
    }
	}
}
