import React, { ReactNode } from 'react';
import { navigationService } from '@app/services';
import { colors, THEME_DARK, THEME_LIGHT } from '@app/core';
import { useTheme } from '@app/hooks';
import { StatusBar, SafeAreaView, StatusBarStyle, Platform, StyleSheet, View } from 'react-native';
import { Button } from '../Button';
import { Left } from '../Left';
import { Body } from '../Body';
import { Right } from '../Right';
// import { View } from '../View';
import { styles } from './styles';
import { Icon } from '../Icon';
import { Text } from '../Text';

interface Props {
	componentId: string;
	showHeader?: boolean;
	showBackButton?: boolean;
	headerTitle?: string;
	children?: ReactNode;
	flex?: number;
	center?: boolean;
	centerVertical?: boolean;
	row?: boolean;
	column?: boolean;
	rowReverse?: boolean;
	columnReverse?: boolean;
}

export const Container = (props: Props): JSX.Element => {
	const { primaryColor, screenBackgroundColor, theme } = useTheme();
	const goBack = (): void => {
		props.componentId &&
			navigationService.goBack({
				componentId: props.componentId,
			});
	};
	navigationService.navigateOptions({
		componentId: props.componentId,
		options: {
			statusBar: {
				drawBehind: true,
				visible: true,
				backgroundColor: colors.transparent,
			},
		},
	});
	return (
		<>
			{Platform.OS === 'ios' && (
				<StatusBar
					animated={true}
					backgroundColor={colors.transparent}
					barStyle={`${theme === THEME_DARK ? THEME_LIGHT : THEME_DARK}-content` as StatusBarStyle}
				/>
			)}
			<SafeAreaView
				style={[
					styles.rootContainer,
					// {
					// 	backgroundColor: screenBackgroundColor,
					// },
				]}
			>
				{props.showHeader && (
					<View
						style={[
							styles.header,
							{
								backgroundColor: primaryColor,
							},
						]}
					>
						<Left>
							{props.showBackButton && (
								<Button transparent style={styles.backButton} onPress={goBack}>
									<Icon name='chevron-left' color={colors.white} style={styles.icon} />
								</Button>
							)}
						</Left>
						<Body style={styles.headerText}>
							<Text h6 bold white>
								{props.headerTitle}
							</Text>
						</Body>
						<Right />
					</View>
				)}
				<View
					style={{
						...StyleSheet.absoluteFillObject,
						// backgroundColor: '#000',
						// flex: 1,
					}}
				>
					<View
						// flex={props.flex}
						// column={props.column}
						// row={props.row}
						// columnReverse={props.columnReverse}
						// rowReverse={props.rowReverse}
						// center={props.center}
						// centerVertical={props.centerVertical}
						style={{
							backgroundColor: screenBackgroundColor,
							...styles.fullScreen,
						}}
					>
						{props.children}
					</View>
					{/* <View
						style={{
							// ...StyleSheet.absoluteFillObject,
							// marginTop: getStatusHeight() + 100,
							// zIndex: 2,
							backgroundColor: '#000',
						}}
						// ref={mainViewRef}
					/> */}
					{/* <BlurView
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							bottom: 0,
							right: 0,
						}}
						// viewRef={blurViewRef}
						blurType='light'
						blurAmount={10}
					/> */}
				</View>
			</SafeAreaView>
		</>
	);
};
