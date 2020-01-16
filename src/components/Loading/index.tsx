import React from 'react';
import { jsonSources } from '@app/assets';
import { Animation } from '../Animation';

interface Props {
	size?: 'LARGE' | 'SMALL';
}

const loading = jsonSources.loading();

export const Loading = ({ size }: Props): JSX.Element => {
	const loadingSize = size === 'LARGE' ? 200 : 100;
	return <Animation flex={false} source={loading} width={loadingSize} height={loadingSize} autoPlay loop />;
};
