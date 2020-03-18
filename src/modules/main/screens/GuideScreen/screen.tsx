/* eslint-disable no-null/no-null */
import React, { useRef, useState } from 'react';
import { ScrollView, Dimensions, TouchableOpacity, Animated, Easing } from 'react-native';
import { View } from 'native-base';
import { jsonSources, Guide, guideImages } from '@app/assets';
import { navigationService } from '@app/services';
import { Animation, Container, Text } from '@app/components';
import { ScreenProps, THEME_DARK } from '@app/core';
import { useTranslation } from 'react-i18next';
import { useTheme, useEffectOnce } from '@app/hooks';
import { styles } from './styles';

const { width } = Dimensions.get('window');

type Props = ScreenProps;
export const Screen = (props: Props): JSX.Element => {
	const { t } = useTranslation();
	const { theme } = useTheme();
	const scrollRef = useRef<ScrollView>(null);
	const animatedWidth = width - (width * 10) / 100;
	const [screenIndex, setScreenIndex] = useState(1);

	const [skipButtonFadeAnim] = useState(new Animated.Value(0));
	const [skipButtonPositionAnim] = useState(new Animated.Value(0));
	const skipButtonMarginLeftAnim = skipButtonPositionAnim.interpolate({
		inputRange: [0, 1],
		outputRange: [0, -15],
	});

	const [nextButtonFadeAnim] = useState(new Animated.Value(0));
	const [nextButtonPositionAnim] = useState(new Animated.Value(0));
	const nextButtonMarginLeftAnim = nextButtonPositionAnim.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 15],
	});

	function initAnimation(isAnimationShow: boolean, fadeAnim: Animated.Value, positionAnim: Animated.Value): void {
		fadeAnim.setValue(0);
		positionAnim.setValue(0);
		Animated.parallel([
			Animated.timing(fadeAnim, {
				toValue: isAnimationShow ? 1 : 0,
				duration: 0,
			}),
		]).start();
	}
	function fadeAnimation(isAnimationShow: boolean, fadeAnim: Animated.Value, positionAnim: Animated.Value): void {
		Animated.parallel([
			Animated.timing(fadeAnim, {
				toValue: isAnimationShow ? 0 : 1,
				duration: 800,
			}),
			Animated.timing(positionAnim, {
				toValue: isAnimationShow ? 1 : 0,
				duration: 1000,
				easing: Easing.linear,
			}),
		]).start();
	}
	useEffectOnce(() => {
		initAnimation(true, skipButtonFadeAnim, skipButtonPositionAnim);
		initAnimation(false, nextButtonFadeAnim, nextButtonPositionAnim);
	});

	function renderScreenIndex(currentIndex: number, totalIndex: number): JSX.Element {
		const screenIndexes = [];
		const activeDotColor = theme === THEME_DARK ? '#fff' : '#000';
		const backgroundDotColor = theme === THEME_DARK ? 'rgba(255,255,255,.3)' : 'rgba(0,0,0,.3)';
		for (let i = 1; i <= totalIndex; i += 1) {
			screenIndexes.push(
				<View
					style={{
						...styles.screenIndex,
						backgroundColor:
							i === currentIndex ||
							(currentIndex <= 0 && i === 1) ||
							(currentIndex >= totalIndex && i === totalIndex)
								? activeDotColor
								: backgroundDotColor,
					}}
					key={i}
				/>,
			);
		}
		return <View style={styles.screenIndexWrapper}>{screenIndexes}</View>;
	}

	function renderAnimation(): JSX.Element {
		return (
			<View style={styles.animationWrapper}>
				<ScrollView
					horizontal
					decelerationRate={0.8}
					snapToInterval={animatedWidth}
					snapToAlignment={'center'}
					contentContainerStyle={styles.scrollViewContainer}
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					ref={scrollRef}
					onScroll={(e) => {
						const newScreenIndex = Math.round(e.nativeEvent.contentOffset.x / animatedWidth) + 1;
						setScreenIndex(newScreenIndex);

						if (
							newScreenIndex !== screenIndex &&
							(screenIndex >= jsonSources.guides().length - 1 ||
								newScreenIndex >= jsonSources.guides().length - 1)
						) {
							fadeAnimation(
								screenIndex === jsonSources.guides().length - 1 &&
									newScreenIndex === jsonSources.guides().length,
								skipButtonFadeAnim,
								skipButtonPositionAnim,
							);
							fadeAnimation(
								!(
									screenIndex === jsonSources.guides().length - 1 &&
									newScreenIndex === jsonSources.guides().length
								),
								nextButtonFadeAnim,
								nextButtonPositionAnim,
							);
						}
					}}
					scrollEventThrottle={7}
				>
					{jsonSources.guides().map((guide: Guide, index: number) => (
						<View key={index}>
							<View>
								<Animation
									source={guideImages[index]}
									loop={true}
									autoPlay={true}
									width={animatedWidth}
									height={animatedWidth}
								/>
							</View>
							<View
								style={{
									...styles.columnWrapper,
									...styles.descWrapper,
								}}
							>
								<Text numberOfLines={1} style={styles.textCenter} h2>
									{guide.title}
								</Text>

								<Text
									numberOfLines={2}
									ellipsizeMode='tail'
									s1
									style={{
										...styles.textCenter,
										...styles.descText,
									}}
								>
									{guide.description}
								</Text>
							</View>
						</View>
					))}
				</ScrollView>
			</View>
		);
	}

	return (
		<>
			<Container componentId={props.componentId} flex={1}>
				<View style={styles.container}>
					{renderAnimation()}
					<View
						style={{
							...styles.columnWrapper,
						}}
					>
						<View style={styles.navigationWrapper}>
							<TouchableOpacity
								style={{
									...styles.button,
								}}
								onPress={() =>
									navigationService.goBack({
										componentId: props.componentId,
									})
								}
								disabled={jsonSources.guides().length === screenIndex}
							>
								<Animated.View
									style={{
										opacity: skipButtonFadeAnim,
										marginLeft: skipButtonMarginLeftAnim,
									}}
								>
									<Text h5 bold>
										{t('common.skip')}
									</Text>
								</Animated.View>
							</TouchableOpacity>
							{renderScreenIndex(screenIndex, jsonSources.guides().length)}
							<TouchableOpacity
								style={{
									...styles.button,
								}}
								onPress={() => {
									if (screenIndex < 3) {
										// eslint-disable-next-line no-unused-expressions
										scrollRef.current?.scrollTo({
											x: animatedWidth * screenIndex,
										});
									} else {
										navigationService.goBack({
											componentId: props.componentId,
										});
									}
								}}
							>
								{screenIndex < jsonSources.guides().length && (
									<Text h5 bold style={styles.absoluteView}>
										{'>'}
									</Text>
								)}
								<Animated.View
									style={{
										opacity: nextButtonFadeAnim,
										marginLeft: nextButtonMarginLeftAnim,
									}}
								>
									<Text h5 bold>
										{t('common.done')}
									</Text>
								</Animated.View>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Container>
		</>
	);
};
