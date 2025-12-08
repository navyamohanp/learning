import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SwipeCard from '../components/SwipeCard';

export default function Swipe() {
  const [index, setIndex] = useState(0);

  const cards = ['Card One', 'Card Two', 'Card Three', 'Card Four'];

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        {cards[index] ? (
          <SwipeCard
            onSwipeLeft={() => setIndex(prev => prev + 1)}
            onSwipeRight={() => setIndex(prev => prev + 1)}>
            <Text style={styles.text}>{cards[index]}</Text>
          </SwipeCard>
        ) : (
          <Text style={styles.text}>No more cards</Text>
        )}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
  },
});
