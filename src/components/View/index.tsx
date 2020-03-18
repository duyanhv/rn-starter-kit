import React from 'react';
import { View as RNVIew, ViewProps } from 'react-native';
import { combineStyles } from '@app/core';
import { styles } from './styles';

interface Props extends ViewProps {
	flex?: number;
	center?: boolean;
	centerVertical?: boolean;
	row?: boolean;
	column?: boolean;
	rowReverse?: boolean;
	columnReverse?: boolean;
	children?: React.ReactNode;
	// ref?: LegacyRef<RNVIew>;
}

export const View = (props: Props): JSX.Element => {
	const viewStyle = combineStyles(
		styles.default,
		props.style,
		props.center && styles.center,
		props.centerVertical && styles.centerVertical,
		props.row && styles.row,
		props.column && styles.column,
		props.rowReverse && styles.rowReverse,
		props.columnReverse && styles.columnReverse,
		!!props.flex && {
			flex: props.flex,
		},
	);

	return (
		<RNVIew {...props} style={viewStyle}>
			{props.children}
		</RNVIew>
	);
};
