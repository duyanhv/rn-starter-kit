import { sleep } from '@app/core';

describe('core/helpers/sleep', () => {
	it('run successfully', async () => {
		let expectedTime = 0;
		jest.spyOn(global, 'setTimeout').mockImplementation((resolve: () => void, ms: number) => {
			resolve();
			expectedTime = ms;
			return {
				hasRef: jest.fn(),
				ref: jest.fn(),
				refresh: jest.fn(),
				unref: jest.fn(),
			};
		});

		const time = 1000;
		await sleep(time);

		expect(expectedTime).toBe(time);
	});
});
