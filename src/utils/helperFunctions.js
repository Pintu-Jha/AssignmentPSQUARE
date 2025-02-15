import {Alert, Linking} from 'react-native';
import NavigationService from '../NavigationServies';
// import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';



//NAVIGATION FUNCTIONS
export const navigate = (routeName, params) => {
  NavigationService.navigate(routeName, params);
};

export const replace = (routeName, params) => {
  NavigationService.replace(routeName, params);
};

export const goBack = () => {
  NavigationService.back();
};

export const openDrawer = () => {
  NavigationService.openDrawer();
};

export const closeDrawer = () => {
  NavigationService.closeDrawer();
};

export const clearStack = (routeName, params = {}) => {
  NavigationService.clearStack(routeName, params);
};

export const push = (routeName, params = {}) => {
  NavigationService.push(routeName, params);
};

export const forceNavigate = (navigation, routeName) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: routeName }],
    }),
  );
};

export const isPhoneNumber = message => {
  // Extract all possible phone numbers from the message using a regex pattern
  const possibleNumbers = message.match(/\d+/g);

  if (!possibleNumbers) return false; // If no numbers found, return false

  // Loop through all extracted numeric strings to find a valid phone number
  for (let number of possibleNumbers) {
    // Strip out non-numeric characters from the number
    let cleanedMessage = number.replace(/[^\d]/g, '');

    // If the number starts with '91' and has more than 10 digits, remove the '91' prefix
    if (
      (cleanedMessage.length > 10 && cleanedMessage.startsWith('91')) ||
      cleanedMessage.startsWith('+91')
    ) {
      cleanedMessage = cleanedMessage.slice(2); // Remove the first 2 characters (91)
    }

    // Check if the cleaned message contains exactly 10 digits
    const phonePattern = /^\d{10}$/;
    if (phonePattern.test(cleanedMessage)) {
      return cleanedMessage; // Return the valid phone number if found
    }
  }

  return false; // Return false if no valid phone number is found
};

// Helper function to check if the message is a URL
export const isValidURL = message => {
  const urlPattern = new RegExp(
    '^(https?:\\/\\/)?' + // Protocol (optional)
      '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,})' + // Domain
      '(\\:\\d+)?(\\/[-a-zA-Z\\d%@_.~+&:]*)*' + // Port and path (optional)
      '(\\?[;&a-zA-Z\\d%@_.,~+&:=-]*)?' + // Query string (optional)
      '(\\#[-a-zA-Z\\d_]*)?$', // Fragment (optional)
  );
  return urlPattern.test(message.trim());
};

// Function to open the phone dialer
export const openPhoneDialer = async phoneNumber => {
  try {
    let formattedNumber = phoneNumber.trim();
    // Ensure the phone number starts with +91 (India country code)
    if (!formattedNumber.startsWith('91')) {
      formattedNumber = '+91' + formattedNumber;
    }
    const url = `tel:${formattedNumber}`;
    if (url) {
      await Linking.openURL(url);
    } else {
      Alert.alert(
        'Unable to open dialer',
        `Can't handle phone number: ${formattedNumber}`,
      );
    }
  } catch (err) {
    console.error('An error occurred', err);
    Alert.alert('Error', 'An error occurred while trying to open the dialer.');
  }
};

// Function to open a link in the browser
export const openLink = async url => {
  try {
    let formattedURL = url.trim();
    if (
      !formattedURL.startsWith('http://') &&
      !formattedURL.startsWith('https://')
    ) {
      formattedURL = 'https://' + formattedURL;
    }

    if (formattedURL) {
      await Linking.openURL(formattedURL);
    } else {
      Alert.alert('Unable to open URL', `Can't handle URL: ${formattedURL}`);
    }
  } catch (err) {
    console.error('An error occurred', err);
    Alert.alert('Error', 'An error occurred while trying to open the URL.');
  }
};

// Function to open a prompt for the user to choose the action
export const promptUserAction = content => {
  Alert.alert(
    'Choose Action',
    'What would you like to do with this content?',
    [
      {
        text: 'Open in Browser',
        onPress: () => openLink(content),
      },
      {
        text: 'Call this Number',
        onPress: () => openPhoneDialer(content),
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ],
    {cancelable: true},
  );
};

export const isImageAttachment = attachment => {
  // console.log("attachment",attachment);

  const imageExtensions = ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp'];
  return imageExtensions.some(ext => attachment?.toLowerCase().endsWith(ext));
};

export const isVideoAttachment = attachment => {
  const videoExtensions = ['.mp4', '.mov', '.avi', '.wmv', '.flv', '.mkv'];
  return videoExtensions.some(ext => attachment?.toLowerCase().endsWith(ext));
};

export const CommonToastMessage = (type, message, description = '') => {
  Toast.show({
    type: type, // 'success', 'error', or 'info'
    text1: message,
    text2: description,
    position: 'top',
    visibilityTime: 2000,
    autoHide: true,
    topOffset: 50,
    // swipeable:true
  });
};

export function convertDateFormat(dateStr) {
  // Check if the dateStr is null, undefined, or empty
  if (!dateStr) return;
  // Split the input date string into components
  const [year, month, day] = dateStr.split('-');
  // Return the reformatted date
  return `${day}-${month}-${year}`;
}

export const truncateText = (text, charLimit) => {
  if (text?.length > charLimit) {
    return text?.slice(0, charLimit) + '...';
  }
  return text;
};

export const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{borderLeftColor: '#28a745'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
      }}
      text2Style={{
        fontSize: 14,
        color: '#4B5563',
      }}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      style={{borderLeftColor: '#FF6F61'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
      }}
      text2Style={{
        fontSize: 14,
        color: '#4B5563',
      }}
    />
  ),
  info: props => (
    <BaseToast
      {...props}
      style={{borderLeftColor: '#1E90FF'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
      }}
      text2Style={{
        fontSize: 14,
        color: '#4B5563',
      }}
    />
  ),
};
