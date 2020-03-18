/* eslint-disable react-native/no-inline-styles */
import React, { Fragment, useState } from 'react';
import { TouchableWithoutFeedback, Animated, View, TouchableOpacity, Image } from 'react-native';
import { getPrimaryColor, getWidthHeightByPercentages } from '@app/core';
import { store } from '@app/store';
import { Icon, Text } from '@app/components';
import { Distribution } from '@app/assets';
import { useTheme } from '@app/hooks';
import { styles } from './styles';

interface Props {
	key: string | number;
	onPressItem: () => void;
	item: Distribution;
	style?: {};
}
export const DistributionCard = (props: Props): JSX.Element => {
	const { primaryColorCode, theme } = store.getState().settings;
	const primaryColor = getPrimaryColor(primaryColorCode, theme);
	const [longPressStatus, setLongPressStatus] = useState<boolean>(false);
	const [mainViewSpringAnim] = useState(new Animated.Value(1));
	const { textColor } = useTheme();
	const [isSaved, setSave] = useState<boolean>(false);

	function runAnimation(): void {
		const springOptions: Animated.SpringAnimationConfig = {
			toValue: 1,
			// friction: 3,
			overshootClamping: true,
			// tension: 70,
			// bounciness: 15,
			speed: 1,
		};
		if (!longPressStatus) {
			Animated.spring(mainViewSpringAnim, {
				...springOptions,
				toValue: 0.94,
			}).start();
		} else {
			Animated.spring(mainViewSpringAnim, {
				...springOptions,
				toValue: 1,
			}).start();
		}
		setLongPressStatus(!longPressStatus);
	}
	return (
		<Fragment key={props.item.Id}>
			<Animated.View
				style={{
					...styles.container,
					// shadowColor: primaryColor,
					...props.style,
					transform: [
						{
							scale: mainViewSpringAnim,
						},
					],
				}}
			>
				<TouchableWithoutFeedback
					onPressIn={() => {
						runAnimation();
					}}
					onPressOut={() => {
						runAnimation();
					}}
					onPress={props.onPressItem}
				>
					<View style={styles.fullScreen}>
						<TouchableOpacity style={styles.saveButton} onPress={() => setSave(!isSaved)}>
							<Icon
								name='heart'
								solid={isSaved}
								color={primaryColor}
								size={getWidthHeightByPercentages('width', 8)}
							/>
						</TouchableOpacity>
						<View style={styles.mainViewImageWrapper}>
							<Image
								style={styles.mainImage}
								source={{
									uri: props.item.MobilePicturePath,
								}}
							/>
						</View>
						<View style={styles.descriptionImageBackground}>
							<View
								style={{
									justifyContent: 'space-between',
									flexDirection: 'row',
									// alignItems: 'center',
									marginBottom: 6,
								}}
							>
								<View
									style={{
										borderWidth: 1,
										borderRadius: 6,
										padding: 3,
										maxWidth: getWidthHeightByPercentages('width', 44),
										borderColor: textColor,
									}}
								>
									<Text
										style={{
											textAlign: 'center',
										}}
										numberOfLines={1}
										h6
									>
										{props.item.District ? props.item.District.replace('Quận ', '') : ''}
									</Text>
								</View>
								<View
									style={{
										flexDirection: 'row',
										alignItems: 'center',
									}}
								>
									<Icon
										color={primaryColor}
										solid
										name='star'
										size={getWidthHeightByPercentages('width', 3)}
									/>
									<Text h6 bold style={styles.reviewText}>
										{props.item.AvgRating}
									</Text>
									<Text h6 style={styles.reviewText}>{`(${props.item.TotalReview})`}</Text>
								</View>
							</View>
							<Text numberOfLines={1} bold h5 style={styles.descriptionText}>
								{props.item.Name}
							</Text>
							<Text numberOfLines={1} style={styles.descriptionText}>
								{props.item.Address}
							</Text>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</Animated.View>
		</Fragment>
	);
};
