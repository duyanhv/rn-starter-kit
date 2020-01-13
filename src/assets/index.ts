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

export const jsonSources = {
  countries: () => require('./json/country_code.json') as CountryCode[],
  primaryColors: () => require('./json/primary_colors.json') as PrimaryColor[],
  loading: () => require('./json/loading.json'),
};
/* eslint-enable global-require */
