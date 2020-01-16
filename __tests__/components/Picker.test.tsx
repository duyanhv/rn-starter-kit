import { PickerDataItem, Picker } from '@app/components';
import RNPicker from 'react-native-picker';
import { THEME_DARK, THEME_LIGHT } from '@app/core';
import { store } from '@app/store';

jest.mock('react-native-picker', () => ({
	init: jest.fn(),
	show: jest.fn(),
}));
jest.mock('i18next', () => ({
	t: jest.fn(),
}));
jest.mock('color-convert', () => ({
	hex: {
		rgb: () => [0, 0, 0],
	},
}));
jest.mock('@app/store/store', () => ({
	store: {
		getState: () => ({}),
	},
}));

describe('components/Picker', () => {
	beforeEach(() => {
		store.getState = jest.fn().mockImplementation(() => ({
			settings: {
				theme: THEME_DARK,
			},
		}));
	});

	it('shows picker successfully', async () => {
		const onValueChanged = jest.fn();

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
		Picker.show({
			dataSources: pickerData,
			initialValue: 'data1',
			onValueChanged,
		});

		expect(RNPicker.init).toBeCalledTimes(1);
		expect(RNPicker.show).toBeCalledTimes(1);
	});

	it('shows picker with light theme successfully', async () => {
		store.getState = jest.fn().mockImplementation(() => ({
			settings: {
				theme: THEME_LIGHT,
			},
		}));
		const onValueChanged = jest.fn();

		const dataSources = [
			{
				value: '1',
				text: 'Value1',
			},
			{
				value: '2',
				text: 'Value2',
			},
		];
		Picker.show<string>({
			onValueChanged,
			initialValue: dataSources[0].value,
			dataSources,
		});

		expect(RNPicker.init).toBeCalledTimes(1);
		expect(RNPicker.show).toBeCalledTimes(1);
	});

	it('shows picker without data', async () => {
		const onValueChanged = jest.fn();

		const pickerData: PickerDataItem<string>[] = [];
		Picker.show({
			dataSources: pickerData,
			initialValue: 'data1',
			onValueChanged,
		});
		expect(RNPicker.init).toBeCalledTimes(1);
		expect(RNPicker.show).toBeCalledTimes(1);
	});

	it('callbacks after changing date', async () => {
		RNPicker.init = ({ onPickerConfirm }: { onPickerConfirm: (selectedArray: string[]) => void }) => {
			onPickerConfirm(['Value2']);
		};
		const onValueChanged = jest.fn();

		const dataSources = [
			{
				value: '1',
				text: 'Value1',
			},
			{
				value: '2',
				text: 'Value2',
			},
		];
		Picker.show<string>({
			onValueChanged,
			initialValue: dataSources[0].value,
			dataSources,
		});

		expect(onValueChanged).toBeCalledWith('2', dataSources[1]);
	});
});
