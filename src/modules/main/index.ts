import { WithStore, WithScreen } from '@app/components';
import { Navigation } from 'react-native-navigation';
import { screenNames } from '@app/core';
import { HomeScreen } from './screens';

const registerScreens = (): void => {
	Navigation.registerComponent(screenNames.HomeScreen, () =>
		WithScreen(WithStore(HomeScreen), {
			lazyLoad: true,
		}),
	);
	//   Navigation.registerComponent(screenNames.NewScreen, () => WithScreen(WithStore(NewScreen)));
};

export default {
	registerScreens,
};
