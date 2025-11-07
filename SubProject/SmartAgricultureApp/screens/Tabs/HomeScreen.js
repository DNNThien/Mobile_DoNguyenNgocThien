import { StyleSheet, View, Text } from "react-native";

const tmp = 30;
const hum = 40;
const lux = 100;
const som = 45;

export default function HomeScreen({ route, navigation }) {
  const idToken = route.params.idToken;
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
