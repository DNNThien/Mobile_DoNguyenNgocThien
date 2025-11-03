import { SafeAreaView } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import HomeScreen from "./HomeScreen";
import DashboardScreen from "./DashboardScreen";
import AdjustScreen from "./AdjustScreen";

const Tabs = createBottomTabNavigator();

export default function TabsView() {
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
        })}
      >
        <Tabs.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: "Home", tabBarLabel: "Home" }}
        />
        <Tabs.Screen
          name="DashboardScreen"
          component={DashboardScreen}
          options={{ title: "Dashboard", tabBarLabel: "Dashboard" }}
        />
        <Tabs.Screen
          name="AdjustScreen"
          component={AdjustScreen}
          options={{ title: "Adjust", tabBarLabel: "Adjust" }}
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
