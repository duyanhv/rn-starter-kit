import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button, Text } from '@app/components';
import { THEME_DARK, THEME_LIGHT } from '@app/core';
import { mockTheme } from '../test_helpers';

describe('components/Button', () => {
	const props = {
		onPress: () => {},
	};
	const buttonText = 'Button';

	beforeEach(() => {
		mockTheme(THEME_DARK);
	});

	it('renders successfully', async () => {
		const { baseElement } = render(
			<Button {...props}>
				<Text>{buttonText}</Text>
			</Button>,
		);

		expect(baseElement).toMatchSnapshot();
	});

	it('renders successfully with light theme', async () => {
		mockTheme(THEME_LIGHT);
		const { baseElement } = render(
			<Button {...props}>
				<Text>{buttonText}</Text>
			</Button>,
		);

		expect(baseElement).toMatchSnapshot();
	});

	it('renders outline button successfully', async () => {
		const { baseElement } = render(<Button {...props} outline />);

		expect(baseElement).toMatchSnapshot();
	});

	it('renders disabled button successfully', async () => {
		const { baseElement } = render(<Button {...props} disabled />);

		expect(baseElement).toMatchSnapshot();
	});

	it('renders rounded button successfully', async () => {
		const { baseElement } = render(<Button {...props} rounded />);

		expect(baseElement).toMatchSnapshot();
	});

	it('renders success button successfully', async () => {
		const { baseElement } = render(<Button {...props} success />);

		expect(baseElement).toMatchSnapshot();
	});

	it('renders info button successfully', async () => {
		const { baseElement } = render(<Button {...props} info />);

		expect(baseElement).toMatchSnapshot();
	});

	it('renders warning button successfully', async () => {
		const { baseElement } = render(<Button {...props} warning />);

		expect(baseElement).toMatchSnapshot();
	});

	it('renders danger button successfully', async () => {
		const { baseElement } = render(<Button {...props} danger />);

		expect(baseElement).toMatchSnapshot();
	});

	it('renders transparent button successfully', async () => {
		const { baseElement } = render(<Button {...props} transparent />);

		expect(baseElement).toMatchSnapshot();
	});

	it('renders undefined children successfully', async () => {
		const { baseElement } = render(
			<Button {...props} width={100}>
				{undefined}
				<Text>{buttonText}</Text>
			</Button>,
		);

		expect(baseElement).toMatchSnapshot();
	});
	it('renders with specified width successfully', async () => {
		const { baseElement } = render(
			<Button {...props} width={100}>
				<Text>{buttonText}</Text>
			</Button>,
		);

		expect(baseElement).toMatchSnapshot();
	});

	it('calls function when click button', async () => {
		const onPress = jest.fn();
		const { getByText } = render(
			<Button {...props} onPress={onPress}>
				<Text>{buttonText}</Text>
			</Button>,
		);
		const button = getByText(buttonText);

		fireEvent.press(button);

		expect(onPress).toBeCalledTimes(1);
	});
});
