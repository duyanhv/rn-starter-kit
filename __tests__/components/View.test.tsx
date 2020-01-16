import React from 'react';
import { render } from '@testing-library/react-native';
import { View, Text, Icon } from '@app/components';
import { colors, THEME_DARK } from '@app/core';
import { mockTheme } from '../test_helpers';

beforeAll(() => {});

describe('components/View', () => {
	beforeEach(() => {
		mockTheme(THEME_DARK);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('renders successfully', async () => {
		const { baseElement } = render(<View />);

		expect(baseElement).toMatchSnapshot();
	});

	it('renders with flex successfully', async () => {
		const viewText = 'view';
		const { baseElement } = render(
			<View flex={1}>
				<Text>{viewText}</Text>
			</View>,
		);

		expect(baseElement).toMatchSnapshot();
	});

	it('renders with center props successfully', async () => {
		const viewText = 'view';
		const { baseElement } = render(
			<View center>
				<Text>{viewText}</Text>
			</View>,
		);

		expect(baseElement).toMatchSnapshot();
	});
	it('renders with center vertical props successfully', async () => {
		const viewText = 'view';
		const { baseElement } = render(
			<View centerVertical>
				<Text>{viewText}</Text>
			</View>,
		);

		expect(baseElement).toMatchSnapshot();
	});
	it('renders with row props successfully', async () => {
		const viewText = 'view';
		const { baseElement } = render(
			<View row>
				<Text>{viewText}</Text>
			</View>,
		);

		expect(baseElement).toMatchSnapshot();
	});
	it('renders with column props successfully', async () => {
		const viewText = 'view';
		const { baseElement } = render(
			<View column>
				<Text>{viewText}</Text>
			</View>,
		);

		expect(baseElement).toMatchSnapshot();
	});
	it('renders with rowReverse props successfully', async () => {
		const viewText = 'view';
		const { baseElement } = render(
			<View rowReverse>
				<Text>{viewText}</Text>
			</View>,
		);

		expect(baseElement).toMatchSnapshot();
	});
	it('renders with columnReverse props successfully', async () => {
		const viewText = 'view';
		const { baseElement } = render(
			<View columnReverse>
				<Text>{viewText}</Text>
			</View>,
		);

		expect(baseElement).toMatchSnapshot();
	});
	it('renders with text children successfully', async () => {
		const viewText = 'view';
		const { baseElement, getByText } = render(
			<View>
				<Text>{viewText}</Text>
			</View>,
		);

		expect(baseElement).toMatchSnapshot();
		expect(getByText(viewText)).toBeDefined();
	});
	it('renders two text children successfully', async () => {
		const text1 = 'text1';
		const text2 = 'text2';
		const { baseElement, getByText } = render(
			<View>
				<Text>{text1}</Text>
				<Text>{text2}</Text>
			</View>,
		);

		expect(baseElement).toMatchSnapshot();
		expect(getByText(text1)).toBeDefined();
		expect(getByText(text2)).toBeDefined();
	});

	it('renders with text and icon children successfully', async () => {
		const text1 = 'text1';
		const text2 = 'text2';
		const { baseElement } = render(
			<View>
				<Text>{text1}</Text>
				<Text>{text2}</Text>
				<Icon name='face-profile' color={colors.blue} />
			</View>,
		);

		expect(baseElement).toMatchSnapshot();
	});
});
