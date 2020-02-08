import React from 'react';
import { View } from 'react-native';
import { Container } from '../../../../components';

export const Screen = (_props: { componentId: string }): JSX.Element => {
	return (
		<>
			<Container flex={1}>
				<View
				// style={{
				// 	backgroundColor: '#000',
				// 	width: 300,
				// 	height: 300,
				// }}
				/>
			</Container>
		</>
	);
};
