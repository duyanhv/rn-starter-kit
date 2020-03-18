import { Animated, Easing, View, TouchableOpacity, GestureResponderEvent, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { getWidthHeightByPercentages } from '@app/core';
import { Icon } from '@app/components';
import { styles } from './styles';

type MainViewBackGroundStyle = 'dark' | 'light';
interface Props {
	sideBarChildren: JSX.Element;
	children?: JSX.Element;
	infoViewChildren: JSX.Element;
	mainViewBorderRadius?: number;
	mainViewBackGroundColor: string;
	sideBarBackgroundColor: string;
	mainViewBackGroundStyle: MainViewBackGroundStyle;
}
export const ResideMenu = (props: Props): JSX.Element => {
	const [isMenuOpen, setMenuStatus] = useState<boolean>(false);
	const animationDuration = 200;
	const widthAfterMenuOpen = getWidthHeightByPercentages('width', 80);
	const [mainViewSizeAnim] = useState(new Animated.Value(0));
	const mainViewWidth = mainViewSizeAnim.interpolate({
		inputRange: [0, 1],
		outputRange: [1, 0.8],
	});

	const [mainViewMarginTopAnim] = useState(new Animated.Value(0));
	const mainViewMarginTop = mainViewMarginTopAnim.interpolate({
		inputRange: [0, 1],
		outputRange: [0, getWidthHeightByPercentages('height', 7)],
	});

	const [mainViewBorderRadiusAnim] = useState(new Animated.Value(0));
	const mainViewBorderRadius = mainViewBorderRadiusAnim.interpolate({
		inputRange: [0, 1],
		outputRange: [0, props.mainViewBorderRadius ? props.mainViewBorderRadius : 30],
	});

	const [mainViewPositionAnim] = useState(new Animated.Value(0));
	const mainViewMarginLeft = mainViewPositionAnim.interpolate({
		inputRange: [0, 1],
		outputRange: [0, widthAfterMenuOpen],
	});

	const [infoPositionAnim] = useState(new Animated.Value(0));
	const infoMarginBottom = infoPositionAnim.interpolate({
		inputRange: [0, 1],
		outputRange: [-100, getWidthHeightByPercentages('height', 3)],
	});
	function runAnimation(): void {
		Animated.parallel([
			Animated.timing(mainViewSizeAnim, {
				toValue: isMenuOpen ? 0 : 1,
				duration: animationDuration,
				easing: Easing.linear,
			}),
			Animated.timing(mainViewMarginTopAnim, {
				toValue: isMenuOpen ? 0 : 1,
				duration: animationDuration,
				easing: Easing.linear,
			}),
			Animated.timing(mainViewBorderRadiusAnim, {
				toValue: isMenuOpen ? 0 : 1,
				duration: animationDuration,
				easing: Easing.linear,
			}),
			Animated.timing(mainViewPositionAnim, {
				toValue: isMenuOpen ? 0 : 1,
				duration: animationDuration,
				easing: Easing.linear,
			}),
			Animated.timing(infoPositionAnim, {
				toValue: isMenuOpen ? 0 : 1,
				duration: animationDuration,
				easing: Easing.linear,
			}),
		]).start();
		setMenuStatus(!isMenuOpen);
		// if (Platform.OS === 'android') {
		// 	StatusBar.setBackgroundColor(isMenuOpen ? props.mainViewBackGroundColor : props.sideBarBackgroundColor);
		// }
		// StatusBar.setBarStyle(getStatusBarStyle(), true);
	}
	return (
		<View
			style={{
				...styles.container,
				backgroundColor: props.sideBarBackgroundColor,
			}}
		>
			<TouchableOpacity
				style={styles.menuButton}
				onPress={() => {
					runAnimation();
				}}
			>
				<Icon
					name={isMenuOpen ? 'close' : 'text'}
					size={30}
					color={isMenuOpen ? props.mainViewBackGroundColor : props.sideBarBackgroundColor}
				/>
			</TouchableOpacity>
			<View style={styles.sideBar}>{props.sideBarChildren}</View>
			<Animated.View
				style={{
					...styles.infoView,
					bottom: infoMarginBottom,
				}}
			>
				{props.infoViewChildren}
			</Animated.View>
			<Animated.View
				style={{
					...styles.mainViewWrapper,
					flex: mainViewWidth,
					width: getWidthHeightByPercentages('width', 100),
					marginLeft: mainViewMarginLeft,
					marginTop: mainViewMarginTop,
					borderTopLeftRadius: mainViewBorderRadius,
					borderBottomLeftRadius: mainViewBorderRadius,
					backgroundColor: props.mainViewBackGroundColor,
				}}
				onTouchStart={(_e: GestureResponderEvent) => {
					if (isMenuOpen) {
						runAnimation();
					}
				}}
			>
				<View
					style={{
						...StyleSheet.absoluteFillObject,
						// top: 130,
					}}
				>
					{props.children}
				</View>
			</Animated.View>
		</View>
	);
};
