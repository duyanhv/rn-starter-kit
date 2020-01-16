import { ModelReducers } from '@rematch/core';
import { VersionCheckState, minimumVersionChecks } from '@app/store/models/minimumVersionChecks';

jest.mock('@rematch/core', () => ({
	createModel: (config: { reducers: ModelReducers<VersionCheckState> }) => config,
}));
describe('store/models/minimumVersionChecks', () => {
	it('updateShownUpdateWarning', async () => {
		const oldVersionState: VersionCheckState = {
			shouldShownUpdateWarning: true,
		};
		const { reducers } = (minimumVersionChecks as unknown) as { reducers: ModelReducers<VersionCheckState> };
		const state = reducers.updateShownUpdateWarning(oldVersionState, false);

		expect(state).toMatchInlineSnapshot(`
      Object {
        "shouldShownUpdateWarning": false,
      }
    `);
	});
});
