import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Screens from '../screens';
import { spacing } from '../styles/spacing';
import HomeIcon from '../assets/svg/BottomTabIcon/Home';
import CalendarIcon from '../assets/svg/BottomTabIcon/celender'
import ChatIcon from '../assets/svg/BottomTabIcon/chat';

interface CustomIconProps {
  width?: number;
  height?: number;
  focused?: boolean;
  color?: string;
}

type TabScreenParamList = {
  Home: undefined;
  Calendar: undefined;
  Chat: undefined;
};

interface TabIconProps {
  focused: boolean;
  icon: React.ComponentType<CustomIconProps>;
}

const Tab = createBottomTabNavigator<TabScreenParamList>();

const ACTIVE_TAB_COLOR = '#47C2C4';
const INACTIVE_TAB_COLOR = '#3C3B3B';
const TAB_BAR_COLOR = '#fffefe';

const TabIcon: React.FC<TabIconProps> = ({ focused, icon: Icon }) => {
  return (
    <View style={styles.tabItem}>
      <Icon width={24} height={24} focused={focused} color={focused ? ACTIVE_TAB_COLOR : INACTIVE_TAB_COLOR} />
    </View>
  );
};

const BottomTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: ACTIVE_TAB_COLOR,
        tabBarInactiveTintColor: INACTIVE_TAB_COLOR,
        tabBarStyle: {
          backgroundColor: TAB_BAR_COLOR,
          height: spacing.HEIGHT_50,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Screens.HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={HomeIcon} />,
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={Screens.CelenderScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={CalendarIcon} />,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Screens.ChatScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={ChatIcon} />,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BottomTabs;
