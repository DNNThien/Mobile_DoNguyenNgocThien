import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { auth } from "../assets/server/FirebaseConfig";
import {
  signupVerifyOtp,
  loginVerifyOtp,
  resetPasswordVerifyOtp,
  updateInfoVerifyOtp,
  changePasswordVerifyOtp,
  changePasswordUpdatePassword,
  deleteAccountVerifyOtp,
} from "../components/UserAPI";
import { showAlert } from "../components/ShowAlert";

export default function VerifyOTP({ route, navigation }) {
  const idToken = route.params.idToken;
  const purpose = route.params.purpose;
  const email = route.params.email;
  const password = route.params.password || route.params.newPassword;
  const name = route.params.name;
  const gender = route.params.gender;
  const acceptedTerms = route.params.acceptedTerms;
  const phoneNumber = route.params.phoneNumber;
  const birthday = route.params.birthday;
  const address = route.params.address;
  const country = route.params.country;
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);

  const printLog = (title, data) => {
    console.log("VerifyOTPScreen: ", title, data);
  };

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text[0] || "";
    setOtp(newOtp);

    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }
    if (!text && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    try {
      setLoading(true);
      if (purpose === "signup") {
        const response = await signupVerifyOtp(
          email,
          otp.join(""),
          password,
          name,
          gender,
          acceptedTerms
        );
        if (response.success) {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const idToken = await userCredential.user.getIdToken();
          showAlert("Notification", "Registration successful");
          setLoading(false);
          navigation.navigate("TabsView", { idToken: idToken, email: email });
        } else {
          setLoading(false);
          showAlert("Notification", "Registration failed");
          navigation.navigate("StartScreen");
        }
      } else if (purpose === "login") {
        const result = await loginVerifyOtp(email, otp.join(""));
        console.log("VerifyOTPScreen: Result verify OTP for login: ", result);
        if (result.success) {
          showAlert("Notification", "Login successfully");
          setLoading(false);
          navigation.navigate("TabsView", { idToken: idToken, email: email });
        } else {
          setLoading(false);
          showAlert("Notification", "Login failed");
        }
      } else if (purpose === "reset-password") {
        const result = await resetPasswordVerifyOtp(email, otp.join(""));
        printLog("Result verifyOTP for reset-password: ", result);
        if (result.success) {
          setLoading(false);
          navigation.navigate("ResetPassword", { email });
        } else {
          setLoading(false);
        }
      } else if (purpose === "update-infor") {
        const result = await updateInfoVerifyOtp(
          idToken,
          email,
          otp.join(""),
          name,
          gender,
          phoneNumber,
          birthday,
          address,
          country
        );
        printLog("Result", result);
        setLoading(false);
        if (result.success) {
          setLoading(false);
          showAlert("Notification", "Update successfully!");
          navigation.navigate("TabsView", {
            idToken: idToken,
            email: email,
            screen: "UserNavigation",
            params: { idToken: idToken, email: email },
          });
        } else {
          setLoading(false);
          showAlert("Notification", "Update unsuccessfully!");
          navigation.goBack();
        }
      } else if (purpose === "change-password") {
        let result = await changePasswordVerifyOtp(
          idToken,
          email,
          otp.join("")
        );
        printLog("Result verify OTP for change password: ", result);
        if (result.success) {
          result = await changePasswordUpdatePassword(idToken, email, password);
          if (result.success) {
            showAlert("Notification", "Change password successfully!");
            setLoading(false);
            navigation.navigate("TabsView", {
              idToken: idToken,
              email: email,
              screen: "UserInformationScreen",
              params: { idToken: idToken, email: email },
            });
          } else {
            setLoading(false);
            showAlert("Notification", "Change password unsuccessfully!");
          }
        } else {
          setLoading(false);
          showAlert("Notification", "OTP invalid or expired");
        }
      } else if (purpose === "delete-account") {
        const result = await deleteAccountVerifyOtp(
          idToken,
          email,
          otp.join("")
        );
        if (result.success) {
          setLoading(false);
          await showAlert("Notification", "Delete account successfully!");
          navigation.navigate("StartScreen");
        } else {
          setLoading(false);
          showAlert("Notification", "Delete account unsuccessfully!");
        }
      }
    } catch (err) {
      setLoading(false);
      printLog("Error: ", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/pictures/OTPVerification.png")}
        style={{ height: 350, width: 400 }}
      />

      {/**Title */}
      <View style={{ width: "80%" }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
          OTP Verification
        </Text>
        <Text style={{ fontSize: 16 }}>Enter the OTP sent to</Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
            marginVertical: 5,
          }}
        >
          {email}
        </Text>
      </View>

      {/**Enter OTP */}
      <View style={styles.otpContainer}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputs.current[index] = el)}
            value={value}
            onChangeText={(text) => handleChange(text, index)}
            keyboardType="number-pad"
            maxLength={1}
            style={styles.input}
            autoFocus={index === 0}
          />
        ))}
      </View>

      {/**Verify button */}
      <TouchableOpacity
        style={[
          styles.buttonContainer,
          { backgroundColor: otp.join("").length === 6 ? "green" : "grey" },
        ]}
        disabled={otp.join("").length === 6 ? false : true}
        onPress={() => handleVerify()}
      >
        {loading ? (
          <ActivityIndicator size={"large"} color="white" />
        ) : (
          <Text style={[styles.buttonContent, { color: "white" }]}>Verify</Text>
        )}
      </TouchableOpacity>

      {/**Cancel button */}
      <TouchableOpacity
        style={[styles.buttonContainer, { backgroundColor: "white" }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={[styles.buttonContent, { color: "black" }]}>Cancel</Text>
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
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 2,
    borderColor: "grey",
    width: 40,
    height: 50,
    textAlign: "center",
    fontSize: 20,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    height: 50,
    width: "80%",
    borderRadius: 25,
    elevation: 10,
  },
  buttonContent: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
