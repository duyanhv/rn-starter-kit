import React from 'react';
import { Resource } from '@app/core';
import LottieView from 'lottie-react-native';
import { View } from 'native-base';

interface Props {
	width: number;
	height: number;
	source: Resource;
	autoPlay?: boolean;
	loop?: boolean;
	flex: boolean;
}

export const Animation = (props: Props): JSX.Element => {
	return (
		<View
			style={
				props.flex
					? {
							flex: 1,
					  }
					: {
							width: props.width,
							height: props.height,
					  }
			}
		>
			<LottieView
				source={props.source}
				style={
					props.flex
						? {
								flex: 1,
						  }
						: {
								width: props.width,
								height: props.height,
						  }
				}
				autoPlay={props.autoPlay === true}
				loop={props.loop === true}
			/>
		</View>
	);
};
