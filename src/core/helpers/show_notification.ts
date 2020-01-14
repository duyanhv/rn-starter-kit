import Toast from 'react-native-root-toast';
import { colors } from '../themes/colors';

export const showNotification = ({
	type,
	message,
}: {
	type: 'SUCCESS' | 'WARNING' | 'ERROR';
	message: string;
}): void => {
	let backgroundColor: string;
	switch (type) {
		case 'ERROR':
			backgroundColor = colors.red;
			break;
		case 'WARNING':
			backgroundColor = colors.orange;
			break;
		default:
			backgroundColor = colors.green;
			break;
	}
	Toast.show(message, {
		position: Toast.positions.TOP,
		backgroundColor,
		shadow: true,
		animation: true,
		hideOnPress: true,
		delay: 0,
		duration: type === 'SUCCESS' ? 1000 : Toast.durations.LONG,
	});
};
