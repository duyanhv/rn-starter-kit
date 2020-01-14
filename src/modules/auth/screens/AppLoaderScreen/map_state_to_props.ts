import { RootState } from '@app/store';
import { Theme } from '@app/core';

export const mapStateToProps = (state: RootState): { language: string; appLoaded: boolean; theme: Theme } => ({
	language: state.settings.language,
	appLoaded: state.settings.appLoaded,
	theme: state.settings.theme,
});
