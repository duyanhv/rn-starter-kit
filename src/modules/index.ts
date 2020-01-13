// import auth from './auth';
import settings from './settings';
import main from './main';

export const registerModules = (): void => {
	[settings, main].forEach((module) => {
		module.registerScreens();
	});
};
