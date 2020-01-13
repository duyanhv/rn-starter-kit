import { Dimensions, Platform, StatusBar } from 'react-native';

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const { height, width } = Dimensions.get('window');

const isIPhoneX = (): boolean =>
	Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS
		? (width === X_WIDTH && height === X_HEIGHT) || (width === XSMAX_WIDTH && height === XSMAX_HEIGHT)
		: false;

export const getStatusHeight = (): number =>
	Platform.select({
		ios: isIPhoneX() ? 44 : 20,
		android: StatusBar.currentHeight,
		default: 0,
	});
