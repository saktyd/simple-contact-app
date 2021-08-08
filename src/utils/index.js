import NetInfo from '@react-native-community/netinfo';
import Snackbar from 'react-native-snackbar';
import {colors} from '../styles';

export const catchError = async error => {
  const isConnected = await NetInfo.fetch().then(state => state.isConnected);
  if (!isConnected) {
    setTimeout(() => {
      Snackbar.show({
        text: 'Check your internet connection',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: colors.greyDark,
      });
    }, 100);
  } else {
    const {status} = error;
    console.log('test');
    let message =
      status !== 0 ? 'Oops, Something Went Wrong' : 'Connection timed out.';
    setTimeout(() => {
      Snackbar.show({
        text: message,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: colors.greyDark,
      });
    }, 100);
  }
};
