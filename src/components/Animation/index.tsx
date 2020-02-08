import React from 'react';
import { Resource } from '@app/core';
import LottieView from 'lottie-react-native';
import { View } from 'native-base';
import { styles } from './styles';

interface Props {
	width: number;
	height: number;
	source: Resource;
	autoPlay?: boolean;
	loop?: boolean;
}

export const Animation = (props: Props): JSX.Element => {
	return (
		<View
			style={{
				width: props.width,
				height: props.height,
			}}
		>
			<View style={styles.wrapper}>
				<LottieView
					source={props.source}
					style={{
						width: props.width,
					}}
					autoPlay={props.autoPlay === true}
					loop={props.loop === true}
				/>
			</View>
		</View>
	);
};
