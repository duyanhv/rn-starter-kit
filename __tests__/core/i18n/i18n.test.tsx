import { i18n, LanguageType } from '@app/core';
import i18next, { LanguageDetectorAsyncModule, Services, InitOptions } from 'i18next';

describe('core/i18n', () => {
	beforeEach(() => {});
	describe('getLanguageName', () => {
		it('runs successfully', async () => {
			const english = i18n.getLanguageName('en');
			const vn = i18n.getLanguageName('vi');
			const notFound = i18n.getLanguageName(('notFound' as unknown) as LanguageType);

			expect(english).toMatchInlineSnapshot(`"English"`);
			expect(vn).toMatchInlineSnapshot(`"Tiếng Việt"`);
			expect(notFound).toMatchInlineSnapshot(`undefined`);
		});
	});

	describe('getLanguageByName', () => {
		it('runs successfully', async () => {
			const english = i18n.getLanguageByName('English');
			const vn = i18n.getLanguageByName('Tiếng Việt');
			const undefinedLanguage = i18n.getLanguageByName('');

			expect(english).toBeDefined();
			expect(vn).toBeDefined();
			expect(undefinedLanguage).toMatchInlineSnapshot(`undefined`);
		});
	});

	describe('initialize', () => {
		it('runs successfully', async () => {
			i18next.use = function use(param) {
				if (param) {
					const { detect, init, cacheUserLanguage } = (param as unknown) as LanguageDetectorAsyncModule;
					init && init(({} as unknown) as Services, {}, ({} as unknown) as InitOptions);
					detect && detect(() => {});
					cacheUserLanguage && cacheUserLanguage('en');
				}
				return this;
			};
			i18next.init = jest.fn();

			await i18n.initialize();

			expect(i18next.init).toBeCalledTimes(1);
		});
	});
});
