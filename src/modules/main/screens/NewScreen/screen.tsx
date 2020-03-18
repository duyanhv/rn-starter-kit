import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Platform } from 'react-native';
import { useEffectOnce } from '@app/hooks';
import { navigationService } from '@app/services';
import { colors } from '@app/core';

const styles = StyleSheet.create({
	fullScreen: {
		flex: 1,
	},
});
export const Screen = (props: { componentId: string }): JSX.Element => {
	useEffectOnce(() => {
		navigationService.navigateOptions({
			componentId: props.componentId,
			options: {
				// bottomTabs: {
				// 	visible: false,
				// 	drawBehind: true,
				// },
				statusBar: {
					drawBehind: true,
					visible: true,
					backgroundColor: colors.transparent,
				},
			},
		});
	});
	return (
		<View
			style={{
				...StyleSheet.absoluteFillObject,
			}}
		>
			{Platform.OS === 'ios' ? (
				<MapView
					region={{
						latitude: 37.78825,
						longitude: -122.4324,
						latitudeDelta: 0.015,
						longitudeDelta: 0.0121,
					}}
					style={styles.fullScreen}
				/>
			) : (
				// <MapView
				// 	provider={PROVIDER_GOOGLE} // remove if not using Google Maps
				// 	region={{
				// 		latitude: 37.78825,
				// 		longitude: -122.4324,
				// 		latitudeDelta: 0.015,
				// 		longitudeDelta: 0.0121,
				// 	}}
				// 	// customMapStyle={Themes}
				// 	style={styles.fullScreen}
				// />
				<></>
			)}
		</View>
	);
};
