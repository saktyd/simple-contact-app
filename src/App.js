import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {ContactDetail, ContactList, UpdateContact} from './screens';
import {colors, fontSizes} from './styles';

const Stack = createStackNavigator();

const App = () => {
  const defaultHeader = {
    headerShown: true,
    headerBackVisible: true,
    headerTitleAlign: 'center',
    headerTintColor: colors.purple,
    headerTitleStyle: {
      color: colors.purple,
      fontSize: fontSizes.medium,
      fontWeight: 'bold',
    },
  };
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid,
            presentation: 'transparentModal',
          }}>
          <Stack.Screen
            name="My Contact"
            component={ContactList}
            options={defaultHeader}
          />
          <Stack.Screen
            name="Contact Detail"
            component={ContactDetail}
            options={defaultHeader}
          />
          <Stack.Screen
            name="UpdateContact"
            component={UpdateContact}
            options={({route}) => ({
              headerTitle:
                route.params.type === 'create'
                  ? 'Create Contact'
                  : 'Edit Contact',
              ...defaultHeader,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
