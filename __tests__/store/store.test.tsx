import { store, connect } from '@app/store';

jest.mock('redux-persist', () => ({
	persistStore: jest.fn().mockImplementation((_store, _persistorOptions, callback) => {
		callback && callback();
	}),
}));
jest.mock('@rematch/core', () => ({
	init: () => {
		return {
			getState: jest.fn().mockImplementation(() => ({
				settings: {
					appLoaded: false,
				},
			})),
			dispatch: {
				settings: {
					finishLoadingApp: jest.fn(),
				},
			},
		};
	},
	createModel: jest.fn(),
}));

describe('store/store', () => {
	it('runs successfully', async () => {
		expect(store).not.toBeNull();
	});

	it('calls redux connect successfully', async () => {
		(connect as jest.Mock).mockReturnValueOnce(() => {});
		// connect(mapStateToProps, mapDispatchToProps)(Screen);
	});
});
