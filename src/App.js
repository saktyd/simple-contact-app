import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import Navigator from './config/navigator';
import {Provider} from 'react-redux';
import reduxsStore from './config/redux/store';
import {navigationRef} from './config/navigator/rootNavigator';

const App = () => {
  return (
    <Provider store={reduxsStore}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <NavigationContainer ref={navigationRef}>
          <Navigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
