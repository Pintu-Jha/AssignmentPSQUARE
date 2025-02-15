import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import * as Screens from '../../screens';
import { AuthRouteNames } from './AuthRouteName';
import { AuthStackParams } from './AuthStackParams';

const AuthNavigator: React.FC = () => {
  const AuthStack = createNativeStackNavigator<AuthStackParams>();
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
      initialRouteName={AuthRouteNames.Login}>
      <AuthStack.Screen
        name={AuthRouteNames.Login}
        component={Screens.LoginScreen}
        options={{
          gestureEnabled: false,
        }}
      />
      <AuthStack.Screen
        name={AuthRouteNames.Signup}
        component={Screens.SignupScreen}
        options={{
          gestureEnabled: false,
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
