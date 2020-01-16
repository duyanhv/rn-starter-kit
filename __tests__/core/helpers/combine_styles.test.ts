import { combineStyles } from '@app/core';
import { ViewStyle } from 'react-native';

describe('core/helpers/combine_styles', () => {
	const style1: ViewStyle = {
		alignContent: 'center',
	};
	const style2: ViewStyle = {
		alignSelf: 'center',
	};
	const style3: ViewStyle = {
		backfaceVisibility: 'hidden',
	};

	it('returns new style object', async () => {
		const styles = combineStyles(style1, style2);

		expect(styles).toMatchInlineSnapshot(`
      Object {
        "alignContent": "center",
        "alignSelf": "center",
      }
    `);
	});

	it('returns new style array from an object and an array', async () => {
		const styles = combineStyles([style1], style2);

		expect(styles).toMatchInlineSnapshot(`
      Array [
        Object {
          "alignContent": "center",
        },
        Object {
          "alignSelf": "center",
        },
      ]
    `);
	});

	it('returns new style array from 2 arrays', async () => {
		const styles = combineStyles([style1], [style2, style3]);

		expect(styles).toMatchInlineSnapshot(`
      Array [
        Object {
          "alignContent": "center",
        },
        Object {
          "alignSelf": "center",
        },
        Object {
          "backfaceVisibility": "hidden",
        },
      ]
    `);
	});
});
