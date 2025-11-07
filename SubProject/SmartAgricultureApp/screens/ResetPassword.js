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
import { updatePassword } from "../components/UserAPI";
import { showAlert } from "../components/ShowAlert";

export default function ResetPassword({ route, navigation }) {
  const { email } = route.params;
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const printLog = (title, data) => {
    console.log("ResetPasswordScreen: ", title, data);
  };

  const handleApplyChange = async () => {
    try {
      setLoading(true);
      const result = await updatePassword(email, password);
      printLog("Result update password: ", result);
      if (result.success) {
        await showAlert("Notification", "Password update successful");
        setLoading(false);
        navigation.navigate("LoginScreen");
      } else {
        await showAlert("Notification", "Password update unsuccessful");
        setLoading(false);
        navigation.navigate("StartScreen");
      }
    } catch (err) {
      printLog("Error: ", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: "100%", alignItems: "center" }}>
        <Image
          source={require("../assets/pictures/ResetPassword.png")}
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
          Reset password
        </Text>
        <Text>Please kindly set your new password</Text>
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

      {/**Confirm password */}
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
        {confirmPassword.trim() && confirmPassword != password && (
          <View style={{ position: "absolute", right: 1, marginRight: 30 }}>
            <Ionicons name="alert" size={24} color={"red"} />
          </View>
        )}
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

      {/**Apply Change Button */}
      <TouchableOpacity
        style={[
          styles.buttonContainer,
          {
            backgroundColor:
              password.trim() && password === confirmPassword
                ? "green"
                : "grey",
          },
        ]}
        disabled={
          password.trim() && password === confirmPassword ? false : true
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
        onPress={() => navigation.navigate("StartScreen")}
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
