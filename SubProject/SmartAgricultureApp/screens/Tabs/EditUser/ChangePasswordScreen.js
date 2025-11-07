import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { auth } from "../../../assets/server/FirebaseConfig";
import { changePasswordSendOtp } from "../../../components/UserAPI";
import { showAlert } from "../../../components/ShowAlert";

export default function ChangePasswordScreen({ route, navigation }) {
  const idToken = route.params.idToken;
  const email = route.params.email;
  const [loading, setLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(true);

  const printLog = (title, data) => {
    console.log("ChangePasswordScreen: ", title, data);
  };

  const handleApplyChange = async () => {
    try {
      setLoading(true);
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(user.email, oldPassword);
      await reauthenticateWithCredential(user, credential);
      const result = await changePasswordSendOtp(idToken, email, newPassword);
      printLog("Result send OTP for change password: ", result);
      if (result.success) {
        setLoading(false);
        navigation.navigate("VerifyOTP", {
          purpose: "change-password",
          idToken: idToken,
          email: email,
          newPassword: newPassword,
        });
      } else {
        setLoading(false);
        await showAlert("Notification", "Send OTP failed!");
      }
    } catch (err) {
      setLoading(false);
      showAlert("Warning", "Password incorrect!");
      printLog("Error: ", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: "100%", alignItems: "center" }}>
        <Image
          source={require("../../../assets/pictures/ChangePassword.png")}
          style={{ height: 250, width: 300 }}
        />
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 1,
            left: 1,
            marginTop: 10,
            marginLeft: 20,
          }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={28} color={"black"} />
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 5 }}>
          Change password
        </Text>
        <Text>Update password for enhanced account security</Text>
      </View>

      {/**Old password */}
      <View style={styles.subEnterInforContainer}>
        <Ionicons name="lock-closed" size={24} color={"grey"} />
        <TextInput
          style={styles.textInputContainer}
          value={oldPassword}
          onChangeText={setOldPassword}
          placeholder="Old Password"
          keyboardType="default"
          secureTextEntry={showOldPassword}
        />
        <TouchableOpacity
          style={{ position: "absolute", right: 1, marginRight: 10 }}
          onPress={() => setShowOldPassword(!showOldPassword)}
        >
          <Ionicons
            name={showOldPassword ? "eye" : "eye-off"}
            size={24}
            color={"grey"}
          />
        </TouchableOpacity>
      </View>

      {/**New password */}
      <View style={styles.subEnterInforContainer}>
        <Ionicons name="lock-closed" size={24} color={"grey"} />
        <TextInput
          style={styles.textInputContainer}
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="New Password"
          keyboardType="default"
          secureTextEntry={showNewPassword}
        />
        <TouchableOpacity
          style={{ position: "absolute", right: 1, marginRight: 10 }}
          onPress={() => setShowNewPassword(!showNewPassword)}
        >
          <Ionicons
            name={showNewPassword ? "eye" : "eye-off"}
            size={24}
            color={"grey"}
          />
        </TouchableOpacity>
      </View>

      {/**Confirm new password */}
      <View style={styles.subEnterInforContainer}>
        <Ionicons name="lock-closed" size={24} color={"grey"} />
        <TextInput
          style={styles.textInputContainer}
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
          placeholder="Confirm New Password"
          keyboardType="default"
          secureTextEntry={showConfirmNewPassword}
        />
        {newPassword.trim() && confirmNewPassword != newPassword && (
          <View style={{ position: "absolute", right: 1, marginRight: 30 }}>
            <Ionicons name="alert" size={24} color={"red"} />
          </View>
        )}
        <TouchableOpacity
          style={{ position: "absolute", right: 1, marginRight: 10 }}
          onPress={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
        >
          <Ionicons
            name={showConfirmNewPassword ? "eye" : "eye-off"}
            size={24}
            color={"grey"}
          />
        </TouchableOpacity>
      </View>

      {/**Apply Change Button */}
      <TouchableOpacity
        style={[
          styles.buttonContainer,
          {
            backgroundColor:
              oldPassword.trim() &&
              newPassword.trim() &&
              newPassword === confirmNewPassword
                ? "green"
                : "grey",
          },
        ]}
        disabled={
          oldPassword.trim() &&
          newPassword.trim() &&
          newPassword === confirmNewPassword
            ? false
            : true
        }
        onPress={() => handleApplyChange()}
      >
        {loading ? (
          <ActivityIndicator size={"large"} color={"white"} />
        ) : (
          <Text style={[styles.buttonContent, { color: "white" }]}>
            Apply Change
          </Text>
        )}
      </TouchableOpacity>

      {/**Cancel Button */}
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
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
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
    marginTop: 10,
    height: 50,
    width: 300,
    borderRadius: 25,
    elevation: 10,
  },
  buttonContent: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
