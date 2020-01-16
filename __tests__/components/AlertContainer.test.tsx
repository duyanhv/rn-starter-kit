import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AlertContainer, View, Button, Text } from '@app/components';
import { THEME_DARK, THEME_LIGHT } from '@app/core';
import { mockTheme } from '../test_helpers';

const mockModal = (modalProps: { onBackdropPress: () => void; children: React.ReactNode }): JSX.Element => {
	const onPress = jest.fn().mockImplementation(() => {
		modalProps.onBackdropPress();
	});
	return (
		<View>
			{modalProps.children}
			<Button onPress={onPress}>
				<Text>Close</Text>
			</Button>
		</View>
	);
};
jest.mock('react-native-modal', () => {
	const modal = ({
		onBackdropPress,
		children,
	}: {
		onBackdropPress: () => void;
		children: React.ReactNode;
	}): Element =>
		mockModal({
			onBackdropPress,
			children,
		});
	return modal;
});

describe('components/AlertContainer', () => {
	const alertTitle = 'Title';
	const message = 'Message';
	const closeText = 'dialog.close';
	const customButtonText = 'customButton';
	const cancelText = 'cancel';
	const closeAction = jest.fn();
	const cancelAction = jest.fn();
	const customAction = jest.fn();
	const props = {
		title: alertTitle,
		message,
		visible: true,
		onPressClose: closeAction,
	};
	const propWithNoTitle = {
		message,
		visible: true,
		onPressClose: closeAction,
	};
	const propWithActions = {
		title: alertTitle,
		message,
		visible: true,
		onPressClose: closeAction,
		actions: [
			{
				title: customButtonText,
				onPress: customAction,
				special: true,
			},
			{
				title: cancelText,
				onPress: cancelAction,
				special: true,
			},
		],
	};

	beforeEach(() => {
		mockTheme(THEME_DARK);
	});

	it('renders successfully', async () => {
		const { baseElement, getByText } = render(<AlertContainer {...props} type='INFO' />);

		expect(getByText(alertTitle)).toBeDefined();
		expect(getByText(message)).toBeDefined();
		expect(getByText(closeText)).toBeDefined();
		expect(baseElement).toMatchSnapshot();
	});

	it('renders successfully with light theme', async () => {
		mockTheme(THEME_LIGHT);
		const { baseElement, getByText } = render(<AlertContainer {...props} type='INFO' />);

		expect(getByText(alertTitle)).toBeDefined();
		expect(getByText(message)).toBeDefined();
		expect(getByText(closeText)).toBeDefined();
		expect(baseElement).toMatchSnapshot();
	});

	it('renders info alert successfully', async () => {
		const { baseElement } = render(<AlertContainer {...propWithNoTitle} type='INFO' />);

		expect(baseElement).toMatchSnapshot();
	});

	it('renders warning alert successfully', async () => {
		const { baseElement } = render(<AlertContainer {...propWithNoTitle} type='WARNING' />);

		expect(baseElement).toMatchSnapshot();
	});

	it('renders error alert successfully', async () => {
		const { baseElement } = render(<AlertContainer {...propWithNoTitle} type='ERROR' />);

		expect(baseElement).toMatchSnapshot();
	});

	it('renders success alert successfully', async () => {
		const { baseElement } = render(<AlertContainer {...propWithNoTitle} type='SUCCESS' />);

		expect(baseElement).toMatchSnapshot();
	});

	it('renders successfully with its custom actions', async () => {
		const { baseElement, getByText } = render(<AlertContainer {...propWithActions} type='INFO' />);
		expect(getByText(customButtonText)).toBeDefined();
		expect(getByText(cancelText)).toBeDefined();
		expect(baseElement).toMatchSnapshot();
	});

	it('handles press when click default close button', async () => {
		const { getByText } = render(<AlertContainer {...props} type='INFO' />);
		const closeButton = getByText(closeText);
		fireEvent.press(closeButton);

		expect(props.onPressClose).toBeCalledTimes(1);
	});

	it('handles press when clicking custom button', async () => {
		const { getByText } = render(<AlertContainer {...propWithActions} type='INFO' />);
		const customButton = getByText(customButtonText);
		fireEvent.press(customButton);

		expect(customAction).toBeCalledTimes(1);
	});

	it('hide alert when clicking outside modal', async () => {
		const { getByText } = render(<AlertContainer {...props} type='INFO' />);
		// use a fake button to trigger event
		const button = getByText('Close');
		fireEvent.press(button);

		expect(props.onPressClose).toBeCalledTimes(1);
	});
});
