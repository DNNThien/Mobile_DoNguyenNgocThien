import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

export default function StartScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.loginBackground}
        source={require("../assets/pictures/StartBackground.jpeg")}
        resizeMode="cover"
        blurRadius={1.5}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>SmartAgriculture</Text>
          <Text style={styles.sologan}>Farm at your fingertips</Text>
        </View>
        <View>
          <TouchableOpacity
            style={[styles.buttonContainer, { backgroundColor: "white" }]}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "green" }}>
              Log in
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonContainer,
              {
                flexDirection: "row",
                marginTop: 20,
                borderWidth: 1,
                borderColor: "white",
                backgroundColor: "rgba(217, 217, 217, 0.2)",
              },
            ]}
            onPress={() => navigation.navigate("SignUpScreen")}
          >
            <Text style={{ fontSize: 16, color: "white" }}>
              Don't have an Account?{" "}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  loginBackground: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    margin: 10,
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },
  sologan: {
    fontSize: 16,
    color: "white",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: 350,
    borderRadius: 30,
    elevation: 10,
  },
});
