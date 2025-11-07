import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { checkEmailExists, resetPasswordSendOtp } from "../components/UserAPI";
import { showAlert } from "../components/ShowAlert";

export default function ForgetPassword({ route, navigation }) {
  const [loading, setLoading] = useState(false);
  const initialEmail = route.params.email || "";
  const [email, setEmail] = useState(initialEmail);

  const printLog = (title, data) => {
    console.log("ForgetPasswordScreen: ", title, data);
  };

  const handleSendCode = async () => {
    try {
      setLoading(true);
      const checkEmail = await checkEmailExists(email);
      printLog("Result check email: ", checkEmail);
      if (checkEmail.success) {
        const result = await resetPasswordSendOtp(email);
        printLog("Result send OTP for reset-password: ", result);
        setLoading(false);
        navigation.navigate("VerifyOTP", {
          purpose: "reset-password",
          email: email,
        });
      } else {
        showAlert("Notification", "Account not found");
        setLoading(false);
      }
    } catch (err) {
      printLog("Error: ", err);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          source={require("../assets/pictures/ForgetPassword.png")}
          style={{ height: 250, width: 400 }}
        />
        <TouchableOpacity
          style={{ position: "absolute", top: 1, left: 1, margin: 10 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={28} />
        </TouchableOpacity>
      </View>

      <View>
        <Text style={{ fontSize: 26, fontWeight: "bold", marginBottom: 10 }}>
          Forget your passowrd
        </Text>
        <Text>Please enter your email to send the reset code to it</Text>
      </View>

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

      <TouchableOpacity
        style={[
          styles.buttonContainer,
          {
            backgroundColor:
              email.trim() && email.endsWith("@gmail.com") ? "green" : "grey",
          },
        ]}
        disabled={email.trim() && email.endsWith("@gmail.com") ? false : true}
        onPress={() => handleSendCode()}
      >
        {loading ? (
          <ActivityIndicator size={"large"} color={"white"} />
        ) : (
          <Text style={styles.buttonContent}>Send code</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
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
    marginTop: 20,
    height: 50,
    width: 300,
    borderRadius: 25,
    elevation: 10,
  },
  buttonContent: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
