import { Navigation, LayoutTabsChildren } from 'react-native-navigation';
import i18next from 'i18next';
import { screenNames, Resource, THEME_DARK, colors, getPrimaryColor } from '@app/core';
import { store } from '@app/store';
import { getIconImageSource } from '@app/components/Icon';

interface TabItem {
	screenName: string;
	text: string;
	icon: Resource;
	color?: string;
	selectedColor?: string;
}

const navigateTo = ({ screenName, componentId }: { screenName: string; componentId: string; options?: {} }): void => {
	Navigation.push(componentId, {
		component: {
			name: screenName,
		},
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
	Navigation.setDefaultOptions({
		statusBar: {
			backgroundColor: primaryColor,
			style: 'light',
		},
		topBar: {
			visible: false,
			drawBehind: true,
		},
	});
};

const setRootStack = (screenName: string): void => {
	Navigation.setRoot({
		root: {
			stack: {
				options: {
					topBar: {
						visible: false,
					},
				},
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
const setRootAppLoader = (): void => setRootStack(screenNames.HomeScreen);

const setRootLogin = (): void => setRootStack(screenNames.LoginScreen);

const setRootEmailVerification = (): void => setRootStack(screenNames.EmailVerificationScreen);

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
		setRootHome();
		setDefaultOptions();
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
};
