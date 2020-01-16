import { ModelReducers } from '@rematch/core';
import { SharksState, sharks } from '@app/store/models/sharks';

jest.mock('@rematch/core', () => ({
	createModel: (config: { reducers: ModelReducers<SharksState> }) => config,
}));
describe('store/models/sharks', () => {
	it('increment', async () => {
		const oldDolphinState: SharksState = {
			count: 0,
		};
		const { reducers } = (sharks as unknown) as { reducers: ModelReducers<SharksState> };
		const state = reducers.increment(oldDolphinState, 1);

		expect(state).toMatchInlineSnapshot(`
      Object {
        "count": 1,
      }
    `);
	});
});
