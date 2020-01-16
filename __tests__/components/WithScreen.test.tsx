import React from 'react';
import { render } from '@testing-library/react-native';
import { WithScreen } from '@app/components';
import { View, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import {
	lockToPortrait,
	lockToLandscape,
	lockToLandscapeLeft,
	lockToLandscapeRight,
	unlockAllOrientations,
} from 'react-native-orientation';

jest.mock('react-native-orientation', () => ({
	lockToPortrait: jest.fn(),
	lockToLandscape: jest.fn(),
	lockToLandscapeLeft: jest.fn(),
	lockToLandscapeRight: jest.fn(),
	unlockAllOrientations: jest.fn(),
}));

const bindComponent = jest.fn();

const Screen = (): JSX.Element => (
	<View>
		<Text>Sample screen</Text>
	</View>
);

describe('components/WithScreen', () => {
	beforeEach(() => {
		Navigation.events = jest.fn();
		(Navigation.events as jest.Mock).mockReturnValue({
			bindComponent,
		});
	});

	it('renders successfully', async () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let component: any;
		bindComponent.mockImplementation((inputComponent) => {
			component = inputComponent;
		});

		const WithScreenComponent = WithScreen(Screen);
		const { baseElement } = render(<WithScreenComponent />);
		component.componentDidAppear();

		expect(bindComponent).toBeCalledTimes(1);
		expect(unlockAllOrientations).toBeCalledTimes(1);
		expect(baseElement).toMatchSnapshot();
	});
	it('renders portrait successfully', async () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let component: any;
		bindComponent.mockImplementation((inputComponent) => {
			component = inputComponent;
		});

		const WithStoreComponent = WithScreen(Screen, {
			orientation: 'PORTRAIT',
		});
		render(<WithStoreComponent />);
		component.componentDidAppear();

		expect(lockToPortrait).toBeCalledTimes(1);
	});

	it('renders landscape successfully', async () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let component: any;
		bindComponent.mockImplementation((inputComponent) => {
			component = inputComponent;
		});

		const WithStoreComponent = WithScreen(Screen, {
			orientation: 'LANDSCAPE',
		});
		render(<WithStoreComponent />);
		component.componentDidAppear();

		expect(lockToLandscape).toBeCalledTimes(1);
	});

	it('renders landscape left successfully', async () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let component: any;
		bindComponent.mockImplementation((inputComponent) => {
			component = inputComponent;
		});

		const WithStoreComponent = WithScreen(Screen, {
			orientation: 'LANDSCAPE-LEFT',
		});
		render(<WithStoreComponent />);
		component.componentDidAppear();

		expect(lockToLandscapeLeft).toBeCalledTimes(1);
	});

	it('renders landscape right successfully', async () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let component: any;
		bindComponent.mockImplementation((inputComponent) => {
			component = inputComponent;
		});

		const WithStoreComponent = WithScreen(Screen, {
			orientation: 'LANDSCAPE-RIGHT',
		});
		render(<WithStoreComponent />);
		component.componentDidAppear();

		expect(lockToLandscapeRight).toBeCalledTimes(1);
	});

	it('renders with lazy load successfully', async () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let component: any;
		bindComponent.mockImplementation((inputComponent) => {
			component = inputComponent;
		});

		const WithStoreComponent = WithScreen(Screen, {
			lazyLoad: true,
		});
		const { baseElement } = render(<WithStoreComponent />);
		component.componentDidAppear();

		expect(baseElement).toMatchSnapshot();
	});

	it('renders with always refresh successfully', async () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let component: any;
		bindComponent.mockImplementation((inputComponent) => {
			component = inputComponent;
		});

		const WithStoreComponent = WithScreen(Screen, {
			alwaysRefresh: true,
		});
		const { baseElement } = render(<WithStoreComponent />);
		component.componentDidAppear();

		expect(baseElement).toMatchSnapshot();
	});
});
