import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';

interface SectionProps {
  children?: JSX.Element;
  marginTop?: number;
  marginBottom?: number;
  appendComponent?: JSX.Element;
  secondComponent?: JSX.Element;
}

export const Section: FC<SectionProps> = ({
  children,
  marginTop = 20,
  marginBottom = 0,
  appendComponent,
  secondComponent,
}) => {
  return (
    <View style={[styles.center, {marginTop, marginBottom}]}>
      {children && children}
      {appendComponent && appendComponent}
      {secondComponent && secondComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
