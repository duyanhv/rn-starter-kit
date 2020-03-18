import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '@app/core';

const SCREEN_WIDTH = Dimensions.get('window').width; // get current width
const SCALE = 375; // constant, 375 is standard width of  iphone 6 / 7 / 8

const scaleFontSize = (fontSize: number): number => {
	const ratio = fontSize / SCALE; // get ratio based on your standard scale
	const newSize = Math.round(ratio * SCREEN_WIDTH);
	return newSize;
};
const bold = '500';
export const styles = StyleSheet.create({
	default: {
		textTransform: 'none',
		fontFamily: 'System',
	},
	bold: {
		fontWeight: bold,
	},
	h1: {
		fontSize: scaleFontSize(36),
		fontWeight: bold,
	},
	h2: {
		fontSize: scaleFontSize(32),
		fontWeight: bold,
	},
	h3: {
		fontSize: scaleFontSize(28),
		fontWeight: bold,
	},
	h4: {
		fontSize: scaleFontSize(24),
		fontWeight: bold,
	},
	h5: {
		fontSize: scaleFontSize(20),
		fontWeight: bold,
	},
	h6: {
		fontSize: scaleFontSize(18),
		fontWeight: bold,
	},
	s1: {
		fontSize: 16,
	},
	s2: {
		fontSize: 14,
	},
	success: {
		color: colors.green,
	},
	info: {
		color: colors.blue,
	},
	warning: {
		color: colors.orange,
	},
	danger: {
		color: colors.red,
	},
});
