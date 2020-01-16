import React from 'react';
import { render } from '@testing-library/react-native';
import { ErrorText } from '@app/components';
import { THEME_DARK } from '@app/core';
import { mockTheme } from '../test_helpers';

describe('components/ErrorText', () => {
	const errorText = 'Error';
	beforeEach(() => {
		mockTheme(THEME_DARK);
	});

	it('renders successfully with content', async () => {
		const { baseElement, getByText } = render(<ErrorText>{errorText}</ErrorText>);

		expect(getByText(errorText)).toBeDefined();
		expect(baseElement).toMatchSnapshot();
	});
});
