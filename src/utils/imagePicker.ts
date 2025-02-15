import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';

export const pickDocument = async (): Promise<DocumentPickerResponse[] | null> => {
  try {
    const result = await DocumentPicker.pick({
      type: [DocumentPicker.types.images, DocumentPicker.types.pdf], // Allow images and PDFs
      allowMultiSelection: true, // Enable multiple selection
    });

    return result; // Return selected files
  } catch (error: any) {
    if (DocumentPicker.isCancel(error)) {
      console.log('User cancelled document picker');
    } else {
      console.error('Document picker error:', error);
    }
    return null;
  }
};
