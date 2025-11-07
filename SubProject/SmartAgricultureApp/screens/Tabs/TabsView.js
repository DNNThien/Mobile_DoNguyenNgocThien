import { SafeAreaView } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import HomeScreen from "./HomeScreen";
import DashboardScreen from "./DashboardScreen";
import AdjustScreen from "./AdjustScreen";
import ChatBotScreen from "./ChatBotScreen";
import UserNavigation from "./EditUser/UserNavigation";

const Tabs = createBottomTabNavigator();

export default function TabsView({ route, navigation }) {
  const idToken = route.params.idToken;
  const email = route.params.email;
  return (
    <SafeAreaView style={styles.container}>
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => {
            let iconName;
            if (route.name === "HomeScreen") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "DashboardScreen") {
              iconName = focused ? "bar-chart" : "bar-chart-outline";
            } else if (route.name === "AdjustScreen") {
              iconName = focused ? "options" : "options-outline";
            } else if (route.name === "UserNavigation") {
              iconName = focused ? "people" : "people-outline";
            } else if (route.name === "ChatBotScreen") {
              iconName = "logo-google";
            }

            return <Ionicons name={iconName} size={20} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "grey",
          tabBarStyle: {
            height: 55,
            elevation: 0,
            backgroundColor: "white",
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",
          },
          headerShown: false,
          tabBarScrollEnabled: true,
        })}
      >
        <Tabs.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: "Home", tabBarLabel: "Home" }}
          initialParams={{ idToken, email }}
        />
        <Tabs.Screen
          name="DashboardScreen"
          component={DashboardScreen}
          options={{ title: "Dashboard", tabBarLabel: "Dashboard" }}
          initialParams={{ idToken, email }}
        />
        <Tabs.Screen
          name="AdjustScreen"
          component={AdjustScreen}
          options={{ title: "Adjust", tabBarLabel: "Adjust" }}
          initialParams={{ idToken, email }}
        />
        <Tabs.Screen
          name="ChatBotScreen"
          component={ChatBotScreen}
          options={{ title: "Chat", tabBarLabel: "Chat" }}
        />
        <Tabs.Screen
          name="UserNavigation"
          component={UserNavigation}
          options={{ title: "User", tabBarLabel: "User" }}
          initialParams={{ idToken, email }}
        />
      </Tabs.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
