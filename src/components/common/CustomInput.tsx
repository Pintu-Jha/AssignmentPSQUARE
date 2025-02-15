import React from 'react';
import {
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { spacing } from '../../styles/spacing';

interface CustomInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  leftIcon?: React.ReactNode; 
  rightIcon?: React.ReactNode; 
  iconColor?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  secureTextEntry?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  props?:any
}

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  onChangeText,
  placeholder = '',
  containerStyle,
  inputStyle,
  leftIcon,
  keyboardType = 'default',
  secureTextEntry = false,
  onFocus,
  onBlur,
  rightIcon,
  props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {leftIcon && ( 
        <View style={styles.iconContainer}>
          {leftIcon}
        </View>
      )}
      <TextInput
        style={[
          styles.input,
          !leftIcon && styles.inputWithoutIcon,
          !rightIcon && styles.inputWithoutIcon,
          inputStyle
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#8E8E8E"
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onFocus={onFocus}
        onBlur={onBlur}
        {...props}
      />
       {rightIcon && ( 
        <View style={styles.iconContainer}>
          {rightIcon}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: spacing.RADIUS_12,
    height: spacing.HEIGHT_52,
    paddingHorizontal: spacing.PADDING_16,
  },
  iconContainer: {
    marginRight: spacing.MARGIN_12,
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    fontSize: spacing.PADDING_16,
    color: '#000000',
    height: '100%',
    padding: 0,
  },
  inputWithoutIcon: {
    paddingLeft: 0,
  },
});

export default CustomInput;