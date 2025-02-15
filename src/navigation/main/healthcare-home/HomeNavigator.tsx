import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import * as Screens from '../../../screens';
import { HomeAuthParam } from './HomeAuthParam';
import { HomeRoutesName } from './HomeRoutesName';
import BottomTabs from '../../BottomTab';

const HomeNavigator = () => {
  const HomeStack = createNativeStackNavigator<HomeAuthParam>();
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <HomeStack.Screen
        name={HomeRoutesName.BottomTab}
        component={BottomTabs}
        options={{
          gestureEnabled: false,
        }}
      />
      <HomeStack.Screen
        name={HomeRoutesName.RemindersScreen}
        component={Screens.ReminderScreen}
        options={{
          gestureEnabled: false,
        }}
      />
      
    </HomeStack.Navigator>
  );
};

export default HomeNavigator
