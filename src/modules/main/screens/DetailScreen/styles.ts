import { StyleSheet } from 'react-native';
import { getWidthHeightByPercentages } from '@app/core';

export const styles = StyleSheet.create({
	fullScreen: {
		flex: 1,
	},
	root: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'green',
	},
	description: {
		fontSize: 15,
		letterSpacing: 0.2,
		lineHeight: 25,
		marginTop: 32,
		marginHorizontal: 24,
	},
	closeButton: {
		backgroundColor: 'rgba(232, 236, 241, 0.7)',
		borderRadius: getWidthHeightByPercentages('width', 9),
		width: getWidthHeightByPercentages('width', 9),
		height: getWidthHeightByPercentages('width', 9),
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		right: 20,
		top: 30,
		zIndex: 1,
	},
	imageWrapper: {
		width: getWidthHeightByPercentages('width', 100),
		height: getWidthHeightByPercentages('height', 40),
		justifyContent: 'center',
		alignItems: 'center',
	},
	centerImage: {
		resizeMode: 'cover',
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
});
