import React from 'react';
import RootSiblings from 'react-native-root-siblings';
import { AlertContainer, AlertAction, AlertType } from '../AlertContainer';

interface ShowParams {
  type: AlertType;
  title?: string;
  message: string;
  actions?: AlertAction[];
  onPressClose?: () => void;
  closeable?: boolean;
}

let alert: RootSiblings | undefined;
const hide = (): void => {
  alert && alert.destroy();
};

const show = (props: ShowParams): RootSiblings => {
  alert && hide();
  alert = new RootSiblings((<AlertContainer {...props} onPressClose={props.onPressClose || hide} />));
  return alert;
};

export const Alert = {
  show,
  hide,
};
