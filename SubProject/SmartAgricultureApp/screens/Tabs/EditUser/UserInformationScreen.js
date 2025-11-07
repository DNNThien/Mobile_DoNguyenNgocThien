import React, { useEffect, useState, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { getUserData } from "../../../components/UserAPI";
import { auth } from "../../../assets/server/FirebaseConfig";
import { showAlert } from "../../../components/ShowAlert";

export default function UserInformationScreen({ route, navigation }) {
  const idToken = route.params.idToken;
  const email = route.params.email;
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");
  const [country, setCountry] = useState("Vietnam");

  const printLog = useCallback((title, content) => {
    console.log("UserInformationScreen:", title, content);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const result = await getUserData(idToken, email);
        if (result.success) {
          printLog("Result get user data:", result);
          setName(result.data.name);
          setGender(result.data.gender);
          setPhoneNumber(result.data.phoneNumber || null);
          setAddress(result.data.address || null);
          setBirthday(result.data.birthday || null);
          setCountry(result.data.country || "Vietnam");
        }
      } catch (err) {
        printLog("Error:", err);
      }
    };

    fetchUserData();
  }, [idToken, email]);

  const handleLogout = useCallback(async () => {
    try {
      await signOut(auth);
      printLog("Logout", "Successfully!");
      showAlert("Notification", "Logout Successfully!");
      navigation.navigate("LoginScreen");
    } catch (err) {
      printLog("Logout", "Unsuccessfully!");
      showAlert("Notification", "Logout Unsuccessfully!");
    }
  }, []);

  return (
    <View style={styles.container}>
      {/**Profile */}
      <View style={styles.profileContainer}>
        {/**Avt + name + gender */}
        <View style={{ flexDirection: "row", width: "100%" }}>
          <View style={styles.avtContainer}>
            <Image
              source={
                gender === "male"
                  ? require("../../../assets/pictures/AVTDefault.jpeg")
                  : require("../../../assets/pictures/AVTDefaultFemale.jpeg")
              }
              style={{ height: 120, width: 120, borderRadius: 60 }}
            />
          </View>
          <View style={{ justifyContent: "center", width: 150 }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                marginVertical: 10,
              }}
            >
              {name}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name={gender === "male" ? "male-outline" : "female-outline"}
                size={20}
              />
              <Text style={{ fontSize: 14, marginLeft: 10 }}>
                {gender === "male" ? "Male" : "Female"}
              </Text>
            </View>
          </View>
        </View>

        {/**Infor */}
        <View style={{ width: 300 }}>
          {/**Mail */}
          <View style={styles.inforContainer}>
            <Ionicons name="mail-outline" size={28} />
            <Text style={styles.inforContent}>{email}</Text>
          </View>

          {/**Birthday */}
          <View style={styles.inforContainer}>
            <Ionicons name="calendar-outline" size={28} />
            <Text style={styles.inforContent}>
              {birthday === null ? "None" : birthday}
            </Text>
          </View>

          {/**Phone number */}
          <View style={styles.inforContainer}>
            <Ionicons name="call-outline" size={28} />
            <Text style={styles.inforContent}>
              {phoneNumber === null ? "None" : phoneNumber}
            </Text>
          </View>

          {/**Location */}
          <View style={styles.inforContainer}>
            <Ionicons name="location-outline" size={28} />
            <Text style={styles.inforContent}>
              {address === null ? "None" : address}
            </Text>
          </View>

          {/**Country */}
          <View style={styles.inforContainer}>
            <Ionicons name="globe-outline" size={28} />
            <Text style={styles.inforContent}>{country}</Text>
            {country === "Vietnam" && (
              <Image
                source={require("../../../assets/pictures/VietnamFlag.png")}
                style={{ height: 25, width: 25, marginLeft: 10 }}
              />
            )}
          </View>
        </View>
      </View>

      {/**Edit profile */}
      <View style={{ flex: 1 }}>
        {/**Edit information */}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>
            navigation.navigate("EditInformationScreen", {
              idToken,
              email,
              name,
              gender,
              phoneNumber,
              birthday,
              address,
              country,
            })
          }
        >
          <Ionicons name="create-outline" size={28} />
          <Text style={styles.buttonContent}>Edit information</Text>
          <Ionicons name="chevron-forward-outline" size={28} />
        </TouchableOpacity>

        {/**Change password */}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate("ChangePasswordScreen")}
        >
          <Ionicons name="key-outline" size={28} />
          <Text style={styles.buttonContent}>Change password</Text>
          <Ionicons name="chevron-forward-outline" size={28} />
        </TouchableOpacity>

        {/**Setting */}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>
            navigation.navigate("SettingNavigation", {
              idToken: idToken,
              email: email,
            })
          }
        >
          <Ionicons name="settings-outline" size={28} />
          <Text style={styles.buttonContent}>Setting</Text>
          <Ionicons name="chevron-forward-outline" size={28} />
        </TouchableOpacity>

        {/**Log out button */}
        <TouchableOpacity
          style={[
            styles.buttonContainer,
            {
              position: "absolute",
              bottom: 1,
              marginBottom: 10,
              width: "95%",
              backgroundColor: "red",
            },
          ]}
          onPress={() => handleLogout()}
        >
          <Text style={[styles.buttonContent, { color: "white" }]}>
            Log out
          </Text>
          <Ionicons name="log-out-outline" size={28} color={"white"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  profileContainer: {
    alignItems: "center",
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomWidth: 3,
    borderBottomColor: "grey",
  },
  inforContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  inforContent: {
    marginLeft: 10,
    fontSize: 16,
  },
  avtContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 50,
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginVertical: 10,
    marginHorizontal: 10,
    height: 50,
    borderRadius: 10,
    elevation: 10,
    backgroundColor: "white",
  },
  buttonContent: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
