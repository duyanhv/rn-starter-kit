import RNPicker, { PickerOptions } from 'react-native-picker';
import i18next from 'i18next';
import colorConvert from 'color-convert';
import { store } from '@app/store';
import { colors, getPrimaryColor, THEME_DARK } from '@app/core';

export interface PickerDataItem<T> {
	value: T;
	text: string;
}
interface PickerParams<T> {
	dataSources: PickerDataItem<T>[];
	initialValue?: T;
	onValueChanged: (value: T, item: PickerDataItem<T>) => void;
}

const show: <T>(options: PickerParams<T>) => void = (options) => {
	const { onValueChanged, dataSources, initialValue } = options;

	const pickerData = options.dataSources.map((data) => data.text);
	const onPickerConfirm = (selectedItems: string[]): void => {
		const selectedText = selectedItems[0];
		const selectedItem = dataSources.find((data) => data.text === selectedText);
		selectedItem && selectedItem.value !== initialValue && onValueChanged(selectedItem.value, selectedItem);
	};
	const selectedItem = dataSources.find((data) => data.value === initialValue);
	let selectedValue: string[] | undefined;
	selectedItem && (selectedValue = [selectedItem.text]);

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

export const Picker = {
	show,
};
