import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { spacing } from '../../styles/spacing';

interface CustomButtonProps {
  onPress: () => any;
  title: string;
  disabled?: boolean;
  loading?: boolean;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  variant?: 'primary' | 'secondary' | 'outline';
  gradientColors?: string[];
  backgroundColor?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onPress,
  title,
  disabled = false,
  loading = false,
  containerStyle,
  textStyle,
  variant = 'primary',
  gradientColors,
}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondaryButton;
      case 'outline':
        return styles.outlineButton;
      default:
        return styles.primaryButton;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondaryText;
      case 'outline':
        return styles.outlineText;
      default:
        return styles.primaryText;
    }
  };

  const ButtonContent = () => (
    <>
      {loading ? (
        <ActivityIndicator 
          color={variant === 'outline' ? '#47C2C4' : '#FFFFFF'} 
          size="small" 
        />
      ) : (
        <Text style={[
          styles.text,
          getTextStyle(),
          disabled && styles.disabledText,
          textStyle,
        ]}>
          {title}
        </Text>
      )}
    </>
  );

  if (gradientColors) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.7}
        style={[styles.gradientContainer, containerStyle]}
      >
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.container,
            getButtonStyle(),
            disabled && styles.disabledButton,
          ]}
        >
          <ButtonContent />
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.container,
        getButtonStyle(),
        disabled && styles.disabledButton,
        containerStyle,
      ]}
      activeOpacity={0.7}
    >
      <ButtonContent />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    borderRadius: spacing.RADIUS_12,
    overflow: 'hidden',
  },
  container: {
    height: spacing.HEIGHT_52,
    borderRadius: spacing.RADIUS_12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.PADDING_16,
  },
  text: {
    fontSize: spacing.PADDING_16,
    fontWeight: '600',
    textAlign: 'center',
  },
  
  primaryButton: {
    backgroundColor: '#47C2C4',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  
  secondaryButton: {
    backgroundColor: '#E8F8F8',
  },
  secondaryText: {
    color: '#47C2C4',
  },
  
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#47C2C4',
  },
  outlineText: {
    color: '#47C2C4',
  },
  
  disabledButton: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.8,
  },
});

export default CustomButton;