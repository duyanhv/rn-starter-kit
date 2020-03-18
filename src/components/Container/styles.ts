import { StyleSheet } from 'react-native';
import { colors } from '@app/core';

export const styles = StyleSheet.create({
	fullScreen: {
		flex: 1,
	},
	rootContainerBackground: {
		flex: 0,
	},
	rootContainer: {
		flex: 1,
	},
	header: {
		height: 50,
		flexDirection: 'row',
		alignSelf: 'flex-start',
	},
	headerText: {
		minWidth: 150,
	},
	title: {
		color: colors.white,
	},
	icon: {
		marginLeft: 10,
		marginRight: 10,
	},
	backButton: {
		width: 50,
	},
});
