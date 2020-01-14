import React from 'react';
import { ViewStyle } from 'react-native';
import Modal from 'react-native-modal';
import { combineStyles, colors, THEME_DARK } from '@app/core';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@app/hooks';
import { Icon } from '../Icon';
import { Button } from '../Button';
import { View } from '../View';
import { styles } from './styles';
import { Text } from '../Text';

export type AlertType = 'SUCCESS' | 'WARNING' | 'ERROR' | 'INFO' | 'DEFAULT';

export interface AlertAction {
	title: string;
	onPress: () => void;
	outline?: boolean;
}

interface AlertProps {
	type: AlertType;
	title?: string;
	message: string;
	actions?: AlertAction[];
	onPressClose: () => void;
	closeable?: boolean;
}

export const AlertContainer = (props: AlertProps): JSX.Element => {
	const { primaryColor, theme } = useTheme();
	const { t } = useTranslation();

	const backgroundAlertStyle = {
		backgroundColor: theme === THEME_DARK ? colors.lightBlack : colors.white,
	};

	const messageTextStyle = {
		color: theme === THEME_DARK ? colors.white : colors.black,
	};

	const closeModal = (): void => {
		props.closeable !== false && props.onPressClose();
	};

	let titleContainerStyle = combineStyles<ViewStyle>(styles.titleDefault, {
		backgroundColor: primaryColor,
	});
	let title = t('dialog.info');
	let iconName = 'information-outline';

	switch (props.type) {
		case 'WARNING':
			titleContainerStyle = combineStyles<ViewStyle>(titleContainerStyle, {
				backgroundColor: colors.orange,
			});
			title = t('dialog.warning');
			iconName = 'alert-circle-outline';
			break;
		case 'ERROR':
			titleContainerStyle = combineStyles<ViewStyle>(titleContainerStyle, {
				backgroundColor: colors.red,
			});
			title = t('dialog.error');
			iconName = 'alert-outline';
			break;
		case 'SUCCESS':
			titleContainerStyle = combineStyles<ViewStyle>(titleContainerStyle, {
				backgroundColor: colors.green,
			});
			title = t('dialog.success');
			iconName = 'check';
			break;
		default:
			break;
	}

	props.title && ({ title } = props);

	return (
		<View style={styles.container}>
			<Modal isVisible={true} onBackButtonPress={closeModal} onBackdropPress={closeModal}>
				<View style={[styles.alertContainer, backgroundAlertStyle]}>
					<View style={titleContainerStyle}>
						<Icon name={iconName} color={colors.white} size={25} />
						<Text style={styles.titleText}>{title}</Text>
						<View style={styles.dialogIcon} />
					</View>
					<Text style={[styles.messageText, messageTextStyle]}>{props.message}</Text>
					{props.actions && (
						<View style={styles.buttonContainer}>
							{props.actions.map((item) => {
								return (
									<Button
										outline={item.outline}
										onPress={item.onPress}
										key={item.title}
										style={styles.buttonDialog}
									>
										<Text white={!item.outline} primary={item.outline}>
											{item.title}
										</Text>
									</Button>
								);
							})}
						</View>
					)}
					{!props.actions && (
						<View style={styles.reserveContainer}>
							<Button onPress={props.onPressClose} style={styles.buttonDialog}>
								<Text white>{t('dialog.close')}</Text>
							</Button>
						</View>
					)}
				</View>
			</Modal>
		</View>
	);
};
