import DocumentPicker, { 
  DocumentPickerResponse,
  DocumentPickerOptions,
  types
} from 'react-native-document-picker';
import { Platform } from 'react-native';

interface FilePickerOptions {
  multiple?: boolean;
  maxSize?: number; // in bytes
}

export const pickDocument = async (options: FilePickerOptions = {}): Promise<DocumentPickerResponse[] | null> => {
  const { multiple = false, maxSize = 10 * 1024 * 1024 } = options; // Default 10MB limit

  const pickerOptions: DocumentPickerOptions = {
    type: [types.images, types.pdf],
    allowMultiSelection: multiple,
    copyTo: 'cachesDirectory', // This helps with file access
  };

  try {
    const results = await DocumentPicker.pick(pickerOptions);
    
    // Log picked file details for debugging
    console.log('Picked documents:', results.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type
    })));

    // Validate file types
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    const invalidFiles = results.filter(file => !validTypes.includes(file.type ?? ''));
    if (invalidFiles.length > 0) {
      throw new Error(`Invalid file type(s): ${invalidFiles.map(f => f.name).join(', ')}`);
    }

    // Validate file sizes
    const largeFiles = results.filter(file => (file.size ?? 0) > maxSize);
    if (largeFiles.length > 0) {
      throw new Error(`File(s) too large: ${largeFiles.map(f => f.name).join(', ')}`);
    }

    // Process URIs based on platform
    return results.map(file => ({
      ...file,
      uri: Platform.select({
        android: file.uri,
        ios: file.uri.replace('file://', ''),
        default: file.uri
      }),
      fileCopyUri: file.fileCopyUri // Keep the copied file URI if available
    }));

  } catch (error) {
    if (DocumentPicker.isCancel(error)) {
      console.log('User cancelled document picker');
      return null;
    }

    console.error('Document picker error:', {
      message: error instanceof Error ? error.message : String(error),
      code: (error as any).code,
      details: error
    });

    // Re-throw with more specific error message
    if (error instanceof Error && error.message.includes('file type')) {
      throw new Error('Please select only images (JPG, PNG) or PDF files');
    } else if (error instanceof Error && error.message.includes('too large')) {
      throw new Error('Files must be smaller than 10MB');
    } else {
      throw new Error('Failed to pick document. Please try again.');
    }
  }
};