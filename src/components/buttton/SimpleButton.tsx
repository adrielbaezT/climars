import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';

interface Props {
  appendComponent: JSX.Element;
  handleOnPress?: () => void;
}

export const SimpleButton: FC<Props> = ({appendComponent, handleOnPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={handleOnPress}>
      {appendComponent}
    </TouchableOpacity>
  );
};
