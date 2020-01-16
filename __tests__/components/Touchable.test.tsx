import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Touchable, Text, Icon } from '@app/components';
import { colors, THEME_DARK } from '@app/core';
import { Platform } from 'react-native';
import { mockTheme } from '../test_helpers';

beforeAll(() => {});

describe('components/Touchable', () => {
	const buttonText = 'button';

	beforeEach(() => {
		mockTheme(THEME_DARK);
	});

	it('renders successfully', async () => {
		const { baseElement, getByText } = render(
			<Touchable>
				<Text>{buttonText}</Text>
			</Touchable>,
		);
		expect(getByText(buttonText)).toBeDefined();
		expect(baseElement).toMatchSnapshot();
	});

	it('renders successfully on android', async () => {
		Platform.OS = 'android';
		const { baseElement, getByText } = render(
			<Touchable>
				<Text>{buttonText}</Text>
			</Touchable>,
		);
		expect(getByText(buttonText)).toBeDefined();
		expect(baseElement).toMatchSnapshot();
	});

	it('renders with text and icon successfully', async () => {
		const { baseElement } = render(
			<Touchable>
				<Icon name='facebook' color={colors.white} />
				<Text>{buttonText}</Text>
			</Touchable>,
		);

		expect(baseElement).toMatchSnapshot();
	});

	it('handles click button successfully', async () => {
		const onPressButton = jest.fn();

		const { getByText } = render(
			<Touchable onPress={onPressButton}>
				<Text>{buttonText}</Text>
			</Touchable>,
		);
		fireEvent.press(getByText(buttonText));

		expect(onPressButton).toBeCalledTimes(1);
	});
});
