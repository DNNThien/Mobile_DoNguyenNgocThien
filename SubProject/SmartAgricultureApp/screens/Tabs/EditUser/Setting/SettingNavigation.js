import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingOptionScreen from "./SettingOptionScreen";
import DeleteAccountScreen from "./DeleteAccountScreen";

const Stack = createNativeStackNavigator();

export default function SettingNavigation({ route, navigation }) {
  const { idToken, email } = route.params;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="SettingOptionScreen"
        component={SettingOptionScreen}
        initialParams={{ idToken: idToken, email: email }}
      />
      <Stack.Screen
        name="DeleteAccountScreen"
        component={DeleteAccountScreen}
        initialParams={{ idToken: idToken, email: email }}
      />
    </Stack.Navigator>
  );
}
