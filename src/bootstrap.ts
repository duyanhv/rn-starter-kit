import { registerModules } from '@app/modules';
import { handleGlobalErrors, i18n } from '@app/core';
import { navigationService } from '@app/services';

const bootstrap = async (): Promise<void> => {
	handleGlobalErrors();
	registerModules();
	await i18n.initialize();
	navigationService.initialize();
	// initializeSentry();
};

bootstrap();
