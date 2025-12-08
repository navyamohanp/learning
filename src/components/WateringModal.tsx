import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType} from 'react-native';
import Modal from 'react-native-modal';

interface WateringModalProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  illustration?: ImageSourcePropType;
}

const WateringModal: React.FC<WateringModalProps> = ({
  isVisible,
  onClose,
  title = "Healing in progress...",
  subtitle = "Your care is making a difference.",
  illustration,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      backdropOpacity={0.5}
      animationIn="fadeIn"
      animationOut="fadeOut"
      useNativeDriver={true}
      style={styles.modal}>
      <View style={styles.container}>
        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>

        </TouchableOpacity>

        {/* Illustration Circle */}
        <View style={styles.illustrationContainer}>
          {illustration && (
            <Image source={illustration} style={styles.illustration} />
          )}
        </View>

        {/* Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 32,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 40,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: 'green',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#333',
    fontWeight: '400',
  },
  illustrationContainer: {

    marginTop: 20,
    marginBottom: 32,
  },
  illustration: {
    width: 200,
    height: 240,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#30393C',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#747688',
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default WateringModal;
