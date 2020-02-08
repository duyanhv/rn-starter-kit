import { Navigation, LayoutTabsChildren } from 'react-native-navigation';
import i18next from 'i18next';
import { screenNames, Resource, THEME_DARK, colors, getPrimaryColor, THEME_LIGHT } from '@app/core';
import { store } from '@app/store';
import { getIconImageSource } from '@app/components/Icon';
import _ from 'lodash';
import { Platform } from 'react-native';

interface TabItem {
	screenName: string;
	text: string;
	icon: Resource;
	color?: string;
	selectedColor?: string;
}

const navigateTo = _.debounce(
	({ screenName, componentId }: { screenName: string; componentId: string; options?: {} }): void => {
		Navigation.push(componentId, {
			component: {
				name: screenName,
				options: {
					bottomTabs: {
						visible: false,
						drawBehind: true,
						animate: true,
					},
				},
			},
		});
	},
	150,
);

const changeTab = ({ componentId, tabIndex }: { componentId: string; tabIndex: number }): void => {
	Navigation.mergeOptions(componentId, {
		bottomTabs: {
			currentTabIndex: tabIndex,
		},
	});
};

const goBack = ({ componentId }: { componentId: string }): void => {
	Navigation.pop(componentId);
};

const setDefaultOptions = (): void => {
	const { theme } = store.getState().settings;
	Navigation.setDefaultOptions({
		statusBar: {
			backgroundColor: theme === THEME_DARK ? colors.lightBlack : colors.white,
			style: theme === THEME_DARK ? THEME_LIGHT : THEME_DARK,
			drawBehind: false,
		},
		layout: {
			componentBackgroundColor: theme === THEME_DARK ? colors.lightBlack : colors.white,
			orientation: ['portrait'],
			backgroundColor: theme === THEME_DARK ? colors.lightBlack : colors.white,
		},
		topBar: {
			visible: false,
			drawBehind: false,
			height: 0,
		},
		animations:
			Platform.OS === 'ios'
				? {
						push: {
							waitForRender: true,
						},
				  }
				: {
						pop: {
							content: {
								x: {
									from: 0,
									to: 1500,
									duration: 350,
									interpolation: 'decelerate',
								},
								alpha: {
									from: 1,
									to: 0,
									duration: 400,
									startDelay: 0,
									interpolation: 'decelerate',
								},
							},
						},
						push: {
							content: {
								x: {
									from: 1000,
									to: 0,
									duration: 300,
								},
								alpha: {
									from: 0,
									to: 100,
									duration: 350,
									startDelay: 0,
									interpolation: 'accelerate',
								},
							},
						},
				  },
	});
};

const setRootStack = (screenName: string): void => {
	Navigation.setRoot({
		root: {
			stack: {
				children: [
					{
						component: {
							name: screenName,
						},
					},
				],
			},
		},
	});
};
const setRootAppLoader = (): void => setRootStack(screenNames.AppLoaderScreen);

const setRootLogin = (): void => setRootStack(screenNames.LoginScreen);

const setRootEmailVerification = (): void => setRootStack(screenNames.EmailVerificationScreen);

const setGuide = (): void => setRootStack(screenNames.GuideScreen);

const getTabItem = ({ screenName, icon, color, text, selectedColor }: TabItem): LayoutTabsChildren => ({
	stack: {
		children: [
			{
				component: {
					name: screenName,
					passProps: {},
				},
			},
		],
		options: {
			bottomTab: {
				text,
				icon,
				selectedIconColor: selectedColor,
				selectedTextColor: selectedColor,
				textColor: color,
				iconColor: color,
			},
		},
	},
});

const setRootHome = async (currentTabIndex?: number): Promise<void> => {
	setDefaultOptions();
	const homeIcon = await getIconImageSource('home', 30);
	const moreIcon = await getIconImageSource('dots-horizontal', 30);
	const { primaryColorCode, theme } = store.getState().settings;
	const primaryColor = getPrimaryColor(primaryColorCode, theme);
	let tabColor = colors.lightGrey;
	let tabTextColor = colors.grey;
	if (theme === THEME_DARK) {
		tabColor = colors.black;
		tabTextColor = colors.white;
	} else {
		tabColor = colors.white;
	}
	Navigation.setRoot({
		root: {
			bottomTabs: {
				options: {
					bottomTabs: {
						currentTabIndex: currentTabIndex || 0,
						titleDisplayMode: 'alwaysShow',
						backgroundColor: tabColor,
						animate: true,
					},
				},
				children: [
					getTabItem({
						screenName: screenNames.HomeScreen,
						icon: homeIcon,
						text: i18next.t('common.home'),
						color: tabTextColor,
						selectedColor: primaryColor,
					}),
					getTabItem({
						screenName: screenNames.SettingsScreen,
						icon: moreIcon,
						text: i18next.t('common.settings'),
						color: tabTextColor,
						selectedColor: primaryColor,
					}),
				],
			},
		},
	});
};

const initialize = (): void => {
	Navigation.events().registerAppLaunchedListener((): void => {
		setRootAppLoader();
	});
};

export const navigationService = {
	initialize,
	setRootAppLoader,
	setRootHome,
	setRootLogin,
	setRootEmailVerification,
	navigateTo,
	goBack,
	changeTab,
	setDefaultOptions,
	setGuide,
};
