import RNPicker, { PickerOptions } from 'react-native-picker';
import i18next from 'i18next';
import colorConvert from 'color-convert';
import _ from 'lodash';
import { store } from '@app/store';
import { colors, getPrimaryColor, THEME_DARK } from '@app/core';

export interface DateValue {
	year: number;
	month: number;
	day: number;
}

type DateData = {
	[year: string]: { [month: string]: string[] }[];
}[];

interface PickerParams {
	fromYear?: number;
	toYear?: number;
	initialValue?: DateValue;
	onValueChanged: (value: DateValue) => void;
}

const getMonthText = (month: number): string => {
	switch (month) {
		case 2:
			return i18next.t('month.february');
		case 3:
			return i18next.t('month.march');
		case 4:
			return i18next.t('month.april');
		case 5:
			return i18next.t('month.may');
		case 6:
			return i18next.t('month.june');
		case 7:
			return i18next.t('month.july');
		case 8:
			return i18next.t('month.august');
		case 9:
			return i18next.t('month.september');
		case 10:
			return i18next.t('month.october');
		case 11:
			return i18next.t('month.november');
		case 12:
			return i18next.t('month.december');
		default:
			return i18next.t('month.january');
	}
};

const getMonthFromText = (text: string): number => {
	switch (text) {
		case i18next.t('month.february'):
			return 2;
		case i18next.t('month.march'):
			return 3;
		case i18next.t('month.april'):
			return 4;
		case i18next.t('month.may'):
			return 5;
		case i18next.t('month.june'):
			return 6;
		case i18next.t('month.july'):
			return 7;
		case i18next.t('month.august'):
			return 8;
		case i18next.t('month.september'):
			return 9;
		case i18next.t('month.october'):
			return 10;
		case i18next.t('month.november'):
			return 11;
		case i18next.t('month.december'):
			return 12;
		default:
			return 1;
	}
};

const createDateData = (fromDate: DateValue, toDate: DateValue): DateData => {
	const date = [];
	for (let { year } = fromDate; year <= toDate.year; year += 1) {
		const monthArray = [];
		for (let month = 1; month <= 12; month += 1) {
			const dayData = [];
			if (month === 2) {
				for (let k = 1; k <= 28; k += 1) {
					dayData.push(`${k}`);
				}
				// Leap day for years that are divisible by 4, such as 2000, 2004
				if (year % 4 === 0) {
					dayData.push(`${29}`);
				}
			} else if ([1, 3, 5, 7, 8, 10, 12].indexOf(month) > -1) {
				for (let day = 1; day <= 31; day += 1) {
					dayData.push(`${day}`);
				}
			} else {
				for (let k = 1; k <= 30; k += 1) {
					dayData.push(`${k}`);
				}
			}
			const monthData: { [month: string]: string[] } = {};
			monthData[`${getMonthText(month)}`] = dayData;
			monthArray.push(monthData);
		}
		const dateData: { [year: string]: { [month: string]: string[] }[] } = {};
		dateData[`${year}`] = monthArray;
		date.push(dateData);
	}
	return date;
};

const show = ({ onValueChanged, initialValue, fromYear, toYear }: PickerParams): void => {
	const pickerData = createDateData(
		{
			year: fromYear || 1970,
			month: 1,
			day: 1,
		},
		{
			year: toYear || new Date().getFullYear(),
			month: 1,
			day: 1,
		},
	);

	const onPickerConfirm = (selectedDateArray: string[]): void => {
		const selectedDate: DateValue = {
			year: parseInt(selectedDateArray[0], 10),
			month: getMonthFromText(selectedDateArray[1]),
			day: parseInt(selectedDateArray[2], 10),
		};
		!_.isEqual(selectedDate, initialValue) && onValueChanged(selectedDate);
	};

	let selectedValue: string[] | undefined;
	initialValue &&
		(selectedValue = [initialValue.year.toString(), getMonthText(initialValue.month), initialValue.day.toString()]);
	const { primaryColorCode, theme } = store.getState().settings;
	const primaryColor = getPrimaryColor(primaryColorCode, theme);
	const primaryColorHexArr = [...colorConvert.hex.rgb(primaryColor), 1];
	const whiteColorHexArr = [...colorConvert.hex.rgb(colors.white), 1];
	const pickerTextColorHexArr = [...colorConvert.hex.rgb(theme === THEME_DARK ? colors.white : primaryColor), 1];
	const pickerBackgroundHexArr = [
		...colorConvert.hex.rgb(theme === THEME_DARK ? colors.lightBlack : colors.white),
		1,
	];
	const pickerOptions: PickerOptions = {
		pickerConfirmBtnText: i18next.t('common.confirm'),
		pickerCancelBtnText: i18next.t('common.cancel'),
		pickerTitleText: i18next.t('common.select'),
		pickerBg: pickerBackgroundHexArr,
		pickerFontColor: pickerTextColorHexArr,
		pickerToolBarBg: primaryColorHexArr,
		pickerTitleColor: whiteColorHexArr,
		pickerCancelBtnColor: whiteColorHexArr,
		pickerConfirmBtnColor: whiteColorHexArr,
		pickerData,
		onPickerConfirm,
		selectedValue,
	};

	RNPicker.init(pickerOptions);
	RNPicker.show();
};

export const DatePicker = {
	show,
};
