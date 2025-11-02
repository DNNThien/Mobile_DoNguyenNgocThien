import React, { useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const ResetTextInput = useCallback(() => {
    setEmail("");
    setUserName("");
    setPassword("");
    setConfirmPassword("");
  }, [
    email,
    setEmail,
    userName,
    setUserName,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
  ]);
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={{ height: "100%", width: "100%" }}
        source={require("../assets/pictures/StartBackground.jpeg")}
      >
        <TouchableOpacity
          style={styles.backButtonContainer}
          onPress={() => navigation.navigate("StartScreen")}
        >
          <Ionicons name="arrow-back" size={28} color={"white"} />
        </TouchableOpacity>
        <View style={styles.subContainer}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require("../assets/pictures/Logo.png")}
            />
            <Text style={styles.title}>Tell us about yourself</Text>
          </View>

          <View style={styles.subEnterInforContainer}>
            <Ionicons name="mail" size={24} color={"grey"} />
            <TextInput
              style={styles.textInputContainer}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.subEnterInforContainer}>
            <Ionicons name="person" size={24} color={"grey"} />
            <TextInput
              style={styles.textInputContainer}
              value={userName}
              onChangeText={setUserName}
              placeholder="Username"
              keyboardType="default"
            />
          </View>
          <View style={styles.subEnterInforContainer}>
            <Ionicons name="lock-closed" size={24} color={"grey"} />
            <TextInput
              style={styles.textInputContainer}
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              keyboardType="default"
              secureTextEntry={showPassword}
            />
            <TouchableOpacity
              style={{ position: "absolute", right: 1, marginRight: 10 }}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye" : "eye-off"}
                size={24}
                color={"grey"}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.subEnterInforContainer}>
            <Ionicons name="lock-closed" size={24} color={"grey"} />
            <TextInput
              style={styles.textInputContainer}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm Password"
              keyboardType="default"
              secureTextEntry={showConfirmPassword}
            />
            <TouchableOpacity
              style={{ position: "absolute", right: 1, marginRight: 10 }}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Ionicons
                name={showConfirmPassword ? "eye" : "eye-off"}
                size={24}
                color={"grey"}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => ResetTextInput()}
          >
            <Text style={styles.buttonContent}>Sign Up</Text>
          </TouchableOpacity>
          <View
            style={{
              position: "absolute",
              bottom: 1,
              marginBottom: 10,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16 }}>You already have an account? </Text>
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "green" }}
              onPress={() => navigation.navigate("LoginScreen")}
            >
              Go to Login
            </Text>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButtonContainer: {
    position: "absolute",
    top: 1,
    left: 1,
    marginLeft: 10,
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  subContainer: {
    position: "absolute",
    bottom: 1,
    alignItems: "center",
    height: "90%",
    width: "100%",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: "white",
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
    paddingRight: 30,
  },
  logo: {
    height: 75,
    width: 150,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
  subEnterInforContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    height: 50,
    width: 300,
    borderBottomWidth: 2,
    borderBottomColor: "grey",
  },
  textInputContainer: {
    flex: 1,
    marginLeft: 10,
    height: 50,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    height: 50,
    width: 300,
    borderRadius: 10,
    elevation: 10,
    backgroundColor: "green",
  },
  buttonContent: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
