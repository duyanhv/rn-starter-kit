import React from 'react';
import { render } from '@testing-library/react-native';
import { Text, CardItem, Button } from '@app/components';
import { THEME_DARK, THEME_LIGHT } from '@app/core';
import { mockTheme } from '../test_helpers';

describe('components/CardItem', () => {
	const helloText = 'Hello';
	const buttonText = 'button';
	beforeEach(() => {
		mockTheme(THEME_DARK);
	});
	it('renders successfully with Text and Button', async () => {
		const pressButton = jest.fn();
		const { baseElement, getByText } = render(
			<CardItem>
				<Text>{helloText}</Text>
				<Button onPress={pressButton}>
					<Text>{buttonText}</Text>
				</Button>
			</CardItem>,
		);

		expect(baseElement).toMatchSnapshot();
		expect(getByText(helloText)).toBeDefined();
		expect(getByText(buttonText)).toBeDefined();
	});

	it('renders with primary color successfully', async () => {
		const { baseElement } = render(<CardItem primary />);

		expect(baseElement).toMatchSnapshot();
	});

	it('renders with theme light color successfully', async () => {
		mockTheme(THEME_LIGHT);
		const { baseElement } = render(<CardItem primary />);

		expect(baseElement).toMatchSnapshot();
	});

	it('renders with bordered card item successfully', async () => {
		const { baseElement } = render(<CardItem bordered header={false} />);

		expect(baseElement).toMatchSnapshot();
	});
});
