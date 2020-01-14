import { StyleSheet } from 'react-native';
import { colors } from '@app/core';

export const styles = StyleSheet.create({
	header: {
		fontWeight: 'bold',
		fontSize: 20,
		color: colors.white,
	},
	value: {
		color: colors.white,
	},
	right: {
		flexDirection: 'row-reverse',
		minWidth: 100,
		alignItems: 'center',
	},
	spaceBottomFlatList: {
		paddingBottom: 230,
	},
});
