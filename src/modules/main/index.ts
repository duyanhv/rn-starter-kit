import { WithStore, WithScreen } from '@app/components';
import { Navigation } from 'react-native-navigation';
import { screenNames } from '@app/core';
import { HomeScreen, GuideScreen, NewScreen, ResideMenuScreen } from './screens';

const registerScreens = (): void => {
	Navigation.registerComponent(screenNames.HomeScreen, () =>
		WithScreen(WithStore(HomeScreen), {
			lazyLoad: true,
		}),
	);
	Navigation.registerComponent(screenNames.GuideScreen, () => WithScreen(GuideScreen));
	Navigation.registerComponent(screenNames.NewScreen, () => WithScreen(NewScreen));
	Navigation.registerComponent(screenNames.ResideMenuScreen, () => WithScreen(ResideMenuScreen));
};

export default {
	registerScreens,
};
