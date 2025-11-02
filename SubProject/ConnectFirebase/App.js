// App.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { subscribeUsers, addUser } from "./components/UserService";

export default function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Subscribe realtime data
    const unsubscribe = subscribeUsers(setUsers);

    return () => unsubscribe(); // cleanup khi unmount
  }, []);

  const handleAddUser = () => {
    // Thêm 1 user mẫu
    addUser({
      name: "Nguyen Van New",
      email: "new@gmail.com",
    }).then(() => console.log("User added"));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách người dùng</Text>
      <Button title="Thêm user mới" onPress={handleAddUser} />
      <FlatList
        style={{ marginTop: 10 }}
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.name} - {item.email}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  item: { padding: 8, fontSize: 16, borderBottomWidth: 0.5 },
});
