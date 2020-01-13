import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import RNTooltip from 'rn-tooltip';
import { combineStyles } from '@app/core';
import { styles } from './styles';

interface Props {
	popover?: React.ReactElement<{}>;
	withPointer?: boolean;
	toggleOnPress?: boolean;
	height?: number | string;
	width?: number | string;
	containerStyle?: StyleProp<ViewStyle>;
	pointerColor?: string;
	onClose?: () => void;
	onOpen?: () => void;
	withOverlay?: boolean;
	overlayColor?: string;
	backgroundColor?: string;
	highlightColor?: string;
	children?: ReactNode;
	actionType: 'press' | 'longPress' | 'none';
}

export const Tooltip = (props: Props): JSX.Element => {
	const containerStyle = combineStyles<ViewStyle>(styles.container, props.containerStyle);
	return (
		<RNTooltip {...props} containerStyle={containerStyle}>
			{props.children}
		</RNTooltip>
	);
};
