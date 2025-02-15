// ActionButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Dimensions, Platform } from 'react-native';
import { spacing } from '../../styles/spacing';
import { textScale } from '../../styles/responsiveStyles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const BUTTON_WIDTH = (SCREEN_WIDTH - (spacing.PADDING_16 * 3)) / 2; 

interface ActionButtonProps {
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ title, icon, onPress }) => {
  return (
    <TouchableOpacity style={[styles.button, { width: BUTTON_WIDTH }]} onPress={onPress}>
      <View style={styles.buttonContent}>
        <Text style={styles.buttonText} numberOfLines={1}>
          {title}
        </Text>
        {icon}
      </View>
    </TouchableOpacity>
  );
};

interface ActionGridProps {
  actions: {
    title: string;
    icon: React.ReactNode;
    onPress: () => void;
  }[];
}

const ActionGrid: React.FC<ActionGridProps> = ({ actions }) => {
  const rows = [];
  for (let i = 0; i < actions.length; i += 2) {
    rows.push(actions.slice(i, i + 2));
  }

  return (
    <View style={styles.container}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((action, index) => (
            <ActionButton
              key={index}
              title={action.title}
              icon={action.icon}
              onPress={action.onPress}
            />
          ))}
          {row.length === 1 && <View style={{ width: BUTTON_WIDTH }} />}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.PADDING_16,
    width: '100%',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: spacing.RADIUS_8,
    padding: Platform.select({
      ios: spacing.PADDING_12,
      android: spacing.PADDING_10,
    }),
    height: spacing.HEIGHT_50, 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    borderWidth:1,
    borderColor:'#000'
  },
  buttonContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.PADDING_8,
    flexDirection:'row',
    paddingHorizontal:spacing.PADDING_8
  },
  buttonText: {
    fontSize: textScale(14),
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default ActionGrid;