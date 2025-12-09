import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Canvas, Path, Group, Skia} from '@shopify/react-native-skia';

export default function Donut() {
  // Ring colors (outer → inner)
  const rings = [{color: '#FF6B6B'}, {color: '#4ECDC4'}, {color: '#FFD93D'}];

  // Percentages for each ring (0–1 range)
  const percentages = [0.8, 0.7, 0.5];

  const size = 320;
  const baseStrokeWidth = 28;
  const gap = 8;

  // Animation progress for each ring
  const [progress1, setProgress1] = useState(0);
  const [progress2, setProgress2] = useState(0);
  const [progress3, setProgress3] = useState(0);

  const animationStartTime = useRef<number | null>(null);
  const [animationKey, setAnimationKey] = useState(0);

  // Refresh animation handler
  const handleRefresh = () => {
    setProgress1(0);
    setProgress2(0);
    setProgress3(0);
    animationStartTime.current = null;
    setAnimationKey(prev => prev + 1);
  };

  // Function to create both white base ring + colored trimmed arc
  const createRingPaths = (ringIndex: number, animProgress: number) => {
    const strokeWidth = baseStrokeWidth - ringIndex * 2;
    const totalOffset = ringIndex * (baseStrokeWidth + gap);

    const radius = (size - baseStrokeWidth * 2 - totalOffset * 2) / 2;

    const centerOffset = strokeWidth / 2 + totalOffset;
    const percent = percentages[ringIndex];

    // ---- White base ring ----
    const base = Skia.Path.Make();
    base.addCircle(centerOffset + radius, centerOffset + radius, radius);

    // ---- Colored arc ----
    const arc = Skia.Path.Make();
    arc.addCircle(centerOffset + radius, centerOffset + radius, radius);

    const trimmed = arc.trim(0, animProgress * percent, false);

    return {
      basePath: base,
      arcPath: trimmed ?? arc,
      color: rings[ringIndex].color,
      strokeWidth,
    };
  };

  // Smooth animation easing
  const easeInOutCubic = (t: number): number =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  // Animate with delays like the GIF
  useEffect(() => {
    const duration = 1800;
    const delays = [0, 200, 400];

    const animate = (timestamp: number) => {
      if (!animationStartTime.current) {
        animationStartTime.current = timestamp;
      }

      const elapsed = timestamp - animationStartTime.current;

      delays.forEach((delay, index) => {
        const adjustedElapsed = Math.max(0, elapsed - delay);
        const raw = Math.min(adjustedElapsed / duration, 1);
        const eased = easeInOutCubic(raw);

        if (index === 0) setProgress1(eased);
        if (index === 1) setProgress2(eased);
        if (index === 2) setProgress3(eased);
      });

      if (elapsed < duration + delays[2]) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [animationKey]);

  const ring1 = createRingPaths(0, progress1);
  const ring2 = createRingPaths(1, progress2);
  const ring3 = createRingPaths(2, progress3);

  const allRings = [ring1, ring2, ring3];

  return (
    <View style={styles.container}>
      <Canvas style={{width: size, height: size}}>
        <Group>
          {allRings.map((ring, index) => (
            <React.Fragment key={index}>
              {/* White background ring */}
              <Path
                path={ring.basePath}
                color="white"
                opacity={0.15}
                style="stroke"
                strokeWidth={ring.strokeWidth}
                strokeCap="round"
              />

              {/* Colored animated arc */}
              <Path
                path={ring.arcPath}
                color={ring.color}
                style="stroke"
                strokeWidth={ring.strokeWidth}
                strokeCap="round"
              />
            </React.Fragment>
          ))}
        </Group>
      </Canvas>

      {/* Refresh Button */}
      <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
        <Text style={styles.refreshIcon}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a2e',
  },
  refreshButton: {
    marginTop: 40,
    width: 100,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2a2a3e',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#3a3a4e',
  },
  refreshIcon: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
