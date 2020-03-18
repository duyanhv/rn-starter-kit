import { StyleSheet } from 'react-native';
import { getWidthHeightByPercentages, THEME_DARK } from '@app/core';
import { store } from '@app/store';

const { theme } = store.getState().settings;
export const styles = StyleSheet.create({
	container: {
		height: getWidthHeightByPercentages('height', 40),
		width: getWidthHeightByPercentages('width', 70),
		// backgroundColor: '#beebe9',
		marginRight: 15,
		marginBottom: 10,
		overflow: 'hidden',
		zIndex: 1,
	},
	fullScreen: {
		flex: 1,
	},
	saveButton: {
		backgroundColor: theme === THEME_DARK ? 'rgba(46, 49, 49, 0.8)' : 'rgba(232, 236, 241, 0.8)',
		borderRadius: getWidthHeightByPercentages('width', 15),
		width: getWidthHeightByPercentages('width', 15),
		height: getWidthHeightByPercentages('width', 15),
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		right: 10,
		top: 10,
		zIndex: 1,
	},
	mainViewImageWrapper: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 10,
	},
	mainImage: {
		resizeMode: 'cover',
		position: 'absolute',
		borderRadius: 7,
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
	descriptionImageBackground: {
		flex: 1,
	},
	descriptionText: {},
	reviewText: {
		paddingLeft: 3,
	},
});
