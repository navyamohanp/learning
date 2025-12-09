import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {
  Canvas,
  Image as SkImage,
  useImage,
  Group,
  Rect,
} from '@shopify/react-native-skia';

export default function MultiFilterScreen() {
  const img = useImage('https://picsum.photos/400/400');

  const [activeFilter, setActiveFilter] = useState<
    'none' | 'blur' | 'bw' | 'bright'
  >('none');

  if (!img) return null;

  return (
    <View style={styles.container}>
      <Canvas style={{width: 300, height: 300}}>
        <SkImage image={img} x={0} y={0} width={300} height={300} />

        {/* BLUR FILTER */}
        {activeFilter === 'blur' && (
          <Group>
            {[...Array(10)].map((_, i) => {
              const offset = i - 5;
              return (
                <SkImage
                  key={i}
                  image={img}
                  x={offset * 1.2}
                  y={offset * 1.2}
                  width={300}
                  height={300}
                  opacity={0.12}
                />
              );
            })}
          </Group>
        )}

        {/* DARK BLACK & WHITE FILTER */}
        {activeFilter === 'bw' && (
          <Group>
            <Rect
              x={0}
              y={0}
              width={300}
              height={300}
              color="rgba(128,128,128,0.55)"
            />

            {/* Darken overall tone */}
            <Rect
              x={0}
              y={0}
              width={300}
              height={300}
              color="rgba(0,0,0,0.35)"
            />

            {/* Slight sharpening effect */}
            <Rect
              x={0}
              y={0}
              width={300}
              height={300}
              color="rgba(255,255,255,0.08)"
            />
          </Group>
        )}

        {/* ⭐ BRIGHTNESS FILTER (NEW!) */}
        {activeFilter === 'bright' && (
          <Group>
            <Rect
              x={0}
              y={0}
              width={300}
              height={300}
              color="rgba(255,255,255,0.35)"
            />
          </Group>
        )}
      </Canvas>

      <View style={styles.row}>
        <FilterButton
          label="Original"
          onPress={() => setActiveFilter('none')}
        />
        <FilterButton label="Blur" onPress={() => setActiveFilter('blur')} />
        <FilterButton label="B & W" onPress={() => setActiveFilter('bw')} />
        <FilterButton
          label="Bright"
          onPress={() => setActiveFilter('bright')}
        />
      </View>
    </View>
  );
}

function FilterButton({label, onPress}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginTop: 20,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    margin: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#4ECDC4',
    borderRadius: 8,
  },
  buttonText: {
    color: '#1a1a2e',
    fontWeight: '700',
  },
});
