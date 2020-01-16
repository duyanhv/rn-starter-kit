import { ModelReducers } from '@rematch/core';
import { DolphinsState, dolphins } from '@app/store/models/dolphins';

jest.mock('@rematch/core', () => ({
	createModel: (config: { reducers: ModelReducers<DolphinsState> }) => config,
}));
describe('store/models/dolphins', () => {
	it('increment', async () => {
		const oldDolphinState: DolphinsState = {
			count: 0,
		};
		const { reducers } = (dolphins as unknown) as { reducers: ModelReducers<DolphinsState> };
		const state = reducers.increment(oldDolphinState, 1);

		expect(state).toMatchInlineSnapshot(`
      Object {
        "count": 1,
      }
    `);
	});
});
