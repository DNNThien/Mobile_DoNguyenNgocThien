import React, { useState } from "react";
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
import { deleteAccountSendOtp } from "../../../../components/UserAPI";
import { showAlert } from "../../../../components/ShowAlert";

export default function DeleteAccountScreen({ route, navigation }) {
  const idToken = route.params.idToken;
  const email = route.params.email;
  const [loading, setLoading] = useState(false);
  const [verifyText, setVerifyText] = useState("");

  const printLog = (title, message) => {
    console.log("DeleteAccountScreen: ", title, message);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const result = await deleteAccountSendOtp(idToken, email);
      printLog("Result send OTP for delete account: ", result);
      if (result.success) {
        setLoading(false);
        navigation.navigate("VerifyOTP", {
          purpose: "delete-account",
          idToken: idToken,
          email: email,
        });
      } else {
        setLoading(false);
        showAlert("Warning", result.message);
      }
    } catch (err) {
      setLoading(false);
      showAlert("Notification", "Send OTP failed!");
      printLog("Error: ", err.message);
    }
  };
  return (
    <View style={styles.container}>
      {/**Header */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../../../assets/pictures/DeleteAccount.png")}
          style={{ height: 300, width: 350 }}
        />
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 1,
            left: 1,
            marginTop: 10,
            marginLeft: 20,
          }}
        >
          <Ionicons name="arrow-back" size={28} />
        </TouchableOpacity>
      </View>

      {/**Verify delete account */}
      {/**Re-enter email */}
      <View
        style={{ margin: 20, justifyContent: "center", alignItems: "center" }}
      >
        <Text>
          Please type the following text in the field below to confirm:
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginVertical: 10,
          }}
        >
          {email}
        </Text>
        <View style={styles.subEnterInforContainer}>
          <Ionicons name="document-text-outline" size={24} color={"grey"} />
          <TextInput
            style={styles.textInputContainer}
            value={verifyText}
            onChangeText={setVerifyText}
            placeholder="Confirm delete account"
            keyboardType="default"
          />
        </View>

        <TouchableOpacity
          style={[
            styles.buttonContainer,
            { backgroundColor: verifyText === email ? "red" : "grey" },
          ]}
          disabled={verifyText === email ? false : true}
          onPress={() => handleDelete()}
        >
          {loading ? (
            <ActivityIndicator size={"large"} color={"white"} />
          ) : (
            <Text style={styles.buttonContent}>Delete</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonContainer, { backgroundColor: "white" }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.buttonContent, { color: "black" }]}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginVertical: 10,
    height: 55,
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
