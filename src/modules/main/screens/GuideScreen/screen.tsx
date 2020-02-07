import React, { useRef, useState } from 'react';
import { ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { View } from 'native-base';
import { jsonSources, Guide, guideImages } from '@app/assets';
import { navigationService } from '@app/services';
import { Animation, Container, Text } from '@app/components';
import { ScreenProps, screenNames, THEME_DARK } from '@app/core';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@app/hooks';
import { styles } from './styles';
import { FadeInView } from './components';

const { width } = Dimensions.get('window');

type Props = ScreenProps;
export const Screen = (props: Props): JSX.Element => {
	const { t } = useTranslation();
	const { theme } = useTheme();
	// eslint-disable-next-line no-null/no-null
	const scrollRef = useRef<ScrollView>(null);
	const animatedWidth = width - (width * 10) / 100;
	const [screenIndex, setScreenIndex] = useState(1);
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
					onScroll={(e) => setScreenIndex(Math.round(e.nativeEvent.contentOffset.x / animatedWidth) + 1)}
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
			<Container flex={1}>
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
							>
								<FadeInView useAnim={screenIndex === jsonSources.guides().length} directionAnim={'rtl'}>
									<Text h5 bold>
										{t('common.skip')}
									</Text>
								</FadeInView>
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
										navigationService.navigateTo({
											screenName: screenNames.NewScreen,
											componentId: props.componentId,
										});
									}
								}}
							>
								<FadeInView
									useAnim={screenIndex === jsonSources.guides().length}
									directionAnim={screenIndex === jsonSources.guides().length ? 'ltr' : 'rtl'}
								>
									<Text h5 bold>
										{screenIndex < jsonSources.guides().length ? '>' : 'Done'}
									</Text>
								</FadeInView>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Container>
		</>
	);
};
