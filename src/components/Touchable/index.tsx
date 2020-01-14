import React, { ReactNode } from 'react';
import { Platform, TouchableNativeFeedback, TouchableOpacity, ViewProps } from 'react-native';
import { View } from '../View';

interface Props extends ViewProps {
	onPress?: () => void;
	children?: ReactNode;
}

export const Touchable = (props: Props): JSX.Element => {
	if (Platform.OS === 'ios') {
		return (
			<TouchableOpacity onPress={props.onPress}>
				<View {...props}>{props.children}</View>
			</TouchableOpacity>
		);
	}
	return (
		<TouchableNativeFeedback onPress={props.onPress}>
			<View {...props}>{props.children}</View>
		</TouchableNativeFeedback>
	);
};
