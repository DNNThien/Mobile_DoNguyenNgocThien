import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from "react-native";

export default function Index() {
  const serverURL = "http://10.27.192.191:3000/food";
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [foods, setFoods] = useState([]);
  const [nameFood, setNameFood] = useState("");
  const [priceFood, setPriceFood] = useState("");
  const [unitFood, setUnitFood] = useState("");
  const [typeFood, setTypeFood] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(serverURL);
      const data = await response.json();
      setFoods(data);
    } catch (err) {
      console.log("Error: ", err);
    } finally {
      setLoading(false);
    }
  }, [serverURL]);

  const addData = useCallback(async () => {
    if (
      !nameFood.trim() ||
      !priceFood.trim() ||
      !unitFood.trim() ||
      !typeFood.trim()
    ) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      const response = await fetch(serverURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameFood,
          price: priceFood,
          unit: unitFood,
          type: typeFood,
        }),
      });

      if (response.ok) {
        alert("Thêm thực phẩm thành công!");
        fetchData();
      } else alert("Thêm thực phẩm không thành công!");
      setNameFood("");
      setPriceFood("");
      setUnitFood("");
      setTypeFood("");
    } catch (err) {
      console.log("Error: ", err);
    }
  }, [nameFood, priceFood, typeFood, unitFood, serverURL, fetchData]);

  const updateData = useCallback(
    async (id) => {
      const data = {};
      if (nameFood.trim()) data.name = nameFood;
      if (priceFood.trim()) data.price = priceFood;
      if (unitFood.trim()) data.price = priceFood;
      if (typeFood.trim()) data.type = typeFood;

      console.log("Data: ", data);

      if (Object.keys(data).length === 0) {
        alert("Vui lòng nhập thông tin cần cập nhật!");
        return;
      }

      try {
        const response = await fetch(`${serverURL}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          alert(`Cập nhật sản phẩm #${id} thành công!`);
          fetchData();
        } else alert(`Cập nhật sản phẩm #${id} không thành công!`);
        setNameFood("");
        setPriceFood("");
        setUnitFood("");
        setTypeFood("");
      } catch (err) {
        console.log("Error: ", err);
      }
    },
    [nameFood, priceFood, typeFood, unitFood, serverURL, fetchData]
  );

  const deleteData = useCallback(
    async (id) => {
      try {
        const response = await fetch(`${serverURL}/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          alert(`Xóa sản phẩm #${id} thành công!`);
          fetchData();
        } else alert(`Xóa sản phẩm #${id} không thành công!`);
      } catch (err) {
        console.log("Error: ", err);
      }
    },
    [serverURL, fetchData]
  );

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      fetchData();
      setRefreshing(false);
    }, 1000);
  };

  const Item = React.memo(({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.inforItemContainer}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.name}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingRight: 20,
            }}
          >
            <Text style={{ color: "red" }}>
              {item.price}VND/{item.unit}
            </Text>
            <Text style={{ color: "blue" }}>{item.type}</Text>
          </View>
        </View>

        <View style={styles.buttonItemContainer}>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 30,
              width: 50,
              borderRadius: 10,
              elevation: 10,
              backgroundColor: "blue",
            }}
            onPress={() => updateData(item._id)}
          >
            <Text style={{ fontWeight: "bold", color: "white" }}>Sửa</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 30,
              width: 50,
              borderRadius: 10,
              elevation: 10,
              backgroundColor: "red",
            }}
            onPress={() => deleteData(item._id)}
          >
            <Text style={{ fontWeight: "bold", color: "white" }}>Xóa</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/**Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerContent}>App Food Manager</Text>
        </View>

        {/**Add Food */}
        <View style={styles.subContainer}>
          {/**Header */}
          <View style={styles.headerSubContainer}>
            <Text style={styles.headerSubContent}>Thêm sản phẩm</Text>
          </View>

          {/**Ener Infor */}
          <Text style={styles.title}>Tên thực phẩm</Text>
          <TextInput
            style={styles.textInput}
            value={nameFood}
            onChangeText={setNameFood}
            placeholder="Nhập tên thực phẩm..."
            keyboardType="default"
          />
          <Text style={styles.title}>Giá thực phẩm</Text>
          <TextInput
            style={styles.textInput}
            value={priceFood}
            onChangeText={setPriceFood}
            placeholder="Nhập giá thực phẩm..."
            keyboardType="numeric"
          />
          <Text style={styles.title}>Đơn vị</Text>
          <TextInput
            style={styles.textInput}
            value={unitFood}
            onChangeText={setUnitFood}
            placeholder="Nhập đơn vị thực phẩm..."
            keyboardType="default"
          />
          <Text style={styles.title}>Danh mục</Text>
          <TextInput
            style={styles.textInput}
            value={typeFood}
            onChangeText={setTypeFood}
            placeholder="Nhập danh mục thực phẩm..."
            keyboardType="default"
          />
          <TouchableOpacity
            style={styles.addButtonContainer}
            onPress={() => addData()}
          >
            <Text style={styles.addButtonContent}>Thêm thực phẩm</Text>
          </TouchableOpacity>
        </View>

        {/**List Foods */}
        <View style={[styles.subContainer, { flex: 1 }]}>
          {/**Header */}
          <View style={styles.headerSubContainer}>
            <Text style={styles.headerSubContent}>Danh sách sản phẩm</Text>
          </View>
          {loading ? (
            <View style={{ marginTop: 10, alignItems: "center" }}>
              <ActivityIndicator size={"large"} color={"blue"} />
              <Text>Đang tải dữ liệu.....</Text>
            </View>
          ) : (
            <FlatList
              data={foods}
              renderItem={({ item }) => <Item item={item} />}
              keyExtractor={(item) => item._id}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={["yellow"]}
                />
              }
            />
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    elevation: 10,
    backgroundColor: "white",
  },
  headerContainer: {
    padding: 10,
    borderBottomWidth: 5,
    borderBottomColor: "blue",
  },
  headerContent: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerSubContainer: {
    padding: 5,
    borderBottomWidth: 3,
    borderBottomColor: "grey",
  },
  headerSubContent: {
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  textInput: {
    height: 40,
    padding: 5,
    borderRadius: 10,
    elevation: 10,
    backgroundColor: "white",
  },
  addButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    height: 50,
    width: 200,
    borderRadius: 10,
    elevation: 10,
    backgroundColor: "green",
  },
  addButtonContent: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  itemContainer: {
    flexDirection: "row",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    elevation: 10,
    backgroundColor: "white",
  },
  inforItemContainer: {
    width: "65%",
  },
  buttonItemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
