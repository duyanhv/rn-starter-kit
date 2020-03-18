import React, { useState } from 'react';
import {
	TextInput,
	NativeSyntheticEvent,
	TextInputFocusEventData,
	KeyboardTypeOptions,
	ViewStyle,
	TextStyle,
} from 'react-native';
import { colors, THEME_DARK, formatDate } from '@app/core';
import { useTheme } from '@app/hooks';
import { DatePicker, DateValue } from '../DatePicker';

import { Tooltip } from '../Tooltip';
import { View } from '../View';
import { Text } from '../Text';
import { styles } from './styles';
import { ErrorText } from '../ErrorText';
import { Icon } from '../Icon';
import { Picker, PickerDataItem } from '../Picker';
import { Touchable } from '../Touchable';

interface Props {
	label: string;
	value: string;
	error?: boolean;
	success?: boolean;
	errorColor?: string;
	successColor?: string;
	containerStyle?: ViewStyle;
	inputStyle?: ViewStyle;
	labelStyle?: TextStyle;
	errorMessage?: string;
	hasTooltip?: boolean;
	tooltipHeight?: number;
	tooltipWidth?: number;
	tooltipText?: string;
	onChangeText?: (text: string) => void;
	onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
	secureTextEntry?: boolean;
	type?: 'text' | 'picker' | 'datepicker';
	pickerDataSources?: PickerDataItem<string>[];
	keyboardType?: KeyboardTypeOptions;
	placeHolderTextColor?: string;
	hasPassword?: boolean;
	datePickerFromYear?: number;
	datePickerToYear?: number;
	inputTextColor?: string;
}

export const Field = (props: Props): JSX.Element => {
	const { primaryColor, textColor, screenBackgroundColor, theme } = useTheme();
	let borderColor = primaryColor;
	if (props.error) {
		borderColor = props.errorColor ? props.errorColor : colors.red;
	} else if (props.success) {
		borderColor = props.successColor ? props.successColor : colors.green;
	}
	let tooltipBackgroundColor = colors.black;
	let tooltipTextColor = colors.white;
	if (theme === THEME_DARK) {
		tooltipBackgroundColor = colors.white;
		tooltipTextColor = colors.black;
	} else {
		tooltipBackgroundColor = colors.black;
		tooltipTextColor = colors.white;
	}

	let initialItem: PickerDataItem<string> | undefined;
	if (props.pickerDataSources) {
		initialItem = props.pickerDataSources.find((item) => item.value === props.value);
	}
	const [selectedItem, setSelectedItem] = useState<PickerDataItem<string> | undefined>(initialItem);
	const [shouldShowPassword, updateShowPassword] = useState<boolean>(false);
	const [date, setDate] = useState<DateValue | undefined>(undefined);

	const showPassword = (): void => {
		updateShowPassword(true);
	};

	const openPicker = (): void => {
		if (!props.pickerDataSources) {
			return;
		}
		Picker.show({
			dataSources: props.pickerDataSources,
			initialValue: props.value,
			onValueChanged: (value, item) => {
				setSelectedItem(item);
				props.onChangeText && props.onChangeText(value);
			},
		});
	};

	const openDatePicker = (): void => {
		const currentDate = new Date();
		DatePicker.show({
			initialValue: {
				year: currentDate.getFullYear(),
				month: currentDate.getMonth(),
				day: currentDate.getDate(),
			},
			onValueChanged: (dateValue) => {
				setDate(dateValue);
				props.onChangeText && props.onChangeText(formatDate(dateValue));
			},
			fromYear: props.datePickerFromYear ? props.datePickerFromYear : currentDate.getFullYear(),
			toYear: props.datePickerToYear ? props.datePickerToYear : currentDate.getFullYear(),
		});
	};

	return (
		<View
			style={[
				styles.container,
				{
					backgroundColor: screenBackgroundColor,
					...props.containerStyle,
				},
			]}
		>
			<View
				row
				center
				style={{
					backgroundColor: screenBackgroundColor,
				}}
			>
				<Text
					style={[
						styles.label,
						{
							color: textColor,
							...props.labelStyle,
						},
					]}
				>
					{props.label}
				</Text>
				{props.hasTooltip && !!props.tooltipText && (
					<Tooltip
						width={props.tooltipWidth || 250}
						height={props.tooltipHeight || 50}
						backgroundColor={tooltipBackgroundColor}
						withOverlay={false}
						actionType={'longPress'}
						popover={
							<Text
								style={{
									color: tooltipTextColor,
								}}
							>
								{props.tooltipText}
							</Text>
						}
					>
						<Icon name='information-outline' size={14} style={styles.tooltipIcon} color={textColor} />
					</Tooltip>
				)}
			</View>
			{(!props.type || props.type === 'text') && (
				<View
					style={[
						styles.textInput,
						{
							borderColor,
							...props.inputStyle,
						},
					]}
				>
					<TextInput
						style={{
							color: props.inputTextColor ? props.inputTextColor : textColor,
						}}
						value={props.value}
						onChangeText={props.onChangeText}
						onBlur={props.onBlur}
						secureTextEntry={shouldShowPassword ? false : props.secureTextEntry}
						keyboardType={props.keyboardType}
						placeholder={props.label}
						placeholderTextColor={props.placeHolderTextColor ? props.placeHolderTextColor : textColor}
					/>
				</View>
			)}
			{!!props.hasPassword && (
				<Touchable onPress={showPassword} style={styles.eyeIcon}>
					<Icon name={'eye-outline'} color={colors.white} size={20} />
				</Touchable>
			)}
			{props.type === 'picker' && (
				<Touchable onPress={openPicker}>
					<View
						row
						style={[
							styles.textInput,
							{
								borderColor,
								...props.inputStyle,
							},
						]}
					>
						<Text
							style={[
								styles.pickerText,
								{
									color: props.placeHolderTextColor ? props.placeHolderTextColor : textColor,
								},
							]}
						>
							{selectedItem ? selectedItem.text : ''}
						</Text>
						<View style={styles.eyeIcon}>
							<Icon name={'chevron-down'} color={colors.white} size={20} />
						</View>
					</View>
				</Touchable>
			)}
			{props.type === 'datepicker' && (
				<Touchable onPress={openDatePicker}>
					<View
						row
						style={[
							styles.textInput,
							{
								borderColor,
								...props.inputStyle,
							},
						]}
					>
						<Text
							style={[
								styles.pickerText,
								{
									color: props.placeHolderTextColor ? props.placeHolderTextColor : textColor,
								},
							]}
						>
							{!date ? props.label : formatDate(date)}
						</Text>
						<View style={styles.eyeIcon}>
							<Icon name={'chevron-down'} color={colors.white} size={20} />
						</View>
					</View>
				</Touchable>
			)}
			{props.error && (
				<ErrorText
					style={[
						styles.error,
						{
							color: props.errorColor ? props.errorColor : colors.red,
						},
					]}
				>
					{props.errorMessage}
				</ErrorText>
			)}
		</View>
	);
};
