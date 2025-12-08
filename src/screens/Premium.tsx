import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import CustomModal from '../components/CustomModal';
import WateringModal from '../components/WateringModal';

const Premium = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [isWateringModalVisible, setIsWateringModalVisible] = useState(false);


  return (
    <View style={styles.bg}>
      <Text style={styles.text}>Premium Screen</Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsModalVisible(true)}>
        <Text style={styles.buttonText}>Show Modal</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsModalVisible2(true)}>
        <Text style={styles.buttonText}>Show Modal 2</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsWateringModalVisible(true)}>
        <Text style={styles.buttonText}>Show Watering Modal</Text>
      </TouchableOpacity>

      <CustomModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title="Friend Limit Reached"
        description="You’ve reached your limit of 20 active friends. Upgrade to Premium to unlock 10 more slots and keep growing your circle of love!"
        primaryButtonText="Upgrade to Premium"
        onPrimaryButtonPress={() => setIsModalVisible(false)}
        icon={require('../assets/friendlimit.png')}
      />
      
      <CustomModal
        isVisible={isModalVisible2}
        onClose={() => setIsModalVisible2(false)}
        title="Tree Complete!"
        description="Your friendship tree has reached 75 leaves. You earned 30 Coins!"
        primaryButtonText="Collect Reward"
        onPrimaryButtonPress={() => setIsModalVisible2(false)}
        secondaryButtonText='View Friendship Forest'
        onSecondaryButtonPress={() => setIsModalVisible2(false)}
       
      />

      <WateringModal
        isVisible={isWateringModalVisible}
        onClose={() => setIsWateringModalVisible(false)}
        title="Healing in progress..."
        subtitle="Your care is making a difference."
        illustration={require('../assets/blue.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: 'green',
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  buttonText: {
    color: 'green',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Premium;
