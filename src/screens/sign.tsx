import React, {useState, useRef} from 'react';
import {View, Button, StyleSheet, Alert, Platform} from 'react-native';
// import RNFS from 'react-native-fs'; // Moved to require inside handleSave to avoid iOS crash
import {
  Canvas,
  Path,
  Skia,
  SkPath,
  SkImage,
  useCanvasRef,
  Rect,
} from '@shopify/react-native-skia';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {runOnJS} from 'react-native-reanimated';
import Share from 'react-native-share';

export default function SignaturePad() {
  const [paths, setPaths] = useState<SkPath[]>([]);
  const [currentPath, setCurrentPath] = useState<SkPath | null>(null);
  const currentPathRef = useRef<SkPath | null>(null);
  const canvasRef = useCanvasRef();

  const updateCurrentPath = (path: SkPath | null) => {
    setCurrentPath(path);
  };

  const addPath = (path: SkPath) => {
    setPaths(prev => [...prev, path]);
    setCurrentPath(null);
    currentPathRef.current = null;
  };

  const pan = Gesture.Pan()
    .onStart(g => {
      const p = Skia.Path.Make();
      p.moveTo(g.x, g.y);
      currentPathRef.current = p;
      runOnJS(updateCurrentPath)(p);
    })
    .onUpdate(g => {
      if (currentPathRef.current) {
        currentPathRef.current.lineTo(g.x, g.y);

        runOnJS(updateCurrentPath)(currentPathRef.current);
      }
    })
    .onEnd(() => {
      if (currentPathRef.current) {
        runOnJS(addPath)(currentPathRef.current);
      }
    });

  const clear = () => {
    setPaths([]);
    setCurrentPath(null);
    currentPathRef.current = null;
  };

  const handleSave = async () => {
    const image = canvasRef.current?.makeImageSnapshot();
    if (image) {
      const base64 = image.encodeToBase64();

      try {
        if (Platform.OS === 'android') {
          const RNFS = require('react-native-fs');
          const path = `${RNFS.CachesDirectoryPath}/signature.png`;
          await RNFS.writeFile(path, base64, 'base64');

          await Share.open({
            url: `file://${path}`,
            type: 'image/png',
            filename: 'signature.png',
            title: 'Save Signature',
            failOnCancel: false,
          });
        } else {
          const dataUrl = `data:image/png;base64,${base64}`;
          await Share.open({
            url: dataUrl,
            type: 'image/png',
            filename: 'signature.png',
            title: 'Save Signature',
            failOnCancel: false,
          });
        }
      } catch (error) {
        console.log('Error sharing:', error);
        Alert.alert(
          'Error',
          'Failed to share signature: ' + (error as any).message,
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.canvasContainer}>
        <GestureDetector gesture={pan}>
          <View style={styles.canvas}>
            <Canvas style={styles.canvas} ref={canvasRef}>
              <Rect x={0} y={0} width={1000} height={1000} color="white" />
              {paths.map((p, index) => (
                <Path
                  key={index}
                  path={p}
                  color="black"
                  strokeWidth={4}
                  style="stroke"
                  strokeCap="round"
                  strokeJoin="round"
                />
              ))}
              {currentPath && (
                <Path
                  path={currentPath}
                  color="black"
                  strokeWidth={4}
                  style="stroke"
                  strokeCap="round"
                  strokeJoin="round"
                />
              )}
            </Canvas>
          </View>
        </GestureDetector>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Clear Signature" onPress={clear} />
        <View style={{height: 10}} />
        <Button title="Save Signature" onPress={handleSave} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  canvasContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  canvas: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },
});
