import { getPrimaryColor } from '@app/core';

describe('core/helpers/get_primary_color', () => {
	it('returns default color if not found', async () => {
		const color = getPrimaryColor('notFoundColor', 'light');

		expect(color).toMatchInlineSnapshot(`"#fff"`);
	});

	it('returns default light color if the current theme is light', async () => {
		const color = getPrimaryColor('red', 'light');

		expect(color).toMatchInlineSnapshot(`"#d32f2f"`);
	});

	it('returns default light color if the current theme is dark', async () => {
		const color = getPrimaryColor('red', 'dark');

		expect(color).toMatchInlineSnapshot(`"#e57373"`);
	});
});
