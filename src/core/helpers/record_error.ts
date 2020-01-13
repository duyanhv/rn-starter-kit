import * as Sentry from '@sentry/react-native';
// import { config } from '@app/config';

export const recordError = async (error: Error): Promise<void> => {
	if (!__DEV__) {
		try {
			Sentry.captureException(error);
		} catch (internalError) {
			// do nothing
		}
	} else {
		global.console.log(error);
	}
};

export const initializeSentry = (): void => {
	// Sentry.init({
	// 	dsn: config.sentryDns,
	// });
};
