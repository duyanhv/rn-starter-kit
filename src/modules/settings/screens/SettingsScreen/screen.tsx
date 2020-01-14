import React from 'react';
import { Platform } from 'react-native';
import i18next from 'i18next';
import { ScreenProps, i18n, Language, Theme, THEME_DARK, colors, getPrimaryColor } from '@app/core';
import { config } from '@app/config';
import { List, ListItemData, Picker, Image, Text, Container, Icon } from '@app/components';
import { jsonSources, PrimaryColor } from '@app/assets';
import { useTranslation } from 'react-i18next';
import { navigationService } from '@app/services';
import { mapDispatchToProps } from './map_dispatch_to_props';
import { mapStateToProps } from './map_state_to_props';
import { styles } from './styles';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & ScreenProps;

const primaryColors = jsonSources.primaryColors();

const propsDistance = {
	margin: 15,
};

export const Screen = ({
	changeLanguage,
	language,
	changePrimaryColor,
	primaryColorCode,
	changeTheme,
	theme,
	currentUser,
}: //   logout,
Props): JSX.Element => {
	const { t } = useTranslation();
	const appVersion = Platform.OS === 'android' ? config.android.version : config.ios.version;
	const textColor = theme === THEME_DARK ? colors.white : colors.black;
	const primaryColor = getPrimaryColor(primaryColorCode, theme);
	// const performLogout = async (): Promise<void> => {
	// 	// await authService.logout();
	// 	// logout();
	// 	navigationService.setRootLogin();
	// };
	const selectLanguage = (): void => {
		Picker.show<string>({
			dataSources: i18n.LANGUAGES.map((lang: Language) => ({
				value: lang.id,
				text: lang.name,
			})),
			initialValue: language,
			onValueChanged: async (lang: string) => {
				await i18next.changeLanguage(lang);
				changeLanguage(lang);
				navigationService.setRootHome(1);
			},
		});
	};

	const selectTheme = (): void => {
		Picker.show<Theme>({
			dataSources: (['dark', 'light'] as Theme[]).map((systemTheme: Theme) => ({
				value: systemTheme,
				text: t(`theme.${systemTheme}`),
			})),
			initialValue: theme,
			onValueChanged: (selectedTheme: Theme) => {
				changeTheme(selectedTheme);
				navigationService.setRootHome(1);
			},
		});
	};

	const selectPrimaryColor = (): void => {
		Picker.show<string>({
			dataSources: primaryColors.map((color: PrimaryColor) => ({
				value: color.code,
				text: t(`color.${color.code}`),
			})),
			initialValue: primaryColorCode,
			onValueChanged: (selectedPrimaryColor: string) => {
				changePrimaryColor(selectedPrimaryColor);
				navigationService.setRootHome(1);
			},
		});
	};

	const getPrimaryColorName = (code: string): string => {
		const matchedColor = primaryColors.filter((item) => item.code === code);
		return matchedColor ? t(`color.${matchedColor[0].code}`) : '';
	};

	// const openChangePasswordScreen = (): void =>
	// 	navigationService.navigateTo({
	// 		componentId,
	// 		screenName: screenNames.ChangePasswordScreen,
	// 	});

	const settingData: ListItemData[] = [
		{
			title: t('settingsScreen.settings'),
			isHeader: true,
			primaryColor,
		},
		{
			title: t('settingsScreen.language'),
			isHeader: false,
			value: i18n.getLanguageName(language),
			onPress: selectLanguage,
			showIcon: true,
			iconColor: textColor,
		},
		{
			title: t('settingsScreen.theme'),
			isHeader: false,
			value: t(`theme.${theme}`),
			onPress: selectTheme,
			showIcon: true,
			iconColor: textColor,
		},
		{
			title: t('settingsScreen.primaryColor'),
			isHeader: false,
			value: getPrimaryColorName(primaryColorCode),
			onPress: selectPrimaryColor,
			showIcon: true,
			iconColor: textColor,
		},
		{
			title: t('settingsScreen.about'),
			isHeader: true,
			primaryColor,
		},
		{
			title: t('settingsScreen.author'),
			isHeader: false,
			value: config.author,
		},
		{
			title: t('settingsScreen.version'),
			isHeader: false,
			value: appVersion,
		},
		// {
		// 	title: t('settingsScreen.logout'),
		// 	isHeader: false,
		// 	showIcon: true,
		// 	onPress: performLogout,
		// 	iconColor: textColor,
		// },
	];

	//   if (currentUser && currentUser.loginType === 'EMAIL') {
	//     settingData.splice(2, 0, {
	//       title: t('settingsScreen.changePassword'),
	//       isHeader: false,
	//       onPress: openChangePasswordScreen,
	//       showIcon: true,
	//       iconColor: textColor,
	//     });
	//   }

	return (
		<Container
		// showHeader
		// headerTitle={t('settingsScreen.settings')}
		>
			<Text h1={true} style={propsDistance}>
				Setting
			</Text>
			{!!currentUser.avatarUrl && (
				<Image
					source={{
						uri: currentUser.avatarUrl,
					}}
					style={[
						styles.avatar,
						{
							borderColor: primaryColor,
						},
					]}
				/>
			)}
			{!currentUser.avatarUrl && (
				<Icon name='account-circle-outline' size={100} color={textColor} style={styles.iconAvatar} />
			)}
			<Text bold style={styles.displayName}>
				{currentUser.displayName}
			</Text>
			<List data={settingData} />
		</Container>
	);
};
