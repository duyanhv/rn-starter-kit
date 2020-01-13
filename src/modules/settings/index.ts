import { WithStore, WithScreen } from '@app/components';
import { Navigation } from 'react-native-navigation';
import { screenNames } from '@app/core';
import { SettingsScreen } from './screens';

const registerScreens = (): void => {
  Navigation.registerComponent(screenNames.SettingsScreen, () =>
    WithScreen(WithStore(SettingsScreen), {
      lazyLoad: true,
      orientation: 'PORTRAIT',
    }),
  );
};

export default {
  registerScreens,
};
