import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

const Shop = () => {
  return (
    <View style={styles.bg}>
      <Text style={styles.text}>Shop Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: 'blue',
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default Shop;
