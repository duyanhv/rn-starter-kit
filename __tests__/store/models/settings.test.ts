import { ModelReducers } from '@rematch/core';
import { SettingsState, settings } from '@app/store/models/settings';

jest.mock('@rematch/core', () => ({
	createModel: (config: { reducers: ModelReducers<SettingsState> }) => config,
}));

describe('store/models/settings', () => {
	it('finishLoadingApp', async () => {
		const oldSettingState: SettingsState = {
			appLoaded: false,
			language: 'en',
			theme: 'light',
			primaryColorCode: 'red',
		};
		const { reducers } = (settings as unknown) as { reducers: ModelReducers<SettingsState> };
		const state = reducers.finishLoadingApp(oldSettingState, true);
		expect(state).toMatchInlineSnapshot(`
      Object {
        "appLoaded": true,
        "language": "en",
        "primaryColorCode": "red",
        "theme": "light",
      }
    `);
	});

	it('changeLanguage', async () => {
		const oldSettingState: SettingsState = {
			appLoaded: false,
			language: 'en',
			theme: 'light',
			primaryColorCode: 'red',
		};
		const { reducers } = (settings as unknown) as { reducers: ModelReducers<SettingsState> };
		const state = reducers.changeLanguage(oldSettingState, 'vi');

		expect(state).toMatchInlineSnapshot(`
      Object {
        "appLoaded": false,
        "language": "vi",
        "primaryColorCode": "red",
        "theme": "light",
      }
    `);
	});

	it('changeTheme', async () => {
		const oldSettingState: SettingsState = {
			appLoaded: false,
			language: 'en',
			theme: 'light',
			primaryColorCode: 'red',
		};
		const { reducers } = (settings as unknown) as { reducers: ModelReducers<SettingsState> };
		const state = reducers.changeTheme(oldSettingState, 'dark');

		expect(state).toMatchInlineSnapshot(`
      Object {
        "appLoaded": false,
        "language": "en",
        "primaryColorCode": "red",
        "theme": "dark",
      }
    `);
	});

	it('changePrimaryColor', async () => {
		const oldSettingState: SettingsState = {
			appLoaded: false,
			language: 'en',
			theme: 'light',
			primaryColorCode: 'red',
		};
		const { reducers } = (settings as unknown) as { reducers: ModelReducers<SettingsState> };
		const state = reducers.changePrimaryColor(oldSettingState, 'blue');

		expect(state).toMatchInlineSnapshot(`
      Object {
        "appLoaded": false,
        "language": "en",
        "primaryColorCode": "blue",
        "theme": "light",
      }
    `);
	});
});
