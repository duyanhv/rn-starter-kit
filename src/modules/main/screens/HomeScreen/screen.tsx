import {
	ScreenProps,
	getStatusHeight,
	screenNames,
	colors,
	getWidthHeightByPercentages,
	getPrimaryColor,
} from '@app/core';
import { useEffectOnce, useTheme } from '@app/hooks';
// import { navigationService } from '@app/services';
import { ScrollView, Container, Text, View, Icon } from '@app/components';
import React from 'react';
import { TouchableOpacity, Image, FlatList } from 'react-native';
import { imageSources, jsonSources } from '@app/assets';
import { store } from '@app/store';
import { navigationService } from '@app/services';
import _ from 'lodash';
import { mapDispatchToProps } from './map_dispatch_to_props';
import { mapStateToProps } from './map_state_to_props';
import { styles } from './styles';
import { DistributionCard } from './components';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & ScreenProps;

const propsDistance = {
	margin: 15,
};
// shouldShownUpdateWarning,
// updateShownUpdateWarning,
export const Screen = ({ componentId }: Props): JSX.Element => {
	useEffectOnce(() => {
		// if (shouldShownUpdateWarning) {
		// 	appService.checkNeedUpdateNewBinaryVersion();
		// 	updateShownUpdateWarning(false);
		// }
		// console.log(store.getState().settings);
	});

	const { primaryColorCode, theme } = store.getState().settings;
	const primaryColor = getPrimaryColor(primaryColorCode, theme);
	const { textColor } = useTheme();

	return (
		<Container componentId={componentId} flex={1}>
			<ScrollView
				style={[
					{
						paddingTop: getStatusHeight(),
						...styles.fullScreen,
					},
				]}
				showsVerticalScrollIndicator={false}
			>
				<Text style={propsDistance} h3>
					Quick Navigation
				</Text>
				<View
					style={{
						...styles.quickNavigationWrapper,
					}}
				>
					<TouchableOpacity
						style={{
							...styles.quickNavigationButton,
							borderColor: textColor,
						}}
					>
						<Icon name='search' color={textColor} size={getWidthHeightByPercentages('width', 6)} />
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							...styles.quickNavigationButton,
							borderColor: textColor,
						}}
						onPress={() => {
							navigationService.navigateTo({
								componentId,
								screenName: screenNames.NewScreen,
								options: {
									statusBar: {
										drawBehind: true,
										visible: true,
										backgroundColor: colors.transparent,
									},
									bottomTabs: {
										visible: false,
										animate: true,
									},
								},
							});
						}}
					>
						<Icon name='map' color={textColor} size={getWidthHeightByPercentages('width', 6)} />
					</TouchableOpacity>
				</View>

				<Text style={propsDistance} h3>
					Anji
				</Text>
				{/* <View
					style={{
						width: getWidthHeightByPercentages('width', 92),
						height: getWidthHeightByPercentages('height', 8),
						borderWidth: 1,
						borderColor: colors.lightGrey,
						alignSelf: 'center',
						borderRadius: 27,
					}}
				>
					<View
						style={{
							flex: 1,
							alignItems: 'center',
							justifyContent: 'space-between',
							flexDirection: 'row',
							paddingLeft: 20,
						}}
					>
						<Icon color={primaryColor} name={'search'} size={20} />
						<TextInput
							style={{
								flex: 1,
								marginLeft: 20,
							}}
							onChangeText={(text) => onChangeText(text)}
							value={value}
							placeholder={'Find a restaurent'}
						/>
					</View>
				</View> */}

				<FlatList
					horizontal
					data={imageSources.foods}
					showsHorizontalScrollIndicator={false}
					keyExtractor={(_item, index) => index.toString()}
					contentContainerStyle={styles.flatListContent}
					renderItem={({ item }) => (
						<TouchableOpacity style={styles.foodCategoryItemWrapper} key={item.id}>
							<View
								style={{
									...styles.foodCategoryItem,
									shadowColor: primaryColor,
									borderColor: textColor,
								}}
							>
								<Image source={item.source()} style={styles.foodCategoryIcon} />
								<Text bold>{item.title}</Text>
							</View>
						</TouchableOpacity>
					)}
				/>
				<Text style={propsDistance} h3>
					Distributions
				</Text>
				<FlatList
					horizontal
					data={jsonSources.testData.distribution().data}
					showsHorizontalScrollIndicator={false}
					keyExtractor={(_item, index) => index.toString()}
					contentContainerStyle={styles.flatListContent}
					renderItem={({ item, index }) => (
						<DistributionCard
							onPressItem={_.debounce(() => {
								navigationService.showModal({
									screenName: screenNames.DetailScreen,
									passProps: {
										data: item,
									},
									options: {
										statusBar: {
											backgroundColor: colors.transparent,
										},
									},
								});
							}, 140)}
							key={index}
							item={item}
						/>
					)}
				/>

				{/* <View
					style={{
						height: 300,
						backgroundColor: colors.black,
						width: 300,
					}}
				/> */}
				{/* <Button
					style={propsDistance}
					onPress={() => {
						navigationService.navigateTo({
							componentId,
							screenName: screenNames.NewScreen,
							options: {
								statusBar: {
									drawBehind: true,
									visible: true,
									backgroundColor: colors.transparent,
								},
								bottomTabs: {
									visible: false,
									animate: true,
								},
							},
						});
					}}
				>
					<Text>Open Map</Text>
				</Button>
				<Button
					style={propsDistance}
					onPress={() => {
						notificationService.push();
					}}
				>
					<Text>Push Noti</Text>
				</Button>
				<Button
					style={propsDistance}
					onPress={() => {
						navigationService.navigateTo({
							componentId,
							screenName: screenNames.GuideScreen,
						});
					}}
				>
					<Text>Open Guide</Text>
				</Button>
				<Button
					style={propsDistance}
					onPress={async () => {
						await AsyncStorage.removeItem('persist:root');
					}}
				>
					<Text>Clear AsyncStorage</Text>
				</Button>
				<Button
					style={propsDistance}
					onPress={() => {
						navigationService.navigateTo({
							componentId,
							screenName: screenNames.ResideMenuScreen,
						});
					}}
				>
					<Text>Open Reside Menu</Text>
				</Button> */}
			</ScrollView>
		</Container>
	);
};
