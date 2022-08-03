import { Module } from '@cordwork/core';
import { LarkModule } from './lark/lark.module';

@Module({
  imports: [ LarkModule ],
  guilds: [
    ...(process.env.GUILDS || '')?.split(',')
  ],
})
export class App {

}
