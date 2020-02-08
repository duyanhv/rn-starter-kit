import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
export const styles = StyleSheet.create({
	container: {
		padding: 22,
		flex: 1,
	},
	closeButton: {
		fontSize: 30,
		color: '#fff',
	},
	animationWrapper: {
		marginTop: 50,
		flex: 8,
	},
	scrollViewContainer: {
		flexGrow: 1,
	},
	textCenter: {
		textAlign: 'center',
	},
	columnWrapper: {
		flex: 1,
		flexDirection: 'column',
	},
	descWrapper: {
		marginTop: 30,
	},
	descText: {
		paddingTop: 15,
	},
	centerContent: {
		flex: 1,
		justifyContent: 'center',
	},
	navigationWrapper: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	button: {
		width: width / 2 - ((width / 2) * 30) / 100,
		margin: 10,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	screenIndex: {
		width: 10,
		height: 10,
		borderRadius: 10,
		margin: 10,
	},
	screenIndexWrapper: {
		flex: 2,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	absoluteView: {
		position: 'absolute',
	},
});
