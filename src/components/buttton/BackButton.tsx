import React, {FC} from 'react';
import {COLORS} from 'constants/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

interface Props {
  goBack: () => void;
  title?: string;
}

export const BackButton: FC<Props> = ({goBack, title = 'Go Back'}) => {
  return (
    <View
      style={{
        width: 100,
        position: 'absolute',
        top: 10,
        left: 10,
      }}>
      <TouchableOpacity
        style={styles.appButtonContainer}
        activeOpacity={0.9}
        onPress={() => goBack()}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Icon name="chevron-back" size={20} color={COLORS.white} />
          <Text style={styles.appButtonText}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 1050,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: '100%',
    height: 43,
  },
  appButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
