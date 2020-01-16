/* eslint-disable @typescript-eslint/no-var-requires */
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';
import React from 'react';
import { connect } from 'react-redux';

/* eslint-disable no-console */
const originalConsoleError = console.error;
console.error = (...args) => {
	if (/Warning.*not wrapped in act/.test(args[0])) {
		return;
	}
	originalConsoleError(...args);
};

/* eslint-disable no-undef */
jest.mock('react-native-splash-screen', () => ({
	hide: jest.fn(),
}));
jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);
// jest.mock('@react-native-firebase/app', () => ({}));
// jest.mock('@react-native-firebase/auth', () => ({}));
// jest.mock('@react-native-firebase/config', () => ({}));
jest.mock('react-native-splash-screen');
// jest.mock('react-native-google-signin', () => {});
jest.mock('react-native-code-push', () => {});
jest.mock('redux-persist', () => ({
	persistStore: jest.fn(),
}));
jest.mock('@rematch/persist', () => jest.fn());
jest.mock('@rematch/core', () => ({
	init: jest.fn().mockReturnValue({}),
	createModel: (model) => model,
}));

// jest.mock('react-native-sentry', () => ({
// 	Sentry: {
// 		captureException: jest.fn(),
// 	},
// }));
jest.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (key) => key,
	}),
}));
jest.mock('i18next', () => ({
	t: (key) => key,
}));
jest.mock('react-redux', () => ({
	connect: jest.fn(),
	Provider: 'Provider',
}));
connect.mockImplementation((mapStateToProps, mapDispatchToProps) => (Component) => {
	// eslint-disable-next-line global-require
	const { store } = require('./src/store');
	const ConnectedComponent = (props) => {
		return <Component {...mapStateToProps(store.getState())} {...mapDispatchToProps(store.dispatch)} {...props} />;
	};
	return ConnectedComponent;
});
