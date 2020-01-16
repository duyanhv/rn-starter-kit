import * as ExceptionHandler from 'react-native-exception-handler';
import * as recordError from '@app/core/helpers/record_error';
import { Alert } from '@app/components/Alert';
import { handleGlobalErrors, Bluebird } from '../src/core/helpers/handle_global_errors';

jest.mock('@app/components/Alert', () => ({
	Alert: {
		show: jest.fn(),
	},
}));

describe('core/helpers/handle_global_errors', () => {
	beforeEach(() => {
		jest.spyOn(ExceptionHandler, 'setJSExceptionHandler').mockImplementation(() => jest.fn);
		jest.spyOn(ExceptionHandler, 'setNativeExceptionHandler').mockImplementation(() => jest.fn);
	});

	it('calls exception handlers', async () => {
		handleGlobalErrors();
		expect(ExceptionHandler.setJSExceptionHandler).toBeCalled();
		expect(ExceptionHandler.setNativeExceptionHandler).toBeCalled();
	});

	it('callbacks after exception occurs', async () => {
		const mock = jest.fn();
		const recordErrorAsync = new Promise<void>((resolve) => {
			mock();
			resolve();
		});
		jest.spyOn(recordError, 'recordError').mockImplementation(() => recordErrorAsync);
		jest.spyOn(ExceptionHandler, 'setJSExceptionHandler').mockImplementation(
			(handler: ExceptionHandler.JSExceptionHandler, _allowInDevMode?: boolean) => {
				handler(new Error(), true);
			},
		);

		handleGlobalErrors();

		expect(mock).toBeCalled();
	});

	it('callbacks after native exception occurs', async () => {
		const mock = jest.fn();
		const recordErrorAsync = new Promise<void>((resolve) => {
			mock();
			resolve();
		});
		jest.spyOn(recordError, 'recordError').mockImplementation(() => recordErrorAsync);
		jest.spyOn(ExceptionHandler, 'setNativeExceptionHandler').mockImplementation(
			(
				handler: ExceptionHandler.NativeExceptionHandler,
				_forceAppQuit?: boolean, // Android only
				_executeDefaultHandler?: boolean,
			) => {
				handler('error');
			},
		);

		handleGlobalErrors();

		expect(mock).toBeCalled();
	});

	it('resolves onunhandledrejection', async () => {
		const mock = jest.fn();
		const recordErrorAsync = new Promise<void>((resolve) => {
			mock();
			resolve();
		});
		jest.spyOn(recordError, 'recordError').mockImplementation(() => recordErrorAsync);

		((global as unknown) as Bluebird).onunhandledrejection(new Error());

		expect(mock).toBeCalled();
		expect(Alert.show).toBeCalled();
	});
});
