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
  ActivityIndicator,
} from "react-native";
import { auth } from "../assets/server/FirebaseConfig";
import { checkEmailExists, loginSendOtp } from "../components/UserAPI";
import { showAlert } from "../components/ShowAlert";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const printLog = (title, data) => {
    console.log("LoginScreen: ", title, data);
  };

  const ResetTextInput = useCallback(() => {
    setEmail("");
    setPassword("");
  }, [email, setEmail, password, setPassword]);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const result = await checkEmailExists(email);
      if (!result.success && result.message === "Email not found") {
        showAlert("Notification", "Account not found");
        setLoading(false);
      } else if (result.message == "Email already exists") {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const idToken = await userCredential.user.getIdToken();
        printLog("Result check account: ", result);
        await loginSendOtp(email);
        setLoading(false);
        navigation.navigate("VerifyOTP", {
          idToken: idToken,
          purpose: "login",
          email: email,
          password: password,
        });
      }
    } catch (err) {
      setLoading(false);
      printLog("Error: ", err);
      console.log("Error Code: ", err.code);
      console.log("Error Message: ", err.message);
      console.log("--------------------");
      if (err.code === "auth/invalid-credential") {
        showAlert("Error", "Incorrect account information!");
      }
    }
  };

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
          {/**Header */}
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require("../assets/pictures/Logo.png")}
            />
            <Text style={styles.title}>Login into your Account</Text>
          </View>

          {/**Email */}
          <View style={[styles.subEnterInforContainer, { marginTop: 50 }]}>
            <Ionicons name="mail" size={24} color={"grey"} />
            <TextInput
              style={styles.textInputContainer}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {email.trim() && !email.endsWith("@gmail.com") && (
              <Ionicons name="alert" size={24} color={"red"} />
            )}
          </View>

          {/**Password */}
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

          {/**Login Button */}
          <TouchableOpacity
            style={[
              styles.buttonContainer,
              {
                backgroundColor:
                  email.trim() &&
                  email.endsWith("@gmail.com") &&
                  password.trim()
                    ? "green"
                    : "grey",
              },
            ]}
            disabled={
              email.trim() && email.endsWith("@gmail.com") && password.trim()
                ? false
                : true
            }
            onPress={() => handleLogin()}
          >
            {loading ? (
              <ActivityIndicator size={"large"} color={"white"} />
            ) : (
              <Text style={styles.buttonContent}>Log in</Text>
            )}
          </TouchableOpacity>

          {/**Forget password */}
          <View
            style={{
              width: 300,
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: 10,
            }}
          >
            <Text
              style={{ fontSize: 14, fontWeight: "bold", color: "green" }}
              onPress={() =>
                navigation.navigate("ForgetPassword", { email: email })
              }
            >
              Forget Password?
            </Text>
          </View>

          {/**Go to Sign Up */}
          <View
            style={{
              position: "absolute",
              bottom: 1,
              flexDirection: "row",
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 16 }}>Don't have an account? </Text>
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "green" }}
              onPress={() => navigation.navigate("SignUpScreen")}
            >
              Sign up
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
  },
  buttonContent: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
