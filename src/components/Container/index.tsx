import React, { ReactNode } from 'react';
import { navigationService } from '@app/services';
import { colors, THEME_DARK, THEME_LIGHT } from '@app/core';
import { useTheme } from '@app/hooks';
import { StatusBar, SafeAreaView, StatusBarStyle } from 'react-native';
import { Button } from '../Button';
import { Left } from '../Left';
import { Body } from '../Body';
import { Right } from '../Right';
import { ErrorBoundary } from '../ErrorBoundary';
import { View } from '../View';
import { styles } from './styles';
import { Icon } from '../Icon';
import { Text } from '../Text';

interface Props {
	componentId?: string;
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
	return (
		<>
			<StatusBar
				backgroundColor={colors.transparent}
				barStyle={`${theme === THEME_DARK ? THEME_LIGHT : THEME_DARK}-content` as StatusBarStyle}
			/>
			{/* <SafeAreaView
				style={[
					styles.rootContainerBackground,
					{
						backgroundColor: colors.transparent,
					},
				]}
			/> */}
			<SafeAreaView
				style={[
					styles.rootContainer,
					{
						backgroundColor: screenBackgroundColor,
					},
				]}
			>
				<ErrorBoundary>
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
						flex={props.flex}
						column={props.column}
						row={props.row}
						columnReverse={props.columnReverse}
						rowReverse={props.rowReverse}
						center={props.center}
						centerVertical={props.centerVertical}
						style={{
							backgroundColor: screenBackgroundColor,
						}}
					>
						{props.children}
					</View>
				</ErrorBoundary>
			</SafeAreaView>
		</>
	);
};
