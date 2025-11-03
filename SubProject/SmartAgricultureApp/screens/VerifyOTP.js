import React, { useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";

export default function VerifyOTP({ route, navigation }) {
  const { email } = route.params;
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);

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

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/pictures/OTPVerification.png")}
        style={{ height: 350, width: 400 }}
      />
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

      <TouchableOpacity
        style={[
          styles.buttonContainer,
          { backgroundColor: otp.join("").length === 6 ? "green" : "grey" },
        ]}
        disabled={otp.join("").length === 6 ? false : true}
        onPress={() => navigation.navigate("TabsView")}
      >
        <Text style={[styles.buttonContent, { color: "white" }]}>Verify</Text>
      </TouchableOpacity>

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
