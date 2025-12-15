import React, {useRef, useState} from 'react';
import {View, Button, Dimensions, StyleSheet, Image} from 'react-native';
import {Canvas, Rect} from '@shopify/react-native-skia';

const {width, height} = Dimensions.get('window');

const CONFETTI_COLORS = [
  '#FF4E50',
  '#FC913A',
  '#F9D423',
  '#EDE574',
  '#E1F5C4',
  '#4ED1A1',
  '#4EC2F1',
  '#A46EFD',
];

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

// CONFETTI ONLY — no ribbons
function createParticles() {
  return Array.from({length: 120}).map(() => ({
    x: rand(0, width),
    y: rand(-height, -20),
    size: rand(6, 12),
    vy: rand(2, 5),
    rotation: rand(0, Math.PI * 2),
    rotationSpeed: rand(-0.04, 0.04),
    settled: false,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
  }));
}

export default function RewardAnimation() {
  const [particles, setParticles] = useState([]);
  const [showTrophy, setShowTrophy] = useState(false);
  const animRef = useRef(null);

  const startAnimation = () => {
    setParticles(createParticles());
    setShowTrophy(true);

    animate();
    setTimeout(() => stopAnimation(), 4000);
  };

  const stopAnimation = () => {
    cancelAnimationFrame(animRef.current);
    setParticles([]);
  };

  const animate = () => {
    animRef.current = requestAnimationFrame(animate);

    setParticles(prev =>
      prev.map(p => {
        const np = {...p};

        // If already settled, do nothing
        if (np.settled) {
          return np;
        }

        // Gravity
        np.vy += 0.05;
        if (np.vy > 7) np.vy = 7;

        // Fall straight down
        np.y += np.vy;

        // Stop on bottom
        if (np.y >= height - 40) {
          np.y = height - 40 - rand(0, 20); // slight variation for realism
          np.vy = 0;
          np.rotationSpeed = 0;
          np.settled = true; // lock the confetti
        }

        // rotation while falling
        np.rotation += np.rotationSpeed;

        return np;
      }),
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* Trophy appears only while confetti is active */}
      {showTrophy && (
        <Image
          source={require('../assets/Group.png')}
          style={{
            position: 'absolute',
            width: 180,
            height: 180,
            top: height / 2 - 90,
            left: width / 2 - 90,
            zIndex: 10,
          }}
          resizeMode="contain"
        />
      )}

      <Canvas style={StyleSheet.absoluteFill}>
        {particles.map((p, i) => (
          <Rect
            key={i}
            x={p.x}
            y={p.y}
            width={p.size}
            height={p.size * 0.6}
            color={p.color}
            transform={[
              {translateX: p.size / 2},
              {translateY: p.size * 0.3},
              {rotate: p.rotation},
              {translateX: -p.size / 2},
              {translateY: -p.size * 0.3},
            ]}
          />
        ))}
      </Canvas>

      <View style={styles.btnWrap}>
        <Button title="Celebrate!" onPress={startAnimation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnWrap: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 20,
  },
});
