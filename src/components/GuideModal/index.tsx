import React from 'react';
import { Alert, Modal, ModalBaseProps, SafeAreaView } from 'react-native';
import { View, Text } from 'native-base';
import { lottie } from '@app/assets';
import { Touchable } from '../Touchable';
import { Animation } from '../Animation';

interface Props extends ModalBaseProps {
	setModalVisibility: (visibility: boolean) => void;
}

export const GuideModal = (props: Props): JSX.Element => {
	return (
		<SafeAreaView>
			<Modal
				animationType={props.animationType}
				transparent={props.transparent}
				visible={props.visible}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.');
				}}
			>
				<View
					style={{
						backgroundColor: '#00A496',
						flex: 1,
					}}
				>
					<View
						style={{
							margin: 22,
							flex: 1,
							borderColor: '#000',
						}}
					>
						<Touchable onPress={() => props.setModalVisibility(!props.visible)}>
							<Text
								style={{
									fontSize: 30,
									color: '#fff',
								}}
							>
								x
							</Text>
						</Touchable>
						<View
							style={{
								flex: 1,
							}}
						>
							{/* <Text>Hello World!</Text> */}

							<Animation source={lottie.checkMarkSuccess} flex={false} width={300} height={300} />

							{/* <Text>Hello World!</Text> */}
						</View>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
};
