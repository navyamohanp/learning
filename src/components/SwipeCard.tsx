import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const {width} = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.25;

interface Props {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  children: React.ReactNode;
}

const SwipeCard = ({onSwipeLeft, onSwipeRight, children}: Props) => {
  const translateX = useSharedValue(0);
  const rotateZ = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      translateX.value = e.translationX;
      rotateZ.value = (e.translationX / width) * 20;
    })
    .onEnd(() => {
      if (translateX.value > SWIPE_THRESHOLD) {
        // RIGHT SWIPE
        translateX.value = withTiming(width, {duration: 200}, () => {
          if (onSwipeRight) runOnJS(onSwipeRight)();
        });
      } else if (translateX.value < -SWIPE_THRESHOLD) {
        // LEFT SWIPE
        translateX.value = withTiming(-width, {duration: 200}, () => {
          if (onSwipeLeft) runOnJS(onSwipeLeft)();
        });
      } else {
        // RESET POSITION
        translateX.value = withSpring(0);
        rotateZ.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: translateX.value},
      {rotateZ: `${rotateZ.value}deg`},
    ],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.card, animatedStyle]}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.9,
    height: 400,
    backgroundColor: '#FFF',
    borderRadius: 20,
    alignSelf: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 4},
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SwipeCard;
