import { Alert } from '@app/components';
import { THEME_DARK } from '@app/core';
import { mockTheme } from '../test_helpers';

describe('components/Alert', () => {
	const title = 'Title';
	const message = 'Message';
	beforeEach(() => {
		mockTheme(THEME_DARK);
	});

	it('shows alert error successfully', async () => {
		Alert.show({
			type: 'ERROR',
			title,
			message,
		});
	});

	it('shows alert info successfully', async () => {
		Alert.show({
			type: 'INFO',
			title,
			message,
		});
	});

	it('shows alert warning successfully', async () => {
		Alert.show({
			type: 'WARNING',
			title,
			message,
		});
	});

	it('shows alert success successfully', async () => {
		Alert.show({
			type: 'SUCCESS',
			title,
			message,
		});
	});

	it('hides alert successfully', async () => {
		Alert.show({
			type: 'ERROR',
			title,
			message,
		});
		Alert.hide();
	});
});
