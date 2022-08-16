import { Module } from '@cordwork/core';
import { SignupReadyEvent } from './events/signup.ready';
import { SignupSearchButton } from './components/search.button';
import { SignupSubmitComponent } from './components/submit.button';
import { SearchModalComponent } from './components/search.modal';
import { RemoveUserCommand } from './remove-role.command';

@Module({
	components: [
		SignupSubmitComponent,
		SearchModalComponent,
        SignupSearchButton,
	],
	events: [
		SignupReadyEvent,
	],
	commands: [
		RemoveUserCommand,
	],
})
export class SignupModule {

}
