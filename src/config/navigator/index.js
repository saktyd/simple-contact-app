import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {ContactDetail, ContactList, UpdateContact} from '../../screens';
import {colors, fontSizes} from '../../styles';

const Stack = createStackNavigator();

export default () => {
  const defaultHeader = {
    headerShown: true,
    headerBackVisible: true,
    headerTitleAlign: 'center',
    headerTintColor: colors.purple,
    headerBackTitle: '',
    headerTitleStyle: {
      color: colors.purple,
      fontSize: fontSizes.large,
      fontWeight: 'bold',
    },
  };
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        presentation: 'card',
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
            route.params.type === 'create' ? 'Create Contact' : 'Edit Contact',
          ...defaultHeader,
        })}
      />
    </Stack.Navigator>
  );
};
