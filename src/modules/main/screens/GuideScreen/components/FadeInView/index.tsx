import React, { useState, useEffect } from 'react';
import { Animated, Easing } from 'react-native';

type DirectionAnim = 'ltr' | 'rtl';

interface Props {
	style?: object;
	children?: JSX.Element;
	startAnim?: boolean;
	useAnim: boolean;
	directionAnim?: DirectionAnim;
	disable?: boolean;
}

export const FadeInView = (props: Props): JSX.Element => {
	const [fadeAnim] = useState(new Animated.Value(0));
	const [positionAnim] = useState(new Animated.Value(0));
	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 0,
		}).start();
	});
	if (props.useAnim) {
		fadeAnim.setValue(0);
		positionAnim.setValue(0);
		Animated.parallel([
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: props.useAnim ? 1000 : 0,
			}),
			Animated.timing(positionAnim, {
				toValue: 1,
				duration: 1000,
				easing: Easing.linear,
			}),
		]).start();
	}

	const marginLeft = positionAnim.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 30],
	});
	return (
		<Animated.View
			style={{
				...props.style,
				opacity: fadeAnim,
				marginLeft,
			}}
		>
			{props.children}
		</Animated.View>
	);
};
