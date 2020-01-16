import { navigationService } from '@app/services';
import { screenNames, THEME_DARK, THEME_LIGHT } from '@app/core';
import { Navigation } from 'react-native-navigation';
import { store } from '@app/store';

jest.mock('@app/store/store', () => ({
	store: {
		getState: () => ({}),
	},
}));

jest.mock('@app/components/Icon', () => ({
	getIconImageSource: jest.fn(),
}));

describe('services/navigation_service', () => {
	beforeEach(() => {
		Navigation.push = jest.fn();
		Navigation.mergeOptions = jest.fn();
		Navigation.pop = jest.fn();
		Navigation.events().registerAppLaunchedListener = jest.fn();
		Navigation.setDefaultOptions = jest.fn();
		Navigation.setRoot = jest.fn();
		store.getState = jest.fn().mockImplementation(() => ({
			settings: {
				theme: THEME_DARK,
			},
		}));
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe('initialize', () => {
		it('runs initialize successfully', async () => {
			Navigation.events().registerAppLaunchedListener = jest.fn().mockImplementation((callback) => {
				callback();
			});

			await navigationService.initialize();

			expect(Navigation.events().registerAppLaunchedListener).toBeCalledTimes(1);
			expect(Navigation.setDefaultOptions).toBeCalledTimes(1);
			expect(Navigation.setRoot).toBeCalledTimes(1);
		});
	});

	describe('setRootAppLoader', () => {
		it('runs setRootAppLoader successfully', async () => {
			await navigationService.setRootAppLoader();

			// expect(Navigation.setDefaultOptions).toBeCalledTimes(1);
			expect(Navigation.setRoot).toBeCalledTimes(1);
		});
	});

	describe('setRootHome', () => {
		it('runs setRootHome successfully with theme Dark', async () => {
			await navigationService.setRootHome();

			// expect(Navigation.setDefaultOptions).toBeCalledTimes(1);
			expect(Navigation.setRoot).toBeCalledTimes(1);
		});

		it('runs setRootHome successfully with theme light', async () => {
			store.getState = jest.fn().mockImplementation(() => ({
				settings: {
					theme: THEME_LIGHT,
				},
			}));

			await navigationService.setRootHome();

			// expect(Navigation.setDefaultOptions).toBeCalledTimes(1);
			expect(Navigation.setRoot).toBeCalledTimes(1);
		});
	});

	describe('setRootLogin', () => {
		it('runs setRootLogin successfully', async () => {
			await navigationService.setRootLogin();

			// expect(Navigation.setDefaultOptions).toBeCalledTimes(1);
			expect(Navigation.setRoot).toBeCalledTimes(1);
		});
	});

	describe('setRootEmailVerification', () => {
		it('runs setRootEmailVerification successfully', async () => {
			await navigationService.setRootEmailVerification();

			// expect(Navigation.setDefaultOptions).toBeCalledTimes(1);
			expect(Navigation.setRoot).toBeCalledTimes(1);
		});
	});

	describe('navigateTo', () => {
		it('runs navigateTo successfully', async () => {
			await navigationService.navigateTo({
				screenName: screenNames.AppLoaderScreen,
				componentId: '',
			});

			expect(Navigation.push).toBeCalledTimes(1);
		});
	});

	describe('goBack', () => {
		it('runs goBack successfully', async () => {
			await navigationService.goBack({
				componentId: '',
			});

			expect(Navigation.pop).toBeCalledTimes(1);
		});
	});

	describe('changeTab', () => {
		it('runs changeTab successfully', async () => {
			await navigationService.changeTab({
				componentId: '',
				tabIndex: 0,
			});

			expect(Navigation.mergeOptions).toBeCalledTimes(1);
		});
	});
});
