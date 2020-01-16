import { handleError, showNotification, ErrorWithCode } from '@app/core';
import * as showNotificattion from '@app/core/helpers/show_notification';

describe('core/helpers/handle_error', () => {
	const errorMessage = 'Error message';

	beforeEach(() => {
		jest.spyOn(showNotificattion, 'showNotification').mockImplementation(() => jest.fn);
	});

	it('throws error again if not having code', async () => {
		expect(() => handleError(new Error(), {})).toThrow();
	});

	it('shows the correct error message', async () => {
		const error: ErrorWithCode = new Error(errorMessage);
		error.code = 'errorCode';
		handleError(error, {
			errorCode: errorMessage,
		});

		expect(showNotification).toBeCalledWith({
			type: 'ERROR',
			message: errorMessage,
		});
	});

	it('ignores expected errors', async () => {
		const error: ErrorWithCode = new Error(errorMessage);
		error.code = 'errorCode';
		handleError(
			error,
			{},
			{
				errorCode: true,
			},
		);

		expect(showNotification).not.toBeCalled();
	});

	it('ignores if message not found', async () => {
		const error: ErrorWithCode = new Error('');
		error.code = 'errorCode';
		handleError(error, {});

		expect(showNotification).not.toBeCalled();
	});
});
