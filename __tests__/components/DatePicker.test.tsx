import MockDate from 'mockdate';
import { DatePicker, DateValue } from '@app/components';
import RNPicker from 'react-native-picker';
import { store } from '@app/store';
import { THEME_LIGHT, THEME_DARK } from '@app/core';

jest.mock('react-native-picker', () => ({
	init: jest.fn(),
	show: jest.fn(),
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

describe('components/DatePicker', () => {
	beforeEach(() => {
		store.getState = jest.fn().mockImplementation(() => ({
			settings: {
				theme: THEME_DARK,
			},
		}));
	});

	it('shows picker successfully', async () => {
		const onValueChanged = jest.fn();

		const date: DateValue = {
			year: 2000,
			month: 1,
			day: 1,
		};
		DatePicker.show({
			onValueChanged,
			initialValue: date,
			fromYear: 1990,
			toYear: 2020,
		});
		expect(RNPicker.init).toBeCalledTimes(1);
		expect(RNPicker.show).toBeCalledTimes(1);
	});

	it('shows picker with default value successfully', async () => {
		MockDate.set(new Date(1546304400000));
		const onValueChanged = jest.fn();

		const date: DateValue = {
			year: 2000,
			month: 1,
			day: 1,
		};
		DatePicker.show({
			onValueChanged,
			initialValue: date,
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

		const date: DateValue = {
			year: 2000,
			month: 1,
			day: 1,
		};
		DatePicker.show({
			onValueChanged,
			initialValue: date,
			fromYear: 1990,
			toYear: 2020,
		});
		expect(RNPicker.init).toBeCalledTimes(1);
		expect(RNPicker.show).toBeCalledTimes(1);
	});

	it('renders months & days of week correctly', async () => {
		const onValueChanged = jest.fn();

		[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach((month) => {
			const date: DateValue = {
				year: 2000,
				month,
				day: 1,
			};
			DatePicker.show({
				onValueChanged,
				initialValue: date,
				fromYear: 1990,
				toYear: 2020,
			});
		});
	});

	it('callbacks after changing date', async () => {
		[
			'month.january',
			'month.february',
			'month.march',
			'month.april',
			'month.may',
			'month.june',
			'month.july',
			'month.august',
			'month.september',
			'month.october',
			'month.november',
			'month.december',
		].forEach((month) => {
			RNPicker.init = ({ onPickerConfirm }: { onPickerConfirm: (selectedDateArray: string[]) => void }) => {
				onPickerConfirm(['2019', month, '1']);
			};
			const onValueChanged = jest.fn();

			const date: DateValue = {
				year: 2000,
				month: 1,
				day: 1,
			};
			DatePicker.show({
				onValueChanged,
				initialValue: date,
				fromYear: 1990,
				toYear: 2020,
			});

			expect(onValueChanged).toBeCalledTimes(1);
		});
	});
});
