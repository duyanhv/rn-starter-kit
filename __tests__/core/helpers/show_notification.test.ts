import Toast from 'react-native-root-toast';
import { showNotification } from '@app/core';

describe('core/helpers/record_error', () => {
	beforeEach(() => {
		jest.spyOn(Toast, 'show').mockImplementation(() => jest.fn());
	});

	const message = 'notification message';

	it('shows success notificaton', async () => {
		showNotification({
			type: 'SUCCESS',
			message,
		});

		expect(Toast.show).toBeCalled();
	});

	it('shows warning notificaton', async () => {
		showNotification({
			type: 'WARNING',
			message,
		});

		expect(Toast.show).toBeCalled();
	});
	it('shows error notificaton', async () => {
		showNotification({
			type: 'ERROR',
			message,
		});

		expect(Toast.show).toBeCalled();
	});
});
