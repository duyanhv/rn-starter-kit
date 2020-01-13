import React, { ReactNode } from 'react';
import { combineStyles } from '@app/core';
import { useTheme } from '@app/hooks';
import { ViewProps, ViewStyle } from 'react-native';
import { View } from '../View';
import { styles } from './styles';

interface Props extends ViewProps {
  primary?: boolean;
  children?: ReactNode;
}

export const Card = (props: Props): JSX.Element => {
  const { componentBackgroundColor } = useTheme();

  const style = combineStyles<ViewStyle>(
    styles.default,
    {
      backgroundColor: componentBackgroundColor,
    },
    props.style,
  );

  return (
    <>
      <View {...props} style={style}>
        {props.children}
      </View>
    </>
  );
};
