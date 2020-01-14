import { Dispatch } from '@app/store';
import { Theme } from '@app/core';

interface MapDispatchToProps {
	changeTheme: (theme: Theme) => void;
}
export const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToProps => ({
	changeTheme: dispatch.settings.changeTheme,
});
