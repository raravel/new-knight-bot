import { Module } from '@cordwork/core';
import { LarkModule } from './lark/lark.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [ LarkModule, ScheduleModule ],
  guilds: [
    ...(process.env.GUILDS || '')?.split(',')
  ],
})
export class App {

}
