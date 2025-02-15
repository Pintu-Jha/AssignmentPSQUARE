// PromotionalCard.tsx
import React, { useEffect, useRef } from 'react';
import { Animated, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import TextComponent from '../../components/common/TextComponent';
import { spacing } from '../../styles/spacing';
import { fontNames } from '../../styles/typography';

const CARD_WIDTH = spacing.FULL_WIDTH;

interface PromotionalCardProps {
  title: string;
  description?: string;
  backgroundColor: string;
  Icon?: React.ComponentType<any>;
  buttonText?: string;
  onButtonPress?: () => void;
  index: number;
}

const PromotionalCard: React.FC<PromotionalCardProps> = ({
  title,
  description,
  backgroundColor,
  Icon,
  buttonText,
  onButtonPress,
  index,
}) => {
  const isFromLeft = index % 2 === 0;
  const initialPosition = isFromLeft ? -CARD_WIDTH : CARD_WIDTH;
  const slideAnim = useRef(new Animated.Value(initialPosition)).current;

  useEffect(() => {
    const delay = index * 200;
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
      delay: delay,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        {
          backgroundColor,
          transform: [{ translateX: slideAnim }],
        },
      ]}
    >
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <TextComponent
            text={title}
            size={20}
            fontWeight={"700"}
            color="#333"
            style={styles.title}
            font={fontNames.ROBOTO_FONT_FAMILY_MEDIUM}
          />
          {description && (
            <TextComponent
              text={description}
              size={12}
              color="#3A3A3A"
              style={styles.description}
              numberOfLines={3}
              font={fontNames.ROBOTO_FONT_FAMILY_REGULAR}
              fontWeight={'700'}

            />
          )}
          {buttonText && (
            <TouchableOpacity 
              style={styles.button}
              onPress={onButtonPress}
            >
              <TextComponent
                text={buttonText}
                size={14}
                color="white"
                fontWeight="700"
                font={fontNames.ROBOTO_FONT_FAMILY_MEDIUM}
              />
            </TouchableOpacity>
          )}
        </View>
        {Icon && (
          <View style={styles.imageContainer}>
            <Icon />
          </View>
        )}
      </View>
    </Animated.View>
  );
};

interface PromotionalCardsListProps {
  cards: Array<Omit<PromotionalCardProps, 'index'>>;
}

const PromotionalCardsList: React.FC<PromotionalCardsListProps> = ({ cards }) => {
  const renderItem = ({ item, index }: { item: Omit<PromotionalCardProps, 'index'>, index: number }) => (
    <PromotionalCard {...item} index={index} />
  );

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={cards}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        nestedScrollEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingVertical: spacing.PADDING_16,
    gap: spacing.PADDING_16,
  },
  cardContainer: {
    borderRadius: spacing.RADIUS_12,
    paddingVertical: spacing.PADDING_30,
    paddingHorizontal: spacing.PADDING_16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: spacing.MARGIN_16,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginRight: spacing.PADDING_16,
  },
  title: {
    marginBottom: spacing.PADDING_4,
  },
  description: {
    marginBottom: spacing.PADDING_8,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: spacing.PADDING_8,
    paddingHorizontal: spacing.PADDING_16,
    borderRadius: spacing.RADIUS_8,
    alignSelf: 'flex-start',
  },
  imageContainer: {
    width: '30%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { PromotionalCard, PromotionalCardsList };
