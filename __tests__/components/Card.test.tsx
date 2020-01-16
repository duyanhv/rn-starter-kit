import React from 'react';
import { render } from '@testing-library/react-native';
import { Text, Card, Button } from '@app/components';
import { THEME_DARK } from '@app/core';
import { mockTheme } from '../test_helpers';

describe('components/Card', () => {
	const helloText = 'Hello';
	const buttonText = 'button';

	beforeEach(() => {
		mockTheme(THEME_DARK);
	});

	it('renders children successfully', async () => {
		const pressButton = jest.fn();
		const { baseElement, getByText } = render(
			<Card>
				<Text>{helloText}</Text>
				<Button onPress={pressButton}>
					<Text>{buttonText}</Text>
				</Button>
			</Card>,
		);

		expect(baseElement).toMatchSnapshot();
		expect(getByText(helloText)).toBeDefined();
		expect(getByText(buttonText)).toBeDefined();
	});

	it('renders with primary color successfully', async () => {
		const { baseElement } = render(<Card primary />);

		expect(baseElement).toMatchSnapshot();
	});
});
