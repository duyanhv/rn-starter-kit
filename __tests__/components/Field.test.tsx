import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Field, Picker, PickerDataItem } from '@app/components';
import { THEME_DARK, THEME_LIGHT } from '@app/core';
import { mockTheme } from '../test_helpers';

describe('components/Field', () => {
	const labelText = 'label';
	const valueText = 'value';
	const errorText = 'error';
	const tooltipText = 'tooltip';
	beforeEach(() => {
		mockTheme(THEME_DARK);
	});

	it('renders successfully', async () => {
		const { baseElement } = render(<Field label={labelText} value={valueText} />);

		expect(baseElement).toMatchSnapshot();
	});

	it('renders with light theme successfully', async () => {
		mockTheme(THEME_LIGHT);
		const { baseElement } = render(<Field label={labelText} value={valueText} />);

		expect(baseElement).toMatchSnapshot();
	});

	it('renders with error successfully', async () => {
		const { baseElement, getByText } = render(
			<Field label={labelText} value={valueText} error errorMessage={errorText} />,
		);

		expect(getByText(errorText)).toBeDefined();
		expect(baseElement).toMatchSnapshot();
	});

	it('renders with success successfully', async () => {
		const { baseElement } = render(<Field label={labelText} value={valueText} success />);

		expect(baseElement).toMatchSnapshot();
	});

	it('renders with tooltip successfully', async () => {
		const { baseElement, getByText } = render(
			<Field
				label={labelText}
				value={valueText}
				hasTooltip
				tooltipHeight={100}
				tooltipWidth={100}
				tooltipText={tooltipText}
			/>,
		);

		expect(getByText(tooltipText)).toBeDefined();
		expect(baseElement).toMatchSnapshot();
	});

	it('renders with tooltip without specifying width and height successfully', async () => {
		const { baseElement, getByText } = render(
			<Field label={labelText} value={valueText} hasTooltip tooltipText={tooltipText} />,
		);

		expect(getByText(tooltipText)).toBeDefined();
		expect(baseElement).toMatchSnapshot();
	});

	it('changes text value successfully', async () => {
		const changedText = 'changed';

		const onChangeText = jest.fn();
		const { getByDisplayValue } = render(
			<Field label={labelText} value={valueText} type={'text'} onChangeText={onChangeText} />,
		);
		fireEvent.changeText(getByDisplayValue(valueText), changedText);

		expect(onChangeText).toBeCalledWith(changedText);
	});

	it('shows picker when pressing text (Picker Field)', async () => {
		Picker.show = jest.fn();

		const pickerData: PickerDataItem<string>[] = [
			{
				value: 'data1',
				text: 'text1',
			},
			{
				value: 'data2',
				text: 'text2',
			},
		];
		const { getByText } = render(
			<Field label={labelText} value={'data1'} type={'picker'} pickerDataSources={pickerData} />,
		);
		fireEvent.press(getByText('text1'));

		expect(Picker.show).toBeCalledTimes(1);
	});

	it('does not show picker when pressing text (Picker Field) if dataSource is undefined', async () => {
		Picker.show = jest.fn();
		const { getByText } = render(<Field label={labelText} value={'data1'} type={'picker'} />);
		fireEvent.press(getByText(''));

		expect(Picker.show).not.toBeCalled();
	});

	it('changes value of Picker Field successfully', async () => {
		const mockShow: <T>(options: {
			dataSources: PickerDataItem<T>[];
			initialValue?: T;
			onValueChanged: (value: T, item: PickerDataItem<T>) => void;
		}) => void = (options) => {
			options.onValueChanged &&
				options.onValueChanged(
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					'data2' as any,
					{
						value: 'data1',
						text: 'text1',
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
					} as any,
				);
		};
		Picker.show = mockShow;
		const onChangeText = jest.fn();

		const pickerData: PickerDataItem<string>[] = [
			{
				value: 'data1',
				text: 'text1',
			},
			{
				value: 'data2',
				text: 'text2',
			},
		];
		const { getByText } = render(
			<Field
				label={labelText}
				value={'data1'}
				type={'picker'}
				pickerDataSources={pickerData}
				onChangeText={onChangeText}
			/>,
		);
		fireEvent.press(getByText('text1'));

		expect(onChangeText).toBeCalledTimes(1);
	});
});
