import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Header from "../../components/Header";
import AccountInformationScreen from "./settings/AccountInformationScreen";

const Stack = createNativeStackNavigator();

function Settings({ navigation }) {
  return (
    <View style={styles.container}>
      <Header title="Setting" />
      <ScrollView>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate("AccountInformationScreen")}
        >
          <Text style={styles.buttonContent}>Account information</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonContent}>Update account information</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonContent}>Change password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}>
          <View style={{ position: "absolute", right: 1, marginRight: 10 }}>
            <Ionicons name="log-out" size={28} color={"red"} />
          </View>
          <Text style={[styles.buttonContent, { color: "red" }]}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default function SettingScreen({ route }) {
  const { idToken, email } = route.params;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen
        name="AccountInformationScreen"
        component={AccountInformationScreen}
        initialParams={{ idToken: idToken, email: email }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  buttonContainer: {
    justifyContent: "center",
    borderBottomWidth: 3,
    borderBottomColor: "grey",
    margin: 10,
    paddingHorizontal: 10,
    height: 55,
    width: 350,
    borderRadius: 10,
    elevation: 10,
    backgroundColor: "white",
  },
  buttonContent: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
