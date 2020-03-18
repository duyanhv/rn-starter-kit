import React, { ReactNode } from 'react';
import { ViewProps, ViewStyle } from 'react-native';
import { useTheme } from '../../hooks';
import { combineStyles } from '../../core/helpers/combine_styles';
import { Touchable } from '../Touchable';
import { styles } from './styles';

interface Props extends ViewProps {
	children?: ReactNode;
	transparent?: boolean;
	outline?: boolean;
	disabled?: boolean;
	rounded?: boolean;
	width?: number;
	success?: boolean;
	info?: boolean;
	warning?: boolean;
	danger?: boolean;
	onPress: () => void;
}

export const Button = (props: Props): JSX.Element => {
	const { primaryColor } = useTheme();
	const rounded = props.rounded !== false;
	const style = combineStyles<ViewStyle>(
		styles.default,
		{
			backgroundColor: primaryColor,
			width: props.width ? props.width : 200,
		},
		props.style,
		props.transparent && styles.transparent,
		props.outline && styles.outline,
		props.outline && {
			borderColor: primaryColor,
		},
		props.disabled && styles.disabled,
		props.success && styles.success,
		props.info && styles.info,
		props.warning && styles.warning,
		props.danger && styles.danger,
		rounded && styles.rounded,
	);
	const boldStyle = {
		fontWeight: 'bold',
	};
	const addedStyle = {
		style: boldStyle,
		numberOfLines: 1,
	};
	const childrenWithProps = React.Children.map(props.children, (child) =>
		child ? React.cloneElement(child as JSX.Element, addedStyle) : child,
	);

	return (
		<>
			<Touchable {...props} style={style}>
				{childrenWithProps}
			</Touchable>
		</>
	);
};
