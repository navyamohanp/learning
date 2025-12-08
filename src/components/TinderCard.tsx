import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.25;

interface Props {
  item: any;
  onSwipe: () => void;
}

export default function TinderCard({item, onSwipe}: Props) {
  const translateX = useSharedValue(0);
  const rotateZ = useSharedValue(0);
  const opacity = useSharedValue(1);

  const gesture = Gesture.Pan()
    .onUpdate(event => {
      translateX.value = event.translationX;
      rotateZ.value = (event.translationX / width) * 20;
    })
    .onEnd(() => {
      if (translateX.value > SWIPE_THRESHOLD) {
        // Swipe Right
        translateX.value = withTiming(width, {duration: 200});
        opacity.value = withTiming(0, {duration: 150}, () =>
          runOnJS(onSwipe)(),
        );
      } else if (translateX.value < -SWIPE_THRESHOLD) {
        // Swipe Left
        translateX.value = withTiming(-width, {duration: 200});
        opacity.value = withTiming(0, {duration: 150}, () =>
          runOnJS(onSwipe)(),
        );
      } else {
        // Reset
        translateX.value = withSpring(0);
        rotateZ.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: translateX.value},
      {rotateZ: `${rotateZ.value}deg`},
    ],
    opacity: opacity.value,
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.card, animatedStyle]}>{item}</Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width * 0.9,
    height: height * 0.6,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
});
