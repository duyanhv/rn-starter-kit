import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler';
import i18next from 'i18next';
import Promise from 'bluebird';
import { Alert } from '../../components';
// import { recordError } from '@app/core';

export interface Bluebird {
	onunhandledrejection: (error: Error) => void;
}

const showAndRecordError = (_error: Error, _isFatal: boolean = false): void => {
	// console.log(_error);
	Alert.show({
		type: 'ERROR',
		title: i18next.t('error.unexpectedErrorOccurred'),
		message: i18next.t('error.unexpectedErrorOccurredMessage'),
		onPressClose: Alert.hide,
	});
};

// https://stackoverflow.com/questions/48487089/global-unhandledrejection-listener-in-react-native
// We use the "Bluebird" lib for Promises, because it shows good perf
// and it implements the "unhandledrejection" event:
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).Promise = Promise;

// Global catch of unhandled Promise rejections:
((global as unknown) as Bluebird).onunhandledrejection = (error: Error): void => {
	// Warning: when running in "remote debug" mode (JS environment is Chrome browser),
	// this handler is called a second time by Bluebird with a custom "dom-event".
	// We need to filter this case out:
	error instanceof Error && showAndRecordError(error);
};

export const handleGlobalErrors = (): void => {
	setJSExceptionHandler((error: Error, isFatal: boolean) => {
		showAndRecordError(error, isFatal);
	}, true);
	setNativeExceptionHandler(
		(errorString: string) => {
			showAndRecordError(new Error(errorString), true);
		},
		false,
		true,
	);
};
export {};
