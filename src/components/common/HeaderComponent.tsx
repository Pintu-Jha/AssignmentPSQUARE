import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { spacing } from '../../styles/spacing';

interface HeaderProps {
  leftItem?: React.ReactNode;
  centerItem?: React.ReactNode;
  rightItem?: React.ReactNode;
  onLeftPress?: () => void;
  onCenterPress?: () => void;
  onRightPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  leftItem,
  centerItem,
  rightItem,
  onLeftPress,
  onCenterPress,
  onRightPress,
}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      
      <View style={styles.leftSection}>
        {leftItem && (
          <TouchableOpacity 
            onPress={onLeftPress}
            style={styles.itemContainer}
          >
            {leftItem}
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.centerSection}>
        {centerItem && (
          <TouchableOpacity 
            onPress={onCenterPress}
            style={styles.itemContainer}
          >
            {centerItem}
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.rightSection}>
        {rightItem && (
          <TouchableOpacity 
            onPress={onRightPress}
            style={styles.itemContainer}
          >
            {rightItem}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: spacing.HEIGHT_60,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 2,
    alignItems: 'center',
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  itemContainer: {
    // padding: spacing.PADDING_6,
  },
});

export default Header;