import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from '@app/store';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const WithStore = (WrappedComponent: any): any => {
	return class HOCComponent extends Component {
		public render(): JSX.Element {
			// ... and renders the wrapped component with the fresh data!
			// Notice that we pass through any additional props
			return (
				<Provider store={store}>
					<WrappedComponent {...this.props} />
				</Provider>
			);
		}
	};
};
