import React, { useEffect } from 'react';
import { ScreenProps } from '@app/core';
import i18next from 'i18next';
import SplashScreen from 'react-native-splash-screen';
import { navigationService } from '@app/services';
import { initialMode } from 'react-native-dark-mode';
import { AsyncStorage } from 'react-native';
// import { RootState, SettingsStateType } from '@app/store';
import { mapStateToProps } from './map_state_to_props';
import { mapDispatchToProps } from './map_dispatch_to_props';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & ScreenProps;

export const Screen = ({ appLoaded, language, theme, changeTheme }: Props): JSX.Element => {
	useEffect(() => {
		if (!appLoaded) {
			return;
		}
		changeTheme(initialMode);

		AsyncStorage.getItem('persist:root').then((_value: string | null) => {
			// const localStorageState: RootState = JSON.parse(value ?? '');
			// const settings: SettingsStateType = JSON.parse((localStorageState.settings as unknown) as string);
			// if (!!settings && settings.theme !== undefined && settings.theme.trim() === '') {
			// }
		});
		i18next.changeLanguage(language);
		(async (): Promise<void> => {
			navigationService.setRootHome();
			setTimeout(() => {
				SplashScreen.hide();
			}, 300);
		})();
	}, [appLoaded, language, theme, changeTheme]);
	return <></>;
};
