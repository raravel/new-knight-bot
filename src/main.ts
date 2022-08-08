import { CordWork } from '@cordwork/core';
import { App } from './app.module';

async function bootstrap() {
  const client = await new CordWork({
      intents: [
        'GuildMessages',
        'GuildMessageReactions',
        'GuildMessageReactions',
        'MessageContent',
      ]
    })
    .SetToken(process.env.BOT_TOKEN || '')
    .SetAppModule(App)
    .Launch();
}
bootstrap();
