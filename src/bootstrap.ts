import { registerModules } from '@app/modules';
import { handleGlobalErrors, i18n } from '@app/core';
import { navigationService, notificationService } from '@app/services';

const bootstrap = async (): Promise<void> => {
	handleGlobalErrors();
	registerModules();
	await i18n.initialize();
	navigationService.initialize();
	notificationService.initialize();
	// initializeSentry();
};

bootstrap();
