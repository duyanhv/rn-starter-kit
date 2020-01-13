import { jsonSources } from '@app/assets';
import { Theme, THEME_DARK } from '../interfaces/Theme';

const primaryColors = jsonSources.primaryColors();
export const getPrimaryColor = (primaryCode: string, theme: Theme): string => {
	const primaryColor = primaryColors.find((item) => item.code === primaryCode);
	if (!primaryColor) {
		return '#fff';
	}
	if (theme === THEME_DARK) {
		return primaryColor.darkColor;
	}
	return primaryColor.lightColor;
};
