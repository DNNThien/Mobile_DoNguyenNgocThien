import React, { useRef, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";

export default function EnterOTP({ route, navigation }) {
  const { email } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
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
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Image
            style={{ height: 150, width: 200 }}
            source={require("../assets/pictures/OTPVerification.png")}
            resizeMode="cover"
          />

          {/**Title */}
          <View style={{ width: "100%" }}>
            <Text
              style={{ fontSize: 24, fontWeight: "bold", marginVertical: 10 }}
            >
              OTP Verification
            </Text>
            <Text style={{ fontSize: 14 }}>Enter the OTP sent to</Text>
            <Text
              style={{
                marginVertical: 5,
                fontSize: 14,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {email}
            </Text>
          </View>

          {/**Enter code */}
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
              {
                backgroundColor: otp.join("").length === 6 ? "green" : "grey",
              },
            ]}
            disabled={otp.join("").length === 6 ? false : true}
            onPress={() => {
              setModalVisible(false);
              setOtp(["", "", "", "", "", ""]);
            }}
          >
            <Text style={[styles.buttonContent, { color: "white" }]}>
              Verify
            </Text>
          </TouchableOpacity>

          {/**Cancel button */}
          <TouchableOpacity
            style={[styles.buttonContainer, { backgroundColor: "white" }]}
            onPress={() => {
              setModalVisible(false);
              navigation.goBack();
            }}
          >
            <Text style={[styles.buttonContent, { color: "black" }]}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(217,217,217,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    alignItems: "center",
    width: "80%",
    padding: 20,
    borderRadius: 10,
    elevation: 10,
    backgroundColor: "white",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
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
    margin: 10,
    height: 50,
    width: "100%",
    borderRadius: 25,
    elevation: 10,
  },
  buttonContent: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
