import { registerModules } from '@app/modules';
import { handleGlobalErrors, i18n } from '@app/core';
import { navigationService, notificationService } from '@app/services';
import { eventEmitter } from 'react-native-dark-mode';
import { store } from './store';

const bootstrap = async (): Promise<void> => {
	handleGlobalErrors();
	registerModules();
	await i18n.initialize();
	navigationService.initialize();
	notificationService.initialize();

	// subscribe theme changing event
	eventEmitter.on('currentModeChanged', (newMode) => {
		store.dispatch.settings.changeTheme(newMode);
		navigationService.setRootHome();
	});
};

bootstrap();
