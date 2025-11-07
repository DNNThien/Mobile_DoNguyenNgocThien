import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { updateInfoSendOtp } from "../../../components/UserAPI";
import { showAlert } from "../../../components/ShowAlert";

export default function EditInformationScreen({ route, navigation }) {
  const {
    idToken,
    email,
    name,
    gender,
    birthday,
    phoneNumber,
    address,
    country,
  } = route.params;
  const [loading, setLoading] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newGender, setNewGender] = useState(gender);
  const [newBirthday, setNewBirthday] = useState(birthday);
  const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber);
  const [newAddress, setNewAddress] = useState(address);
  const [newCountry, setNewCountry] = useState(country);

  const printLog = (title, message) => {
    console.log("EditInformationScreen: ", title, message);
  };

  const handleChangeInformation = async () => {
    try {
      setLoading(true);
      const result = await updateInfoSendOtp(idToken, email);
      printLog("Result send OTP for update infor: ", result);
      if (result.success) {
        setLoading(false);
        printLog("Phone Number", newPhoneNumber);
        navigation.navigate("VerifyOTP", {
          idToken: idToken,
          purpose: "update-infor",
          email: email,
          name: newName,
          gender: newGender,
          phoneNumber: newPhoneNumber,
          birthday: newBirthday,
          address: newAddress,
          country: newCountry,
        });
      } else {
        setLoading(false);
        showAlert("Notification", "Send OTP failed!");
      }
    } catch (err) {
      setLoading(false);
      printLog("Error", err);
    }
  };
  return (
    <View style={styles.container}>
      {/**Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={{ position: "absolute", left: 1, marginLeft: 20 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={28} />
        </TouchableOpacity>
        <Text style={{ fontSize: 28, fontWeight: "bold" }}>
          Edit information
        </Text>
      </View>

      {/**Edit infor */}
      {/**Name */}
      <View style={styles.subEnterInforContainer}>
        <Ionicons name="person" size={24} color={"grey"} />
        <TextInput
          style={styles.textInputContainer}
          value={newName}
          onChangeText={setNewName}
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
          onPress={() => setNewGender("male")}
        >
          <Ionicons
            name={newGender === "male" ? "male" : "male-outline"}
            size={24}
            color={newGender === "male" ? "tomato" : "grey"}
          />
          <Text
            style={{
              marginLeft: 10,
              fontWeight: newGender === "male" && "bold",
              color: newGender === "male" ? "tomato" : "grey",
            }}
          >
            Male
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.genderContainer}
          onPress={() => setNewGender("female")}
        >
          <Ionicons
            name={newGender === "female" ? "female" : "female-outline"}
            size={24}
            color={newGender === "female" ? "tomato" : "grey"}
          />
          <Text
            style={{
              marginLeft: 10,
              fontWeight: newGender === "female" && "bold",
              color: newGender === "female" ? "tomato" : "grey",
            }}
          >
            Female
          </Text>
        </TouchableOpacity>
      </View>

      {/**Phone number */}
      <View style={styles.subEnterInforContainer}>
        <Ionicons name="call-outline" size={24} color={"grey"} />
        <TextInput
          style={styles.textInputContainer}
          value={newPhoneNumber}
          onChangeText={setNewPhoneNumber}
          placeholder="Phone number"
          keyboardType="numeric"
          maxLength={15}
        />
      </View>

      {/**Birthday */}
      <View style={styles.subEnterInforContainer}>
        <Ionicons name="calendar-outline" size={24} color={"grey"} />
        <TextInput
          style={styles.textInputContainer}
          value={newBirthday}
          onChangeText={(text) => {
            let cleaned = text.replace(/[^0-9]/g, "");
            if (cleaned.length >= 3 && cleaned.length <= 4) {
              cleaned = cleaned.slice(0, 2) + "/" + cleaned.slice(2);
            } else if (cleaned.length > 4) {
              cleaned =
                (cleaned.slice(0, 2) > 31 ? 31 : cleaned.slice(0, 2)) +
                "/" +
                (cleaned.slice(2, 4) > 12 ? 12 : cleaned.slice(2, 4)) +
                "/" +
                (cleaned.slice(4, 8) > 2025 ? 2025 : cleaned.slice(4, 8));
            }
            setNewBirthday(cleaned);
          }}
          placeholder="Birthday"
          keyboardType="numeric"
          maxLength={10}
        />
      </View>

      {/**Address */}
      <View style={styles.subEnterInforContainer}>
        <Ionicons name="location-outline" size={24} color={"grey"} />
        <TextInput
          style={styles.textInputContainer}
          value={newAddress}
          onChangeText={setNewAddress}
          placeholder="Address"
          keyboardType="default"
          autoCapitalize="words"
        />
      </View>

      {/**Country */}
      <View style={styles.subEnterInforContainer}>
        <Ionicons name="globe-outline" size={24} color={"grey"} />
        <TextInput
          style={styles.textInputContainer}
          value={newCountry}
          onChangeText={setNewCountry}
          placeholder="Country"
          keyboardType="default"
          autoCapitalize="words"
        />
      </View>

      {/**Change information button*/}
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => handleChangeInformation()}
      >
        {loading ? (
          <ActivityIndicator size={"large"} color={"white"} />
        ) : (
          <Text style={styles.buttonContent}>Change Information</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    width: "100%",
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
  textInputContainer: {
    flex: 1,
    marginLeft: 10,
    height: 50,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    height: 55,
    width: 300,
    borderRadius: 10,
    elevation: 10,
    backgroundColor: "green",
  },
  buttonContent: { fontSize: 18, fontWeight: "bold", color: "white" },
});
