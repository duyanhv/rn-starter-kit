import { Dispatch } from '@app/store';

interface MapDispatchToProps {
  incrementShark: (payload: number) => void;
  incrementDolphin: (payload: number) => void;
  // updateShownUpdateWarning: (isShowWarning: boolean) => void;
}

export const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToProps => ({
  incrementShark: dispatch.sharks.increment,
  incrementDolphin: dispatch.dolphins.increment,
  // updateShownUpdateWarning: dispatch.minimumVersionChecks.updateShownUpdateWarning,
});
