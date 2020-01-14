import { WithStore, WithScreen } from '@app/components';
import { Navigation } from 'react-native-navigation';
import { screenNames } from '@app/core';
import { AppLoaderScreen } from './screens';

const registerScreens = (): void => {
	Navigation.registerComponent(screenNames.AppLoaderScreen, () =>
		WithScreen(WithStore(AppLoaderScreen), {
			orientation: 'PORTRAIT',
		}),
	);
};

export default {
	registerScreens,
};
