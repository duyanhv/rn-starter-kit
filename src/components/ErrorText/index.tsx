import React, { ReactNode } from 'react';
import { TextProps, TextStyle } from 'react-native';
import { combineStyles } from '@app/core';
import { Text } from '../Text';
import { styles } from './styles';

interface Props extends TextProps {
  children?: ReactNode;
}

export const ErrorText = (props: Props): JSX.Element => {
  const style = combineStyles<TextStyle>(styles.default, props.style);
  return (
    <Text {...props} style={style}>
      {props.children}
    </Text>
  );
};
