import React from 'react';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { IconProps } from 'react-native-vector-icons/Icon';

export const Icon = (props: IconProps): JSX.Element => <MaterialCommunityIcon {...props} size={props.size || 25} />;

export const getIconImageSource = MaterialCommunityIcon.getImageSource;
