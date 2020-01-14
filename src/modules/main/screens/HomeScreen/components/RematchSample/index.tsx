import React from 'react';
import { Card, CardItem, Text, View, Button } from '@app/components';
import { SharksStateType, DolphinsStateType } from '@app/store';
import { styles } from './styles';

interface Props {
	sharks: SharksStateType;
	dolphins: DolphinsStateType;
	incrementShark: () => void;
	incrementSharkAsync: () => void;
	incrementDolphin: () => void;
	incrementDolphinAsync: () => void;
}

export const RematchSample = ({
	sharks,
	dolphins,
	incrementDolphin,
	incrementDolphinAsync,
	incrementShark,
	incrementSharkAsync,
}: Props): JSX.Element => (
	<>
		<Card>
			<CardItem bordered header>
				<Text bold>Rematch with redux-persist</Text>
			</CardItem>
			<CardItem bordered>
				<View column>
					<Text>Sharks: {sharks.count}</Text>
					<Button onPress={incrementShark} style={styles.button}>
						<Text white>Raise shark</Text>
					</Button>
					<Button onPress={incrementSharkAsync} style={styles.button}>
						<Text white>Raise shark async</Text>
					</Button>
				</View>
			</CardItem>
		</Card>
		<Card>
			<CardItem bordered header>
				<Text bold>Rematch without redux-persist</Text>
			</CardItem>
			<CardItem bordered>
				<View column>
					<Text>Dolphins: {dolphins.count}</Text>
					<Button onPress={incrementDolphin} style={styles.button}>
						<Text white>Raise dolphin</Text>
					</Button>
					<Button onPress={incrementDolphinAsync} style={styles.button}>
						<Text white>Raise dolphin async</Text>
					</Button>
				</View>
			</CardItem>
		</Card>
	</>
);
