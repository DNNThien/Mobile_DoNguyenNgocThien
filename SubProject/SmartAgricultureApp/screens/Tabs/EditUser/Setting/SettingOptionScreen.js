import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function SettingOptionScreen({ route, navigation }) {
  const idToken = route.params.idToken;
  const email = route.params.email;
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
        <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>
          Setting
        </Text>
      </View>

      {/**Setting Option */}
      {/**Delete account */}
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() =>
          navigation.navigate("DeleteAccountScreen", {
            idToken: idToken,
            email: email,
          })
        }
      >
        <Ionicons
          name="alert-circle-outline"
          size={24}
          style={{ marginHorizontal: 10 }}
        />
        <Text style={styles.buttonContent}>Delete account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
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
