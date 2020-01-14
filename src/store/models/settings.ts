import { createModel, ModelConfig } from '@rematch/core';
import produce from 'immer';
import { LanguageType, i18n, Theme } from '@app/core';
import { jsonSources } from '@app/assets';

export interface SettingsState {
	appLoaded: boolean;
	language: LanguageType;
	theme: Theme;
	primaryColorCode: string;
}

const defaultPrimaryColorCode = jsonSources.primaryColors()[0].code;

export const settings: ModelConfig<SettingsState> = createModel<SettingsState>({
	state: {
		appLoaded: false,
		language: i18n.LANGUAGE_EN,
		theme: '',
		primaryColorCode: defaultPrimaryColorCode,
	},
	reducers: {
		finishLoadingApp: produce((draftState: SettingsState) => {
			draftState.appLoaded = true;
		}),
		changeLanguage: produce((draftState: SettingsState, payload: LanguageType) => {
			draftState.language = payload;
		}),
		changeTheme: produce((draftState: SettingsState, payload: Theme) => {
			draftState.theme = payload;
		}),
		changePrimaryColor: produce((draftState: SettingsState, payload: string) => {
			draftState.primaryColorCode = payload;
		}),
	},
});
