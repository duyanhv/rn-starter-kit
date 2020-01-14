import { RootState } from '@app/store';
import { LanguageType, Theme } from '@app/core';

type LoginType = 'OK';
interface CurrentUserState {
	id?: string;
	displayName?: string;
	avatarUrl?: string;
	isLoggedIn?: boolean;
	email?: string;
	emailVerified?: boolean;
	loginType?: LoginType;
}
interface MapStateToProps {
	currentUser: CurrentUserState;
	language: LanguageType;
	theme: Theme;
	primaryColorCode: string;
}

export const mapStateToProps = (state: RootState): MapStateToProps => ({
	currentUser: {},
	language: state.settings.language,
	theme: state.settings.theme,
	primaryColorCode: state.settings.primaryColorCode,
});
