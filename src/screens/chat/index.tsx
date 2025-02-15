import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { DocumentPickerResponse } from 'react-native-document-picker';
import Modal from 'react-native-modal';
import { useUploadFileMutation, useUploadLinkMutation } from '../../api/slices/uploadSlice';
import LeftArrowIcon from '../../assets/svg/LeftArrow';
import LocationIcon from '../../assets/svg/LocationIcon';
import UploadIcon from '../../assets/svg/UploadIcon';
import UploadLinkIcon from '../../assets/svg/UploadLinkIcon';
import ContainerComponent from '../../components/common/ContainerComponent';
import CustomButton from '../../components/common/CustomButton';
import CustomInput from '../../components/common/CustomInput';
import Header from '../../components/common/HeaderComponent';
import { PharmacyList } from '../../components/common/PharmacyCard';
import TextComponent from '../../components/common/TextComponent';
import { spacing } from '../../styles/spacing';
import { pickDocument } from '../../utils/imagePicker';

const Chat = () => {
  const [selectedFiles, setSelectedFiles] = useState<DocumentPickerResponse[]>([]);
  const [isLinkModalVisible, setLinkModalVisible] = useState(false);
  const [uploadLink, setUploadLink] = useState('');
  const [uploadFile, { isLoading }] = useUploadFileMutation();
  const [uploadLinkMutation, { isLoading: isUploadingLink }] = useUploadLinkMutation();

  const pharmacies = [
    {
      name: 'Path lab pharmacy',
      distance: '5km',
      rating: 4.5,
      reviews: 123,
      image: require('../../assets/image/image1.png'),
      onPress: () => console.log('Pharmacy 1 pressed'),
    },
    {
      name: '24 pharmacy',
      distance: '5km',
      rating: 4.3,
      reviews: 120,
      image: require('../../assets/image/image1.png'),
      onPress: () => console.log('Pharmacy 2 pressed'),
    },
  ];

  const handleFileUpload = async () => {
    try {
      const pickedFiles = await pickDocument();
      
      if (!pickedFiles || pickedFiles.length === 0) {
        return; // User cancelled or error occurred
      }
  
      setSelectedFiles(pickedFiles);
  
      const formData = new FormData();
      
      // If uploading a single file
      formData.append('file', {
        uri: pickedFiles[0].uri,
        type: pickedFiles[0].type || 'application/octet-stream',
        name: pickedFiles[0].name || `file.${pickedFiles[0].type?.split('/')[1] || 'unknown'}`,
      });
  
      const response = await uploadFile(formData).unwrap();
      Alert.alert('Success', 'File uploaded successfully');
    } catch (error) {
      Alert.alert(
        'Upload Failed',
        'There was an error uploading your file. Please try again.'
      );
      console.error('Upload error:', error);
    }
  };
  

  const handleLinkUpload = async () => {
    if (!uploadLink) {
      Alert.alert('Error', 'Please enter a valid prescription link');
      return;
    }
  
    try {
      const response = await uploadLinkMutation({ url: uploadLink }).unwrap();
      Alert.alert('Success', 'Prescription link uploaded successfully');
      setLinkModalVisible(false);
      setUploadLink('');
    } catch (error) {
      Alert.alert('Error', 'Failed to upload prescription link');
      console.error('Link upload error:', error);
    }
  };

  const handleContinue = () => {
    if (!selectedFiles.length && !uploadLink) {
      Alert.alert('Required', 'Please upload a prescription file or link first');
      return;
    }
    // Implement your continue logic here
  };

  return (
    <ContainerComponent>
      <Header
        leftItem={
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.backButton}>
              <LeftArrowIcon color="#000" size={48} />
            </TouchableOpacity>
            <LocationIcon width={32} height={26} color="" />
            <TextComponent text="Mohali" fontWeight={'500'} size={20} />
          </View>
        }
      />

      <TextComponent
        text="Pharmacy Nearby"
        fontWeight={'600'}
        size={20}
        lineHeight={38}
      />

      <View style={styles.pharmacyList}>
        <PharmacyList pharmacies={pharmacies} />
      </View>

      <TextComponent
        text="Upload Prescription"
        size={32}
        fontWeight={'500'}
        textAlign={'center'}
      />

      <TextComponent
        text="We will show the pharmacy that fits as per your prescription."
        size={20}
        fontWeight={'400'}
        textAlign={'center'}
      />

      <View style={styles.uploadContainer}>
      <TouchableOpacity 
          style={[styles.uploadOption, isUploadingLink && { opacity: 0.5 }]} 
          onPress={() => setLinkModalVisible(true)}
          disabled={isUploadingLink}
        >
              <UploadLinkIcon size={74} />
              <TextComponent text="Upload Link" fontWeight={'500'} size={20} />         
       </TouchableOpacity>

        <TouchableOpacity 
          style={styles.uploadOption} 
          onPress={handleFileUpload}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color="#41B592" />
          ) : (
            <>
              <UploadIcon size={74} />
              <TextComponent text="Upload File" fontWeight={'500'} size={20} />
            </>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.continueButtonContainer}>
        <CustomButton
          title="Continue"
          onPress={handleContinue}
          gradientColors={['#41B592', '#41B592']}
          textStyle={{ fontSize: 32 }}
        />
      </View>

      <Modal
        isVisible={isLinkModalVisible}
        onBackdropPress={() => setLinkModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <TextComponent
            text="Enter Prescription Link"
            size={20}
            fontWeight={'500'}
            textAlign={'center'}
          />
          <CustomInput
            placeholder='Enter prescription link here'
            value={uploadLink}
            onChangeText={setUploadLink}
            containerStyle={styles.input}
          />
          <CustomButton
            title="Upload Link"
            onPress={handleLinkUpload}
            gradientColors={['#41B592', '#41B592']}
            textStyle={{ fontSize: 20 }}
            loading={isUploadingLink}
          />
        </View>
      </Modal>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: spacing.MARGIN_10,
  },
  pharmacyList: {
    marginTop: spacing.MARGIN_16,
  },
  uploadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: spacing.PADDING_28,
    paddingHorizontal: spacing.PADDING_20,
    borderWidth: 0.5,
    borderColor: '#000000',
    borderRadius: 10,
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginVertical: spacing.MARGIN_16,
  },
  uploadOption: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  continueButtonContainer: {
    marginTop: spacing.MARGIN_72,
  },
  modal: {
    justifyContent: 'center',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: spacing.PADDING_20,
    borderRadius: 10,
    margin: spacing.MARGIN_20,
  },
  input: {
    padding: spacing.PADDING_10,
    marginVertical: spacing.MARGIN_16,
  },

  fileCount: {
    marginTop: spacing.MARGIN_8,
    color: '#41B592',
  },
});

export default Chat;