import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ListItemData, List } from '@app/components';
import { colors, THEME_DARK } from '@app/core';
import { mockTheme } from '../test_helpers';

describe('components/List', () => {
	beforeEach(() => {
		mockTheme(THEME_DARK);
	});

	it('renders successfully', async () => {
		const titleItem = 'title';
		const data: ListItemData[] = [
			{
				title: titleItem,
			},
		];
		const { baseElement, getByText } = render(<List data={data} />);

		expect(getByText(titleItem)).toBeDefined();
		expect(baseElement).toMatchSnapshot();
	});

	it('renders header items successfully', async () => {
		const titleItem = 'title';
		const data: ListItemData[] = [
			{
				title: titleItem,
				isHeader: true,
			},
		];
		const { baseElement } = render(<List data={data} />);

		expect(baseElement).toMatchSnapshot();
	});

	it('renders item with value successfully', async () => {
		const titleItem = 'title';
		const valueItem = 'value';
		const data: ListItemData[] = [
			{
				title: titleItem,
				value: valueItem,
			},
		];
		const { baseElement, getByText } = render(<List data={data} />);

		expect(baseElement).toMatchSnapshot();
		expect(getByText(valueItem)).toBeDefined();
	});

	it('renders item with icon default successfully', async () => {
		const titleItem = 'title';
		const valueItem = 'value';
		const data: ListItemData[] = [
			{
				title: titleItem,
				value: valueItem,
				showIcon: true,
			},
		];
		const { baseElement } = render(<List data={data} />);

		expect(baseElement).toMatchSnapshot();
	});

	it('renders item with icon custom successfully', async () => {
		const titleItem = 'title';
		const valueItem = 'value';
		const data: ListItemData[] = [
			{
				title: titleItem,
				value: valueItem,
				showIcon: true,
				icon: 'arrow-right',
			},
		];
		const { baseElement } = render(<List data={data} />);

		expect(baseElement).toMatchSnapshot();
	});

	it('renders item with primary successfully', async () => {
		const titleItem = 'title';
		const valueItem = 'value';
		const data: ListItemData[] = [
			{
				title: titleItem,
				value: valueItem,
				primaryColor: colors.blue,
			},
		];
		const { baseElement } = render(<List data={data} />);

		expect(baseElement).toMatchSnapshot();
	});

	it('calls function when pressing successfully', async () => {
		const onPress = jest.fn();

		const titleItem = 'title';
		const valueItem = 'value';
		const data: ListItemData[] = [
			{
				title: titleItem,
				value: valueItem,
				onPress,
			},
		];
		const { baseElement, getByText } = render(<List data={data} />);
		fireEvent.press(getByText(titleItem));
		expect(onPress).toBeCalledTimes(1);
		expect(baseElement).toMatchSnapshot();
	});
});
