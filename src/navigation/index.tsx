import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { initializeApp } from '../api/slices/initializeApp ';
import Loader from '../components/common/Loader';
import { useAppDispatch, useAppSelector } from '../components/hooks';
import { navigationRef } from '../NavigationServies';
import { SplashScreen } from '../screens';
import AuthNavigator from './auth/AuthNavigator';
import HomeNavigator from './main/healthcare-home/HomeNavigator';

const Stack = createNativeStackNavigator();


const Router: React.FC = () => {
  const dispatch = useAppDispatch();
  const [showSplash, setShowSplash] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const {isAuthenticated} = useAppSelector(state => state.auth);
  useEffect(() => {
    const initialize = async () => {
      try {
        await dispatch(initializeApp()).unwrap();
      } catch (error) {
        console.error('Initialization failed:', error);
      } finally {
        setInitialized(true);
      }
    };
    initialize();
  }, [dispatch]);

  const handleAnimationComplete = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    setShowSplash(false)
  };

  if (showSplash) {
    return <SplashScreen onAnimationComplete={handleAnimationComplete} />;
  }

  if (!initialized) {
    return <Loader />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="HomeRoute" component={HomeNavigator} />
        ) : (
          <Stack.Screen name="AuthRoute" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Match your app's background color
  },
});

export default Router;