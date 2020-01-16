import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from '@app/components';
import { THEME_DARK } from '@app/core';
import { mockTheme } from '../test_helpers';

beforeAll(() => {});

describe('components/Container', () => {
	const text = 'text';
	beforeEach(() => {
		mockTheme(THEME_DARK);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('renders successfully', async () => {
		const { baseElement, getByText } = render(<Text>{text}</Text>);

		expect(getByText(text)).toBeDefined();
		expect(baseElement).toMatchSnapshot();
	});

	it('renders primary text successfully', async () => {
		const { baseElement } = render(<Text primary>{text}</Text>);

		expect(baseElement).toMatchSnapshot();
	});

	it('renders white text successfully', async () => {
		const { baseElement } = render(<Text white>{text}</Text>);

		expect(baseElement).toMatchSnapshot();
	});

	it('renders bold text successfully', async () => {
		const { baseElement } = render(<Text bold>{text}</Text>);

		expect(baseElement).toMatchSnapshot();
	});

	it('renders h1 text successfully', async () => {
		const { baseElement } = render(<Text h1>{text}</Text>);

		expect(baseElement).toMatchSnapshot();
	});

	it('renders h2 text successfully', async () => {
		const { baseElement } = render(<Text h2>{text}</Text>);

		expect(baseElement).toMatchSnapshot();
	});

	it('renders h3 text successfully', async () => {
		const { baseElement } = render(<Text h3>{text}</Text>);

		expect(baseElement).toMatchSnapshot();
	});

	it('renders h4 text successfully', async () => {
		const { baseElement } = render(<Text h4>{text}</Text>);

		expect(baseElement).toMatchSnapshot();
	});

	it('renders h5 text successfully', async () => {
		const { baseElement } = render(<Text h5>{text}</Text>);

		expect(baseElement).toMatchSnapshot();
	});

	it('renders h6 text successfully', async () => {
		const { baseElement } = render(<Text h6>{text}</Text>);

		expect(baseElement).toMatchSnapshot();
	});

	it('renders s1 text successfully', async () => {
		const { baseElement } = render(<Text s1>{text}</Text>);

		expect(baseElement).toMatchSnapshot();
	});

	it('renders s2 text successfully', async () => {
		const { baseElement } = render(<Text s2>{text}</Text>);

		expect(baseElement).toMatchSnapshot();
	});

	it('renders success text successfully', async () => {
		const { baseElement } = render(<Text success>{text}</Text>);

		expect(baseElement).toMatchSnapshot();
	});

	it('renders info text successfully', async () => {
		const { baseElement } = render(<Text info>{text}</Text>);

		expect(baseElement).toMatchSnapshot();
	});

	it('renders warning text successfully', async () => {
		const { baseElement } = render(<Text warning>{text}</Text>);

		expect(baseElement).toMatchSnapshot();
	});

	it('renders danger text successfully', async () => {
		const { baseElement } = render(<Text danger>{text}</Text>);

		expect(baseElement).toMatchSnapshot();
	});
});
