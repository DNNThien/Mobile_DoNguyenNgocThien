import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GetDataMockAPI from './components/GetDataMockAPI.js';
import MainScreen from './components/MainScreen.js';
import ChooseColor from './components/ChooseColor.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Load data" component={GetDataMockAPI} />
        <Stack.Screen name="Main Screen" component={MainScreen} />
        <Stack.Screen name="Choose Color" component={ChooseColor} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
