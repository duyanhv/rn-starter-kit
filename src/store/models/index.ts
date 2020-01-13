import { sharks, SharksState } from './sharks';
import { dolphins, DolphinsState } from './dolphins';
import { settings, SettingsState } from './settings';
import { minimumVersionChecks, VersionCheckState } from './minimumVersionChecks';

export type SharksStateType = SharksState;
export type DolphinsStateType = DolphinsState;
export type SettingsStateType = SettingsState;
export type VersionCheckStateType = VersionCheckState;
export const models = {
  settings,
  sharks,
  dolphins,
  minimumVersionChecks,
};
