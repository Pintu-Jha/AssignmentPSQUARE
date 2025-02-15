import React from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacing } from '../../styles/spacing';

interface CustomContainerProps extends ViewProps {
  children: React.ReactNode;
  useScrollView?: boolean;
  keyboardAvoidingViewProps?: ViewProps;
  safeAreaViewProps?: ViewProps;
  containerStyle?: StyleProp<ViewStyle>;
  keyboardAvoidingStyle?: StyleProp<ViewStyle>;
  safeAreaStyle?: StyleProp<ViewStyle>;
  noPadding?:Boolean
}

const ContainerComponent: React.FC<CustomContainerProps> = ({
  children,
  useScrollView = false,
  style,
  keyboardAvoidingViewProps,
  safeAreaViewProps,
  containerStyle,
  keyboardAvoidingStyle,
  safeAreaStyle,
  noPadding=false,
  ...rest
}) => {

  const getDynamicPadding = () => {
    const baseSize = Math.min(spacing.FULL_WIDTH, spacing.FULL_HEIGHT);
    return baseSize * 0.03;
  };
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaProvider>
      <LinearGradient
        colors={['#fff', '#fff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[{ flex: 1, paddingTop: insets.top }, style]}
      >
        <SafeAreaView
          style={StyleSheet.flatten([styles.safeArea, safeAreaStyle, safeAreaViewProps?.style])}
          {...safeAreaViewProps}
        >
          <KeyboardAvoidingView
            style={StyleSheet.flatten([styles.keyboardAvoiding, keyboardAvoidingStyle, keyboardAvoidingViewProps?.style])}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            {...keyboardAvoidingViewProps}
          >
            {useScrollView ? (
              <FlatList
                data={[]} 
                renderItem={null} 
                ListHeaderComponent={
                  <View style={StyleSheet.flatten([styles.container, containerStyle, style])} {...rest}>
                    {children}
                  </View>
                }
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.container}
              />
            ) : (
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={StyleSheet.flatten([styles.container,{padding: noPadding ? 0 : getDynamicPadding(),}, containerStyle, style])} {...rest}>
                  {children}
                </View>
              </TouchableWithoutFeedback>
            )}
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardAvoiding: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});

export default ContainerComponent;
