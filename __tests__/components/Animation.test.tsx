import React from 'react';
import { render } from '@testing-library/react-native';
import { jsonSources } from '@app/assets';
import { Animation } from '@app/components';

describe('components/Animation', () => {
	it('renders successfully', async () => {
		const loading = jsonSources.loading();
		render(<Animation source={loading} width={100} height={100} autoPlay loop />);
	});
});
