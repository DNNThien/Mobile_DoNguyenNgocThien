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
  ScrollView,
} from "react-native";
import TermsContent from "../assets/documents/Terms";

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [confirmTerm, setConfirmTerm] = useState(false);
  const [showTermsContent, setShowTermsContent] = useState(false);

  const ResetTextInput = useCallback(() => {
    setName("");
    setSex("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setShowTermsContent(false);
    setConfirmTerm(false);
  }, [
    name,
    setName,
    sex,
    setSex,
    email,
    setEmail,
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

          {/**Name */}
          <View style={styles.subEnterInforContainer}>
            <Ionicons name="person" size={24} color={"grey"} />
            <TextInput
              style={styles.textInputContainer}
              value={name}
              onChangeText={setName}
              placeholder="Name"
              keyboardType="default"
              maxLength={20}
            />
          </View>

          {/**Sex */}
          <View style={styles.subEnterSexContainer}>
            <TouchableOpacity
              style={styles.sexContainer}
              onPress={() => setSex("male")}
            >
              <Ionicons
                name={sex === "male" ? "male" : "male-outline"}
                size={24}
                color={sex === "male" ? "tomato" : "grey"}
              />
              <Text
                style={{
                  marginLeft: 10,
                  fontWeight: sex === "male" && "bold",
                  color: sex === "male" ? "tomato" : "grey",
                }}
              >
                Male
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sexContainer}
              onPress={() => setSex("female")}
            >
              <Ionicons
                name={sex === "female" ? "female" : "female-outline"}
                size={24}
                color={sex === "female" ? "tomato" : "grey"}
              />
              <Text
                style={{
                  marginLeft: 10,
                  fontWeight: sex === "female" && "bold",
                  color: sex === "female" ? "tomato" : "grey",
                }}
              >
                Female
              </Text>
            </TouchableOpacity>
          </View>

          {/**Email */}
          <View style={styles.subEnterInforContainer}>
            <Ionicons name="mail" size={24} color={"grey"} />
            <TextInput
              style={styles.textInputContainer}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              keyboardType="email-address"
            />
            {email.trim() && !email.endsWith("@gmail.com") && (
              <Ionicons name="alert" color={"red"} size={24} />
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

          {/**Content Terms */}
          {showTermsContent && (
            <View style={{ height: 210, width: 300 }}>
              <ScrollView>
                <TermsContent />
              </ScrollView>
            </View>
          )}

          {/**Confirm Terms */}
          <View style={styles.termContainer}>
            <TouchableOpacity onPress={() => setConfirmTerm(!confirmTerm)}>
              <Ionicons
                name={confirmTerm ? "checkbox-outline" : "square-outline"}
                size={24}
                color={"grey"}
              />
            </TouchableOpacity>
            <Text style={{ marginLeft: 10, color: "grey" }}>
              I agree to the{" "}
            </Text>
            <Text
              style={{ color: "blue" }}
              onPress={() => setShowTermsContent(!showTermsContent)}
            >
              Terms and Conditions.
            </Text>
          </View>

          {/**Sign Up Button */}
          <TouchableOpacity
            style={[
              styles.buttonContainer,
              {
                backgroundColor:
                  name.trim() &&
                  sex.trim() &&
                  email.trim() &&
                  email.endsWith("@gmail.com") &&
                  password.trim() &&
                  confirmPassword.trim() &&
                  password === confirmPassword &&
                  confirmTerm
                    ? "green"
                    : "grey",
                marginTop: showTermsContent ? 10 : 50,
              },
            ]}
            disabled={
              name.trim() &&
              sex.trim() &&
              email.trim() &&
              email.endsWith("@gmail.com") &&
              password.trim() &&
              confirmPassword.trim() &&
              password === confirmPassword &&
              confirmTerm
                ? false
                : true
            }
            onPress={() => navigation.navigate("VerifyOTP", { email: email })}
          >
            <Text style={styles.buttonContent}>Sign Up</Text>
          </TouchableOpacity>

          {/**Go to Login */}
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
  subEnterSexContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    width: 300,
  },
  sexContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: "48%",
    borderBottomWidth: 2,
    borderBottomColor: "grey",
  },
  termContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 300,
  },
  textInputContainer: {
    flex: 1,
    marginLeft: 10,
    height: 50,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
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
