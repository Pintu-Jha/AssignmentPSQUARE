// UploadsScreen.tsx
import React, { useCallback } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Linking,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Upload,
  useDeleteUploadMutation,
  useGetUploadsFilesQuery,
} from '../../api/slices/uploadSlice';
import ContainerComponent from '../../components/common/ContainerComponent';
import TextComponent from '../../components/common/TextComponent';
import { textScale } from '../../styles/responsiveStyles';
import { spacing } from '../../styles/spacing';
import Header from '../../components/common/HeaderComponent';
import LeftArrowIcon from '../../assets/svg/LeftArrow';
import { goBack } from '../../utils/helperFunctions';

interface UploadItemProps {
  item: Upload;
  onPress: (item: Upload) => void;
  // onDelete: (id: string) => void;
}

const TypeBadge = ({ type }: { type: Upload['type'] }) => (
  <View style={[
    styles.badge,
    { backgroundColor: type === 'link' ? '#E3F2FD' : '#E8F5E9' }
  ]}>
    <Text style={[
      styles.badgeText,
      { color: type === 'link' ? '#1976D2' : '#2E7D32' }
    ]}>
      {type.toUpperCase()}
    </Text>
  </View>
);

const UploadItem: React.FC<UploadItemProps> = ({ item, onPress }) => {
  const formatDate = useCallback((dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 1) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    }

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }, []);

  const formatFileSize = (bytes?: number): string => {
    if (!bytes) return '';
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return `${Math.round(size)} ${units[unitIndex]}`;
  };

  return (
    <TouchableOpacity
      style={[styles.itemContainer, styles.elevation]}
      onPress={() => onPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.itemContent}>
        <TypeBadge type={item.type} />
        
        <View style={styles.fileInfo}>
          <TextComponent
            text={item.originalName || 'Untitled'}
            style={styles.fileName}
            numberOfLines={1}
          />
          <View style={styles.metaInfo}>
          <TextComponent>
            {formatDate(item.uploadDate)} {formatFileSize(item.size)}
          </TextComponent>
          </View>
          <View style={styles.statusContainer}>
            <View style={[
              styles.statusDot,
              { backgroundColor: getStatusColor(item.status) }
            ]} />
            <TextComponent
              text={item.status}
              style={styles.statusText}
            />
          </View>
        </View>

        {/* <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(item.id)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <TextComponent
            text='Delete'
            style={styles.deleteText}
          />
        </TouchableOpacity> */}
      </View>
    </TouchableOpacity>
  );
};

const Reminders: React.FC = () => {
  const {
    data,
    isLoading,
    isError,
    refetch,
    isFetching
  } = useGetUploadsFilesQuery();

  const [deleteUpload] = useDeleteUploadMutation();

  const handleItemPress = useCallback(async (item: Upload) => {
    try {
      if (await Linking.openURL(item.url)) {
        await Linking.openURL(item.url);
      } else {
        Alert.alert('Error', 'Cannot open this file');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open file');
    }
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    Alert.alert(
      'Delete Upload',
      'Are you sure you want to delete this upload?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteUpload(id).unwrap();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete upload');
            }
          },
        },
      ]
    );
  }, [deleteUpload]);

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0066CC" />
        <TextComponent
          text='Loading your files...'
          style={styles.loadingText}
        />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centerContainer}>
        <TextComponent
          text='Failed to load uploads'
          style={styles.errorText}
        />
       
        <TouchableOpacity style={styles.retryButton} onPress={refetch}>
        <TextComponent
          text='Try Again'
          style={styles.retryText}
        />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ContainerComponent>
      <Header
        leftItem={
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.backButton} onPress={()=>goBack()}>
              <LeftArrowIcon color="#000" size={48} />
              <TextComponent
                text='Uploded File'
                style={{marginLeft:spacing.MARGIN_6}}
                size={20}
              />
            </TouchableOpacity>
          </View>
        }
      />
      <FlatList
        data={data?.uploads}
        renderItem={({ item }) => (
          <UploadItem 
            item={item} 
            onPress={handleItemPress}
            // onDelete={handleDelete}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl 
            refreshing={isFetching} 
            onRefresh={refetch}
            colors={['#0066CC']}
            tintColor="#0066CC"
          />
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <TextComponent
              text='No uploads found'
              style={styles.emptyText}
            />
          
            <TextComponent
              text='Your uploaded files will appear here'
              style={styles.emptySubtext}
            />
          </View>
        )}
      />
    </ContainerComponent>
  );
};

const getStatusColor = (status: Upload['status']): string => {
  switch (status) {
    case 'completed':
      return '#4CAF50';
    case 'pending':
      return '#FFC107';
    case 'failed':
      return '#DC2626';
    default:
      return '#9CA3AF';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  listContainer: {
    padding: spacing.PADDING_16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.PADDING_20,
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: spacing.RADIUS_12,
    padding: spacing.PADDING_16,
  },
  elevation: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: spacing.PADDING_12,
    paddingVertical: spacing.PADDING_6,
    borderRadius: spacing.RADIUS_8,
    marginRight: spacing.PADDING_12,
  },
  badgeText: {
    fontSize: textScale(12),
    fontWeight: '600',
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: textScale(14),
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: spacing.MARGIN_4,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.MARGIN_4,
  },
  uploadDate: {
    fontSize: textScale(14),
    color: '#6B7280',
  },
  fileSize: {
    fontSize: textScale(14),
    color: '#6B7280',
    marginLeft: spacing.MARGIN_4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: spacing.WIDTH_8,
    height: spacing.WIDTH_8,
    borderRadius: spacing.WIDTH_8/2,
    marginRight: spacing.MARGIN_6,
  },
  statusText: {
    fontSize: textScale(14),
    color: '#4B5563',
    textTransform: 'capitalize',
  },
  deleteButton: {
    marginLeft: spacing.MARGIN_12,
    paddingVertical: spacing.PADDING_6,
    paddingHorizontal: spacing.PADDING_12,
  },
  deleteText: {
    color: '#DC2626',
    fontSize: textScale(14),
    fontWeight: '500',
  },
  separator: {
    height: spacing.HEIGHT_12,
  },
  emptyContainer: {
    padding: spacing.PADDING_24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: textScale(18),
    fontWeight: '600',
    color: '#374151',
    marginBottom: spacing.MARGIN_8,
  },
  emptySubtext: {
    fontSize: textScale(14),
    color: '#6B7280',
  },
  loadingText: {
    marginTop: spacing.PADDING_12,
    fontSize: textScale(16),
    color: '#6B7280',
  },
  errorText: {
    fontSize: textScale(16),
    color: '#DC2626',
    marginBottom: spacing.MARGIN_16,
  },
  retryButton: {
    paddingHorizontal: spacing.PADDING_24,
    paddingVertical: spacing.PADDING_12,
    backgroundColor: '#0066CC',
    borderRadius: spacing.RADIUS_8,
  },
  retryText: {
    color: '#FFFFFF',
    fontSize: textScale(16),
    fontWeight: '600',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: spacing.MARGIN_10,
    flexDirection:"row",
    alignItems:"center"
  },
});
export default Reminders;