import { RootState, SharksStateType, DolphinsStateType } from '@app/store';

export const mapStateToProps = (
  state: RootState,
): {
  sharks: SharksStateType;
  dolphins: DolphinsStateType;
  // shouldShownUpdateWarning: boolean
} => ({
  sharks: state.sharks,
  dolphins: state.dolphins,
  // shouldShownUpdateWarning: state.minimumVersionChecks.shouldShownUpdateWarning,
});
