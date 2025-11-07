import { Alert } from "react-native";

export const showAlert = (title, message) => {
  return new Promise((resolve) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: "OK",
          onPress: () => resolve(true), // Khi nhấn OK thì resolve Promise
        },
      ],
      { cancelable: false } // Không cho đóng bằng cách nhấn ra ngoài
    );
  });
};
