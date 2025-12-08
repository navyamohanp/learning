import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType} from 'react-native';
import Modal from 'react-native-modal';

interface CustomModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  description: string;
  icon?: ImageSourcePropType;
  primaryButtonText: string;
  onPrimaryButtonPress: () => void;
  secondaryButtonText?: string;
  onSecondaryButtonPress?: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isVisible,
  onClose,
  title,
  description,
  icon,
  primaryButtonText,
  onPrimaryButtonPress,
  secondaryButtonText,
  onSecondaryButtonPress,
}) => {
  return (
    <Modal
     isVisible={isVisible}
      backdropOpacity={0.5}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      renderToHardwareTextureAndroid={true}
      animationIn={'fadeIn'}
      useNativeDriver={true}
      animationOut={'fadeOut'}
      useNativeDriverForBackdrop={true}
      backdropTransitionOutTiming={1}

      style={styles.modal}>
      <View style={[styles.container, icon ? {paddingTop: 40} : null]}>
        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <View style={styles.iconImage} />
        </TouchableOpacity>

        {/* Icon */}
        {icon && (
          <View style={styles.iconContainer}>
            <Image source={icon} style={styles.iconImage} />
          </View>
        )}

        {/* Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Description */}
        <Text style={styles.description}>{description}</Text>

        {/* Primary Button */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={onPrimaryButtonPress}>
          <Text style={styles.primaryButtonText}>{primaryButtonText}</Text>
        </TouchableOpacity>

        {/* Secondary Button */}
        {secondaryButtonText && onSecondaryButtonPress && (
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={onSecondaryButtonPress}>
            <Text style={styles.secondaryButtonText}>
              {secondaryButtonText}
            </Text>
          </TouchableOpacity>
        )}
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
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    width: '95%',
    maxWidth: 400,
    alignItems: 'center',
 
    paddingTop: 80,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: 'green',
  },

  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'green',
  },
  iconImage: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  primaryButton: {
    backgroundColor: '#4A7C59',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25,
    width: '70%',
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: 8,
  },
  secondaryButtonText: {
    color: '#4A7C59',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default CustomModal;
