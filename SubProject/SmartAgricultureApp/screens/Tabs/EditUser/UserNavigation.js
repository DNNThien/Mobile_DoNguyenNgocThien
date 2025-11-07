import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserInformationScreen from "./UserInformationScreen";
import EditInformationScreen from "./EditInformationScreen";
import ChangePasswordScreen from "./ChangePasswordScreen";
import SettingNavigation from "./Setting/SettingNavigation";

const Stack = createStackNavigator();

export default function UserNavigation({ route, navigation }) {
  const idToken = route.params.idToken;
  const email = route.params.email;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="UserInformationScreen"
        component={UserInformationScreen}
        initialParams={{ idToken: idToken, email: email }}
      />
      <Stack.Screen
        name="EditInformationScreen"
        component={EditInformationScreen}
        initialParams={{ idToken: idToken, email: email }}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        initialParams={{ idToken: idToken, email: email }}
      />
      <Stack.Screen
        name="SettingNavigation"
        component={SettingNavigation}
        initialParams={{ idToken: idToken, email: email }}
      />
    </Stack.Navigator>
  );
}
