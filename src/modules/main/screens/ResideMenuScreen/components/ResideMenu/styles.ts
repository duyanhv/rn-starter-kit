import { StyleSheet } from 'react-native';
import { getWidthHeightByPercentages, colors } from '@app/core';

export const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
	},
	menuButton: {
		position: 'absolute',
		marginTop: getWidthHeightByPercentages('height', 6),
		marginLeft: getWidthHeightByPercentages('height', 2),
		zIndex: 2,
	},
	sideBar: {
		zIndex: 1,
		position: 'absolute',
		marginTop: getWidthHeightByPercentages('height', 10),
		padding: 25,
		width: getWidthHeightByPercentages('width', 80),
		height: getWidthHeightByPercentages('height', 76),
		overflow: 'hidden',
	},
	infoView: {
		position: 'absolute',
		zIndex: 1,
		width: getWidthHeightByPercentages('width', 83),
		height: getWidthHeightByPercentages('height', 10),
		overflow: 'hidden',
		justifyContent: 'center',
		alignItems: 'center',
		left: getWidthHeightByPercentages('width', 50) - getWidthHeightByPercentages('width', 83) / 2,
		borderRadius: getWidthHeightByPercentages('height', 5),
		backgroundColor: colors.yellow,
		padding: getWidthHeightByPercentages('height', 3),
	},
	mainViewWrapper: {
		overflow: 'hidden',
		zIndex: 1,
	},
});
