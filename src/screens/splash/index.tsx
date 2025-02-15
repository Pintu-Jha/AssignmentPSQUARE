import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  withDelay,
  runOnJS,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const circleSize = 200;
const finalSize = Math.max(width, height) * 1.5;

const SplashScreen: React.FC<{ onAnimationComplete: () => void }> = ({ onAnimationComplete }) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Start scaling animation after a short delay
    scale.value = withDelay(
      500,
      withTiming(finalSize / circleSize, {
        duration: 800,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }, (finished) => {
        if (finished) {
          runOnJS(setIsLoading)(false);
          runOnJS(onAnimationComplete)();
        }
      })
    );

    // Fade out text as circle expands
    opacity.value = withDelay(
      800,
      withTiming(0, {
        duration: 400,
        easing: Easing.out(Easing.ease),
      })
    );

    // Simulate initialization logic
    setTimeout(() => {
      setIsLoading(false);
      onAnimationComplete();
    }, 2000);
  }, []);

  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  if (!isLoading) return null;

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle, circleStyle]}>
        <Animated.Text style={[styles.text, textStyle]}>
          Healthcare
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    zIndex: 999,
  },
  circle: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    backgroundColor: '#5BA4CF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
  },
});

export default SplashScreen;