import React, { ReactNode } from 'react';
import { ViewProps, ViewStyle } from 'react-native';
import { combineStyles, colors, THEME_DARK } from '@app/core';
import { useTheme } from '@app/hooks';
import { View } from '../View';
import { styles } from './styles';

interface Props extends ViewProps {
  primary?: boolean;
  children?: ReactNode;
  bordered?: boolean;
  header?: boolean;
}

export const CardItem = (props: Props): JSX.Element => {
  const { componentBackgroundColor, theme } = useTheme();
  const borderedStyle = {
    borderTopWidth: 1,
    borderTopColor: theme === THEME_DARK ? colors.lightBlack : colors.grey,
  };
  const style = combineStyles<ViewStyle>(
    styles.default,
    {
      backgroundColor: componentBackgroundColor,
    },
    props.style,
    props.bordered && !props.header && borderedStyle,
  );

  return (
    <>
      <View {...props} style={style}>
        {props.children}
      </View>
    </>
  );
};
