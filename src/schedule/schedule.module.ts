import { Module } from '@cordwork/core';
import { ScheduleSubmitModule } from './submit/submit.module';
import { ScheduleReady } from './ready.event';
import { ScheduleMessageCreate } from './message.event';
import { ScheduleRaidComponent } from './raid.component';
import { ScheduleLevelComponent } from './level.component';
import { ScheduleDayComponent } from './day.component';
import { ScheduleDayButtonComponent } from './day-button.component';
import { ScheduleSubmitButtonComponent } from './submit.component';
import { ScheduleCreateButtonComponent } from './create.component';
import { ScheduleMessageReactionAdd, ScheduleMessageReactionRemove } from './react.event';
import { ScheduleRefreshButtonComponent } from './refresh.component';
import { ScheduleRemoveButtonComponent } from './submit/remove-raid.button';
import { ScheduleRemoveSubmitComponent } from './submit/remove-submit.button';

@Module({
	imports: [ ScheduleSubmitModule ],
	events: [
		ScheduleReady,
		ScheduleMessageCreate,
		ScheduleMessageReactionAdd,
		ScheduleMessageReactionRemove,
	],
	components: [
		ScheduleRemoveSubmitComponent,
		ScheduleRemoveButtonComponent,
		ScheduleSubmitButtonComponent,
		ScheduleDayComponent,
		ScheduleDayButtonComponent,
		ScheduleLevelComponent,
		ScheduleRaidComponent,
		ScheduleCreateButtonComponent,
		ScheduleRefreshButtonComponent,
	],
})
export class ScheduleModule {

}
