import React from 'react';
import { render } from '@testing-library/react-native';
import { ErrorBoundary, Text } from '@app/components';
import { THEME_DARK, recordError } from '@app/core';
import { mockTheme } from '../test_helpers';

jest.mock('@app/core/helpers/record_error', () => ({
	recordError: jest.fn(),
}));

describe('components/ErrorBoundary', () => {
	beforeEach(() => {
		mockTheme(THEME_DARK);
	});

	it('renders successfully', async () => {
		const { baseElement } = render(
			<ErrorBoundary>
				<Text>Text</Text>
			</ErrorBoundary>,
		);

		expect(baseElement).toMatchSnapshot();
	});

	it('renders with errors successfully', async () => {
		((console as unknown) as Console).error = jest.fn();

		const ErrorComponent = (): JSX.Element => <Text>{((undefined as unknown) as number).toString()}</Text>;
		const { baseElement } = render(
			<ErrorBoundary>
				<ErrorComponent />
			</ErrorBoundary>,
		);

		expect(((console as unknown) as Console).error).toBeCalledTimes(1);
		expect(recordError).toBeCalledTimes(1);
		expect(baseElement).toMatchSnapshot();
	});
});
