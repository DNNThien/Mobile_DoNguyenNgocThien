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
  ActivityIndicator,
} from "react-native";
import TermsContent from "../assets/documents/Terms";
import { checkEmailExists, signupSendOtp } from "../components/UserAPI";
import { showAlert } from "../components/ShowAlert";

export default function SignUpScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTermsContent, setShowTermsContent] = useState(false);

  const ResetTextInput = useCallback(() => {
    setName("");
    setGender("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setShowTermsContent(false);
    setAcceptedTerms(false);
  }, [
    name,
    setName,
    gender,
    setGender,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
  ]);

  const handleSignUp = async () => {
    try {
      setLoading(true);
      const result = await checkEmailExists(email);
      console.log("SignUpScreen: Result check email: ", result);
      if (result.success) {
        showAlert("Information", result.message);
        setLoading(false);
      } else if (result.message === "Email not found") {
        await signupSendOtp(email);
        setLoading(false);
        navigation.navigate("VerifyOTP", {
          purpose: "signup",
          email: email,
          name: name,
          gender: gender,
          password: password,
          acceptedTerms: acceptedTerms,
        });
      }
    } catch (error) {
      setLoading(false);
      console.log("SignUpScreen: Error: ", error);
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
              autoCapitalize="words"
            />
          </View>

          {/**Gender */}
          <View style={styles.subEnterGenderContainer}>
            <TouchableOpacity
              style={styles.genderContainer}
              onPress={() => setGender("male")}
            >
              <Ionicons
                name={gender === "male" ? "male" : "male-outline"}
                size={24}
                color={gender === "male" ? "tomato" : "grey"}
              />
              <Text
                style={{
                  marginLeft: 10,
                  fontWeight: gender === "male" && "bold",
                  color: gender === "male" ? "tomato" : "grey",
                }}
              >
                Male
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.genderContainer}
              onPress={() => setGender("female")}
            >
              <Ionicons
                name={gender === "female" ? "female" : "female-outline"}
                size={24}
                color={gender === "female" ? "tomato" : "grey"}
              />
              <Text
                style={{
                  marginLeft: 10,
                  fontWeight: gender === "female" && "bold",
                  color: gender === "female" ? "tomato" : "grey",
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
              autoCapitalize="none"
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
            <TouchableOpacity onPress={() => setAcceptedTerms(!acceptedTerms)}>
              <Ionicons
                name={acceptedTerms ? "checkbox-outline" : "square-outline"}
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
                  gender.trim() &&
                  email.trim() &&
                  email.endsWith("@gmail.com") &&
                  password.trim() &&
                  confirmPassword.trim() &&
                  password === confirmPassword &&
                  acceptedTerms
                    ? "green"
                    : "grey",
                marginTop: showTermsContent ? 10 : 50,
              },
            ]}
            disabled={
              name.trim() &&
              gender.trim() &&
              email.trim() &&
              email.endsWith("@gmail.com") &&
              password.trim() &&
              confirmPassword.trim() &&
              password === confirmPassword &&
              acceptedTerms
                ? false
                : true
            }
            onPress={() => handleSignUp()}
          >
            {loading ? (
              <ActivityIndicator size={"large"} color={"white"} />
            ) : (
              <Text style={styles.buttonContent}>Sign Up</Text>
            )}
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
  subEnterGenderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    width: 300,
  },
  genderContainer: {
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
