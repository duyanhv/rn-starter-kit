import { ScreenProps, getWidthHeightByPercentages } from '@app/core';
import { Image, Platform, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import React from 'react';
import { View, Container, Icon, Text } from '@app/components';
// import Animated from 'react-native-reanimated';
import { Navigation } from 'react-native-navigation';
import { useEffectOnce } from '@app/hooks';
import { navigationService } from '@app/services';
import { Distribution } from '@app/assets';
import { styles } from './styles';

interface Props extends ScreenProps {
	data: Distribution;
}

export const Screen = (props: Props): JSX.Element => {
	useEffectOnce(() => {
		Platform.select({
			ios: (() => {
				navigationService.navigateOptions({
					componentId: props.componentId,
					options: {
						statusBar: {
							style: 'light',
						},
					},
				});
			})(),
		});
	});
	// const circleRadius = 30;
	// const touchX = new Animated.Value(Dimensions.get('window').width / 2 - circleRadius);
	// const [keyFrame, setKeyFrame] = React.useState({
	// 	from: {
	// 		translateY: -100,
	// 	},
	// 	to: {
	// 		translateY: 0,
	// 	},
	// });
	// function dismissModal(): void {
	// 	setKeyFrame({
	// 		from: {
	// 			translateY: 0,
	// 		},
	// 		to: {
	// 			translateY: 300,
	// 		},
	// 	});
	// }
	return (
		<Container componentId={props.componentId}>
			{Platform.OS === 'ios' && <StatusBar barStyle={'light-content'} animated={true} />}
			<TouchableOpacity
				style={styles.closeButton}
				onPress={() => {
					Navigation.dismissModal(props.componentId);
				}}
			>
				{/* <Text
					style={{
						fontSize: getWidthHeightByPercentages('width', 8),
					}}
				>
					X
				</Text> */}
				<Icon name='times' size={getWidthHeightByPercentages('width', 6)} />
			</TouchableOpacity>
			<ScrollView style={styles.fullScreen} showsVerticalScrollIndicator={false}>
				<View style={styles.imageWrapper}>
					<Image
						style={styles.centerImage}
						source={{
							uri: props.data.MobilePicturePath,
						}}
					/>
				</View>
				<View
					style={{
						width: getWidthHeightByPercentages('width', 100),
						height: getWidthHeightByPercentages('height', 40),
					}}
				>
					<Text bold>{props.data.Name}</Text>
				</View>
			</ScrollView>
		</Container>
	);
};
