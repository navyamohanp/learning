import React, {useRef} from 'react';
import {View, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import Rive, {RiveRef} from 'rive-react-native';

export default function AddToBagButton() {
  const riveRef = useRef<RiveRef>(null);

//   const onPress = () => {
//     riveRef.current?.setInputState(
//       'State Machine 1',
//       'Button Click',
//       true,   // trigger the click
//     );
//   };
  const onPress = () => {
    riveRef.current?.setInputState(
      'State Machine 1',
      'click_Trigger 1',
      true
    );
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onPress}>
        {/* <Rive
          ref={riveRef}
          source={require('../assets/animations/button.riv')}
          artboardName="Artboard"
          stateMachineName="State Machine 1"
          autoplay
          style={{width: 300, height: 300}}
        /> */}
               <Rive
          ref={riveRef}
          source={require('../assets/animations/card.riv')}
          artboardName="Artboard"
          stateMachineName="State Machine 1"
          autoplay={true}
          style={{width: 250, height: 250}}
        />
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
});
