import React from 'react';
import { Resource } from '@app/core';
import LottieView from 'lottie-react-native';

interface Props {
  width: number;
  height: number;
  source: Resource;
  autoPlay?: boolean;
  loop?: boolean;
}

export const Animation = (props: Props): JSX.Element => {
  return (
    <LottieView
      source={props.source}
      style={{
        width: props.width,
        height: props.height,
      }}
      autoPlay={props.autoPlay === true}
      loop={props.loop === true}
    />
  );
};
