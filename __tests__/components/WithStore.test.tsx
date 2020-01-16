import React from 'react';
import { render } from '@testing-library/react-native';
import { WithStore } from '@app/components';
import { View, Text } from 'react-native';

jest.mock('react-redux', () => ({
	Provider: 'Provider',
}));
jest.mock('@app/store/store', () => ({
	store: {},
}));

describe('components/WithStore', () => {
	it('renders successfully', async () => {
		const Screen = (): JSX.Element => (
			<View>
				<Text>Sample screen</Text>
			</View>
		);
		const WithStoreComponent = WithStore(Screen);
		const { baseElement } = render(<WithStoreComponent />);
		expect(baseElement).toMatchSnapshot();
	});
});
