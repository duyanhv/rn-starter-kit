/* eslint-disable global-require */

export const imageSources = {
	appIcon: () => require('./images/app_icon.png'),
	appIconRound: () => require('./images/app_icon_round.png'),
	appIconNoAlpha: () => require('./images/app_icon_no_alpha.png'),
};

export interface CountryCode {
	name: string;
	dialCode: string;
	code: string;
}

export interface PrimaryColor {
	code: string;
	darkColor: string;
	lightColor: string;
}

export interface Guide {
	title: string;
	description: string;
	image: string;
}

export const jsonSources = {
	countries: () => require('./json/country_code.json') as CountryCode[],
	primaryColors: () => require('./json/primary_colors.json') as PrimaryColor[],
	loading: () => require('./json/loading.json'),
	guides: () => require('./json/guide.json'),
};
export const lottie = {
	guide: {
		first: () => require('./lottie/guide/guide_1'),
		second: () => require('./lottie/guide/guide_2'),
		third: () => require('./lottie/guide/guide_3'),
	},
	checkMarkSuccess: () => require('./lottie/check-mark-success.json'),
};

export const guideImages = [lottie.guide.first(), lottie.guide.second(), lottie.guide.third()];

/* eslint-enable global-require */
