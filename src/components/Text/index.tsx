import React, { ReactNode } from 'react';
import { Text as NBText, TextProps, TextStyle } from 'react-native';
import { combineStyles, colors } from '@app/core';
import { useTheme } from '@app/hooks';
import { styles } from './styles';

interface Props extends TextProps {
	primary?: boolean;
	children?: ReactNode;
	white?: boolean;
	bold?: boolean;
	h1?: boolean;
	h2?: boolean;
	h3?: boolean;
	h4?: boolean;
	h5?: boolean;
	h6?: boolean;
	s1?: boolean;
	s2?: boolean;
	success?: boolean;
	info?: boolean;
	warning?: boolean;
	danger?: boolean;
}

export const Text = (props: Props): JSX.Element => {
	const { primaryColor, textColor } = useTheme();

	const style = combineStyles<TextStyle>(
		styles.default,
		{
			color: textColor,
		},
		props.style,
		props.primary && {
			color: primaryColor,
		},
		props.white && {
			color: colors.white,
		},
		props.bold && styles.bold,
		props.h1 && styles.h1,
		props.h2 && styles.h2,
		props.h3 && styles.h3,
		props.h4 && styles.h4,
		props.h5 && styles.h5,
		props.h6 && styles.h6,
		props.s1 && styles.s1,
		props.s2 && styles.s2,
		props.success && styles.success,
		props.info && styles.info,
		props.warning && styles.warning,
		props.danger && styles.danger,
	);

	return (
		<>
			<NBText {...props} style={style}>
				{props.children}
			</NBText>
		</>
	);
};
