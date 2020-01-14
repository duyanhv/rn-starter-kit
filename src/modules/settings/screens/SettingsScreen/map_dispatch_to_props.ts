import { Dispatch } from '@app/store';
import { Theme } from '@app/core';

interface MapDispatchToProps {
	changeLanguage: (language: string) => void;
	changeTheme: (theme: Theme) => void;
	changePrimaryColor: (primaryColor: string) => void;
	//   logout: () => void;
}

export const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToProps => ({
	changeLanguage: dispatch.settings.changeLanguage,
	changeTheme: dispatch.settings.changeTheme,
	changePrimaryColor: dispatch.settings.changePrimaryColor,
	//   logout: dispatch.currentUser.logout,
});
