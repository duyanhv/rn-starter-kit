import React from 'react';
import { render } from '@testing-library/react-native';
import { Loading } from '@app/components';

describe('components/Loading', () => {
	it('renders successfully', async () => {
		const { baseElement } = render(<Loading />);

		expect(baseElement).toMatchSnapshot();
	});

	it('renders with large size successfully', async () => {
		const { baseElement } = render(<Loading size={'LARGE'} />);

		expect(baseElement).toMatchSnapshot();
	});
});
