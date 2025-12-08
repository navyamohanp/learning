import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Canvas, Rect } from "@shopify/react-native-skia";

export default function BarGraph() {
  // Real X-Y data
  const data = [
    { x: "Mon", y: 120 },
    { x: "Tue", y: 80 },
    { x: "Wed", y: 150 },
    { x: "Thu", y: 60 },
    { x: "Fri", y: 200 },
  ];

  const width = 340;
  const height = 260;
  const barWidth = 40;
  const gap = 25;

  // Find max Y to scale the graph
  const maxY = Math.max(...data.map(d => d.y));

  // Animation progress per bar
  const [progress, setProgress] = useState(data.map(() => 0));
  const animStart = useRef<number | null>(null);
  const [animationKey, setAnimationKey] = useState(0);

  // Refresh animation handler
  const handleRefresh = () => {
    setProgress(data.map(() => 0));
    animStart.current = null;
    setAnimationKey(prev => prev + 1);
  };

  // Easing function
  const ease = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  useEffect(() => {
    const duration = 1200;
    const delays = data.map((_, i) => i * 120);

    const animate = (timestamp: number) => {
      if (!animStart.current) animStart.current = timestamp;
      const elapsed = timestamp - animStart.current;

      const newProgress = progress.map((_, i) => {
        const adjusted = Math.max(0, elapsed - delays[i]);
        const raw = Math.min(adjusted / duration, 1);
        return ease(raw);
      });

      setProgress(newProgress);

      if (elapsed < duration + delays[delays.length - 1]) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [animationKey]);

  return (
    <View style={styles.container}>
      <Canvas style={{ width, height }}>
        {data.map((d, i) => {
          // Scale y value → screen height
          const scaledHeight = (d.y / maxY) * height * progress[i];

          const x = i * (barWidth + gap);
          const y = height - scaledHeight;

          return (
            <Rect
              key={i}
              x={x}
              y={y}
              width={barWidth}
              height={scaledHeight}
              color="#4ECDC4"
              
             
            />
          );
        })}
      </Canvas>

      {/* Day Labels */}
      <View style={styles.labelsContainer}>
        {data.map((d, i) => {
          const x = i * (barWidth + gap);
          return (
            <Text
              key={i}
              style={[
                styles.label,
                { left: x + barWidth / 2 - 15 }
              ]}
            >
              {d.x}
            </Text>
          );
        })}
      </View>

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
    backgroundColor: "#1a1a2e",
    alignItems: "center",
    justifyContent: "center",
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
  labelsContainer: {
    width: 340,
    height: 30,
    marginTop: 10,
    position: 'relative',
  },
  label: {
    position: 'absolute',
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    opacity: 0.8,
  },
});
