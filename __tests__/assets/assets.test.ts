import { imageSources, jsonSources } from '@app/assets';

describe('assets', () => {
	it('gets resources successfully', async () => {
		const appIcon = imageSources.appIcon();
		const appIconNoAlpha = imageSources.appIconNoAlpha();
		const appIconRound = imageSources.appIconRound();
		const countries = jsonSources.countries();
		const loading = jsonSources.loading();
		const primaryColor = jsonSources.primaryColors();

		expect(appIcon).toBeDefined();
		expect(appIconNoAlpha).toBeDefined();
		expect(appIconRound).toBeDefined();
		expect(countries).toBeDefined();
		expect(loading).toBeDefined();
		expect(primaryColor).toBeDefined();
	});
});
