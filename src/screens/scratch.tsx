import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  Canvas,
  Circle,
  Group,
  Rect,
  LinearGradient,
  vec,
  RoundedRect,
  rrect,
  rect,
} from '@shopify/react-native-skia';

export default function ScratchScreen() {
  const width = 320;
  const height = 200;
  const radius = 20;
  const brushSize = 35;

  const [points, setPoints] = useState([]);

  const addPoint = (x, y) => {
    setPoints(prev => [...prev, {x, y}]);
  };

  const handleStart = e =>
    addPoint(e.nativeEvent.locationX, e.nativeEvent.locationY);

  const handleMove = e =>
    addPoint(e.nativeEvent.locationX, e.nativeEvent.locationY);

  return (
    <View style={styles.container}>
      <View style={{width, height}}>
        <View style={[styles.prizeBox, {width, height}]}>
          <Text style={styles.prizeText}>YOU WON!</Text>
        </View>

        <Canvas style={{width, height, position: 'absolute'}}>
          <Group clip={rrect(rect(0, 0, width, height), radius, radius)}>
            <RoundedRect x={0} y={0} width={width} height={height} r={radius}>
              <LinearGradient
                start={vec(0, 0)}
                end={vec(width, height)}
                colors={['#FF69B4', '#4169E1']}
              />
            </RoundedRect>

            <Group blendMode="dstOut">
              {points.map((p, i) => (
                <Circle key={i} cx={p.x} cy={p.y} r={brushSize} />
              ))}
            </Group>
          </Group>
        </Canvas>

        {/* TOUCH HANDLER LAYER */}
        <View
          style={{position: 'absolute', width, height, zIndex: 10}}
          onStartShouldSetResponder={() => true}
          onMoveShouldSetResponder={() => true}
          onResponderGrant={handleStart}
          onResponderMove={handleMove}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prizeBox: {
    position: 'absolute',
    backgroundColor: '#FFEFB5',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  prizeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
});
