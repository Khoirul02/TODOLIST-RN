/* eslint-disable prettier/prettier */
import {showMessage} from 'react-native-flash-message';

const FlashMessageManager = {
  successMessage: (message, description = '') => {
    showMessage({
      message: message,
      description: description,
      type: 'success',
      floating: true,
      color: '#FFFFFF',
      icon: 'success',
    });
  },
  errorMessage: (message, description = '') => {
    showMessage({
      message: message,
      description: description,
      floating: true,
      type: 'danger',
      color: '#FFFFFF',
      icon: 'danger',
    });
  },
  warningMessage: (message, description = '') => {
    showMessage({
      message: message,
      description: description,
      floating: true,
      type: 'warning',
      color: '#FFFFFF',
      icon: 'warning',
    });
  },
};

export {FlashMessageManager};
