import { Navigation, LayoutTabsChildren, Options } from 'react-native-navigation';
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
	customOptions?: Options;
}

const navigateTo = _.debounce(
	({
		screenName,
		componentId,
		options,
		passProps,
	}: {
		screenName: string;
		componentId: string;
		options?: {};
		passProps?: {};
	}): void => {
		Navigation.push(componentId, {
			component: {
				name: screenName,
				options: {
					bottomTabs: {
						visible: false,
					},
					...options,
				},
				passProps,
			},
		});
	},
	150,
);

const showModal = ({
	screenName,
	options,
	passProps,
}: {
	screenName: string;
	options?: Options;
	passProps?: {};
}): void => {
	Navigation.showModal({
		stack: {
			children: [
				{
					component: {
						name: screenName,
						passProps,
						options,
					},
				},
			],
		},
	});
};

const navigateOptions = ({ componentId, options }: { componentId: string; options: Options }): void => {
	Navigation.mergeOptions(componentId, {
		...options,
	});
};

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
	const { primaryColorCode, theme } = store.getState().settings;

	const primaryColor = getPrimaryColor(primaryColorCode, theme);
	let tabColor = colors.lightBlack;
	let tabTextColor = colors.grey;
	if (theme === THEME_DARK) {
		tabColor = colors.lightBlack;
		tabTextColor = colors.white;
	} else {
		tabColor = colors.white;
	}
	Navigation.setDefaultOptions({
		statusBar: {
			style: theme === THEME_DARK ? THEME_LIGHT : THEME_DARK,
			drawBehind: true,
			visible: true,
		},
		layout: {
			orientation: ['portrait'],
			backgroundColor: theme === THEME_DARK ? colors.lightBlack : colors.white,
		},
		topBar: {
			visible: false,
			height: 0,
		},
		bottomTabs: {
			animate: true,
			visible: true,
			// translucent: true,
			titleDisplayMode: 'alwaysShow',
			backgroundColor: tabColor,
		},
		bottomTab: {
			selectTabOnPress: true,
			selectedIconColor: primaryColor,
			selectedTextColor: primaryColor,
			textColor: tabTextColor,
			iconColor: tabTextColor,
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
			// bottomTabs: {
			// 	visible: false,
			// },
			// ...customOptions,
		},
	},
});

const setRootHome = async (currentTabIndex?: number): Promise<void> => {
	setDefaultOptions();
	const menuIcon = await getIconImageSource('hamburger', 30);
	const moreIcon = await getIconImageSource('cog', 30);
	const mapIcon = await getIconImageSource('compass', 30);
	Navigation.setRoot({
		root: {
			bottomTabs: {
				options: {
					bottomTabs: {
						currentTabIndex: currentTabIndex || 0,
					},
				},
				children: [
					getTabItem({
						screenName: screenNames.HomeScreen,
						icon: menuIcon,
						text: i18next.t('common.menu'),
					}),
					getTabItem({
						screenName: screenNames.NewScreen,
						icon: mapIcon,
						text: i18next.t('common.home'),
					}),
					getTabItem({
						screenName: screenNames.SettingsScreen,
						icon: moreIcon,
						text: i18next.t('common.settings'),
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
	// Navigation.events().registerBottomTabPressedListener(({ tabIndex, componentId }) => {
	// 	// console.log(tabIndex);
	// });
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
	navigateOptions,
	showModal,
};
