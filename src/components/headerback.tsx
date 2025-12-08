import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
interface HeaderWithTitleProps {
  title: string;
  onBackPress: () => void;
}

const HeaderWithTitle = ({title, onBackPress}: HeaderWithTitleProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {marginTop: insets.top}]}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backBtn} onPress={onBackPress}>
        <Image
          source={require('../assets/back.png')}
          style={{height: 43, width: 43}}
        />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Dummy view to keep title centered */}
      <View style={{width: 40}} />
    </View>
  );
};

export default HeaderWithTitle;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'red',
    height: 46,
  },
  backBtn: {
    height: 43,
    width: 43,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
});
