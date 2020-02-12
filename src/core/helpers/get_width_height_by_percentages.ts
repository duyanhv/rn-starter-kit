import { Dimensions } from 'react-native';

type WidthHeightType = 'width' | 'height';
export function getWidthHeightByPercentages(type: WidthHeightType, percentage: number): number {
	if ((type !== 'height' && type !== 'width') || percentage > 100) {
		return 0;
	}
	const viewWidth = Dimensions.get('window').width;
	const viewHeight = Dimensions.get('window').height;
	if (type === 'height') {
		return (viewHeight * percentage) / 100;
	}
	return (viewWidth * percentage) / 100;
}
