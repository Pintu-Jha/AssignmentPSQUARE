import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import Svg, { Path, ClipPath, Circle } from 'react-native-svg';

const CIRCLE_SIZE = 50;

const Loader = () => {
  const offset = useSharedValue(0);

  React.useEffect(() => {
    offset.value = withRepeat(
      withTiming(1, {
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, []);

  const waveStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value * -30 }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <View style={styles.waveContainer}>
          <Animated.View style={[styles.wave, waveStyle]}>
            <Svg width={CIRCLE_SIZE * 2} height={CIRCLE_SIZE}>
              <ClipPath id="circleClip">
                <Circle cx={CIRCLE_SIZE / 2} cy={CIRCLE_SIZE / 2} r={CIRCLE_SIZE / 2} />
              </ClipPath>
              
              {/* Main wave */}
              <Path
                d={`M0 ${CIRCLE_SIZE * 0.5} 
                   Q${CIRCLE_SIZE * 0.25} ${CIRCLE_SIZE * 0.4} 
                    ${CIRCLE_SIZE * 0.5} ${CIRCLE_SIZE * 0.5}
                   Q${CIRCLE_SIZE * 0.75} ${CIRCLE_SIZE * 0.6}
                    ${CIRCLE_SIZE} ${CIRCLE_SIZE * 0.5}
                   L${CIRCLE_SIZE} ${CIRCLE_SIZE}
                   L0 ${CIRCLE_SIZE}Z`}
                fill="#4FD1C5"
                clipPath="url(#circleClip)"
              />
              
              {/* Overlay wave with lighter color */}
              <Path
                d={`M0 ${CIRCLE_SIZE * 0.45}
                   Q${CIRCLE_SIZE * 0.25} ${CIRCLE_SIZE * 0.35}
                    ${CIRCLE_SIZE * 0.5} ${CIRCLE_SIZE * 0.45}
                   Q${CIRCLE_SIZE * 0.75} ${CIRCLE_SIZE * 0.55}
                    ${CIRCLE_SIZE} ${CIRCLE_SIZE * 0.45}
                   L${CIRCLE_SIZE} ${CIRCLE_SIZE}
                   L0 ${CIRCLE_SIZE}Z`}
                fill="#B2F5EA"
                opacity={0.3}
                clipPath="url(#circleClip)"
              />
            </Svg>
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 2,
    borderColor: '#4FD1C5',
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  waveContainer: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  wave: {
    position: 'absolute',
    width: CIRCLE_SIZE * 2,
    height: '100%',
  },
});

export default Loader;