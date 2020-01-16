import * as useTheme from '@app/hooks/use_theme';
import { Theme } from '@app/core';

export const mockTheme = (theme: Theme): void => {
	jest.spyOn(useTheme, 'useTheme').mockImplementation(() => ({
		changePrimaryColor: () => {},
		changeTheme: () => {},
		componentBackgroundColor: 'grey',
		primaryColor: 'black',
		screenBackgroundColor: 'black',
		textColor: 'white',
		theme,
	}));
};
