import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '@app/core';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		width,
		height,
	},
	modalContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		width,
		height,
		backgroundColor: colors.red,
	},
	contentContainer: {},
	alertContainer: {
		borderRadius: 5,
		backgroundColor: colors.white,
	},
	lineGrey: {
		backgroundColor: colors.grey,
		height: 1,
	},
	titleText: {
		textAlign: 'center',
		fontSize: 16,
		paddingVertical: 10,
		color: colors.white,
		fontWeight: 'bold',
	},
	titleDefault: {
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
		padding: 5,
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
	},
	messageText: {
		textAlign: 'center',
		paddingVertical: 15,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 10,
	},
	buttonDialog: {
		marginHorizontal: 5,
		width: 80,
	},
	textSpecial: {
		color: colors.white,
	},
	columnGrey: {
		width: 1,
		height: '100%',
		backgroundColor: colors.grey,
	},
	reserveContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 10,
	},
	dialogIcon: {
		width: 30,
		height: 30,
	},
});
