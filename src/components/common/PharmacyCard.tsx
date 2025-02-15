import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { spacing } from '../../styles/spacing';
import TextComponent from '../../components/common/TextComponent';

interface PharmacyCardProps {
  name: string;
  distance: string;
  rating: number;
  reviews: number;
  image: any;
  onPress?: () => void;
}

interface PharmacyListProps {
  pharmacies: PharmacyCardProps[];
}

const PharmacyCard: React.FC<PharmacyCardProps> = ({
  name,
  distance,
  rating,
  reviews,
  image,
  onPress,
}) => {
  return (
    <TouchableOpacity 
      style={styles.cardContainer}
      onPress={onPress}
    >
      <Image 
        source={image} 
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <TextComponent
          text={name}
          size={16}
          fontWeight="500"
          color="#000000"
          style={styles.name}
        />
        <TextComponent
          text={`${distance} Away`}
          size={13}
          color="#453E3E"
          fontWeight={'500'}
          style={styles.distance}
        />
        <TextComponent
          text={`${rating} (${reviews} reviews)`}
          size={12}
          color="#453E3E"
          fontWeight={'500'}
        />
      </View>
    </TouchableOpacity>
  );
};

const PharmacyList: React.FC<PharmacyListProps> = ({ pharmacies }) => {
  const renderItem = ({ item }: { item: PharmacyCardProps }) => (
    <PharmacyCard {...item} />
  );

  return (
    <FlatList
      data={pharmacies}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.name}-${index}`}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    gap: spacing.PADDING_12,
  },
  cardContainer: {
    width: spacing.WIDTH_184,
    borderRadius: spacing.RADIUS_12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginRight: spacing.MARGIN_12,
  },
  image: {
    width: '100%',
    borderTopLeftRadius: spacing.RADIUS_12,
    borderTopRightRadius: spacing.RADIUS_12,
  },
  infoContainer: {
    padding: spacing.PADDING_12,
  },
  name: {
    marginBottom: spacing.MARGIN_4,
  },
  distance: {
    marginBottom: spacing.MARGIN_4,
  }
});

export { PharmacyList, PharmacyCard };