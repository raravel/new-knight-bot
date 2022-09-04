import { Module } from '@cordwork/core';
import { EtcModule } from './etc/etc.module';
import { LarkModule } from './lark/lark.module';
import { ScheduleModule } from './schedule/schedule.module';
import { SignupModule } from './signup/signup.module';

@Module({
  imports: [
	LarkModule,
	ScheduleModule,
	SignupModule,
	EtcModule,
  ],
  guilds: [
    ...(process.env.GUILDS || '')?.split(',')
  ],
})
export class App {

}
