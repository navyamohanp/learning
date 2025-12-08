// import React, {useState, useRef, useEffect} from 'react';
// import {
//   View,
//   Text,
//   Platform,
//   PermissionsAndroid,
//   TouchableOpacity,
//   StyleSheet,
//   Animated,
//   Easing,
// } from 'react-native';
// import Sound from 'react-native-nitro-sound';

// export default function RecorderExample() {
//   const [isRecording, setIsRecording] = useState(false);
//   const [audioPath, setAudioPath] = useState(null);

//   // Wave animations
//   const wave1 = useRef(new Animated.Value(10)).current;
//   const wave2 = useRef(new Animated.Value(20)).current;
//   const wave3 = useRef(new Animated.Value(15)).current;

//   const animateWave = (wave, min, max, duration) => {
//     return Animated.loop(
//       Animated.sequence([
//         Animated.timing(wave, {
//           toValue: max,
//           duration,
//           easing: Easing.linear,
//           useNativeDriver: false,
//         }),
//         Animated.timing(wave, {
//           toValue: min,
//           duration,
//           easing: Easing.linear,
//           useNativeDriver: false,
//         }),
//       ]),
//     );
//   };

//   useEffect(() => {
//     let a1, a2, a3;

//     if (isRecording) {
//       a1 = animateWave(wave1, 10, 50, 300);
//       a2 = animateWave(wave2, 15, 60, 400);
//       a3 = animateWave(wave3, 12, 45, 350);

//       a1.start();
//       a2.start();
//       a3.start();
//     } else {
//       wave1.stopAnimation();
//       wave2.stopAnimation();
//       wave3.stopAnimation();

//       wave1.setValue(10);
//       wave2.setValue(20);
//       wave3.setValue(15);
//     }

//     return () => {
//       wave1.stopAnimation();
//       wave2.stopAnimation();
//       wave3.stopAnimation();
//     };
//   }, [isRecording]);

//   async function requestAndroidPermissions() {
//     if (Platform.OS === 'android') {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//         {
//           title: 'Microphone Permission',
//           message: 'App needs access to your microphone',
//           buttonPositive: 'OK',
//         },
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     }
//     return true;
//   }

//   const startRecording = async () => {
//     const ok = await requestAndroidPermissions();
//     if (!ok) return;

//     try {
//       const path = await Sound.startRecorder();
//       setAudioPath(path);
//       setIsRecording(true);
//     } catch (err) {
//       console.error('startRecorder error', err);
//     }
//   };

//   const stopRecording = async () => {
//     try {
//       await Sound.stopRecorder();
//       setIsRecording(false);
//     } catch (err) {
//       console.error('stopRecorder error', err);
//     }
//   };

//   const play = async () => {
//     try {
//       await Sound.startPlayer(audioPath);
//     } catch (err) {
//       console.error('startPlayer error', err);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {isRecording && (
//         <View style={styles.waveWrapper}>
//           <Animated.View style={[styles.waveBar, {height: wave1}]} />
//           <Animated.View style={[styles.waveBar, {height: wave2}]} />
//           <Animated.View style={[styles.waveBar, {height: wave3}]} />
//         </View>
//       )}

//       <TouchableOpacity
//         style={styles.button}
//         onPress={isRecording ? stopRecording : startRecording}>
//         <Text style={styles.buttonText}>{isRecording ? 'Stop' : 'Record'}</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={[styles.button, !audioPath && styles.disabledButton]}
//         onPress={play}
//         disabled={!audioPath}>
//         <Text style={styles.buttonText}>Play</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 80,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   waveWrapper: {
//     flexDirection: 'row',
//     alignItems: 'flex-end',
//     height: 70,
//     marginBottom: 20,
//   },
//   waveBar: {
//     width: 8,
//     backgroundColor: 'red',
//     marginHorizontal: 5,
//     borderRadius: 4,
//   },
//   button: {
//     backgroundColor: 'black',
//     width: 100,
//     height: 50,
//     borderRadius: 25,
//     justifyContent: 'center',
//     alignItems: 'center',
//     margin: 20,
//   },
//   disabledButton: {
//     opacity: 0.5,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: '600',
//   },
// });
