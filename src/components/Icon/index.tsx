import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { IconProps } from 'react-native-vector-icons/Icon';

interface Props extends IconProps {
	solid?: boolean;
}
export const Icon = (props: Props): JSX.Element => <FontAwesome5 {...props} size={props.size || 25} />;

export const getIconImageSource = FontAwesome5.getImageSource;
