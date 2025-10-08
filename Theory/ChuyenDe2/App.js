import { useState, useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function Version1() {
  const serverURL = "http://localhost:3000/shoe";
  const [idShoe, setIdShoe] = useState("");
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(serverURL);
      const data = await response.json();
      setProducts(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(true);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);

  const addProduct = async () => {
    if (!idShoe || !name || !size || !price) {
      alert("Vui lòng nhập đủ thông tin");
      return;
    }
    if (quantity <= 0) {
      alert("Số lượng phải lớn hơn 0");
      return;
    }

    const exists = products.some((item) => item.idShoe === idShoe);
    if (exists) {
      alert("ID sản phẩm đã tồn tại");
      return;
    }

    try {
      const response = await fetch(serverURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idShoe: idShoe,
          name: name,
          size: size,
          price: price,
          quantity: quantity,
        }),
      });
      if (response.ok) {
        fetchData();
        alert("Thêm sản phẩm thành công");
        const result = await response.json();
        console.log(result);
      } else {
        alert("Thêm sản phẩm thất bại");
        const result = await response.json();
        console.log(result);
      }
    } catch (err) {
      console.log("Error: ", response.status);
    }
  };

  const deleteProduct = async (id) => {
    const response = await fetch(`${serverURL}/${id}`, {
      method: "DELETE",
    });
    try {
      if (response.ok) {
        alert(`Xóa sản phẩm #${id} thành công`);
        fetchData();
      } else {
        alert(`Xóa sản phẩm #${id} thất bại`);
      }
    } catch (err) {
      console.log("Error: ", response.status);
    }
  };

  const Item = ({ item }) => {
    const [editIdShoe, setEditIdShoe] = useState("");
    const [editName, setEditName] = useState("");
    const [editSize, setEditSize] = useState("");
    const [editPrice, setEditPrice] = useState(0);
    const [editQuantity, setEditQuantity] = useState(0);

    const updateProduct = async (id) => {
      if (!editIdShoe || !editName || !editSize || !editPrice) {
        alert("Vui lòng nhập đầy đủ thông tin sản phẩm!");
        return;
      }
      if (editQuantity <= 0) {
        alert("Số lượng phải lớn hơn 0!");
        return;
      }
      try {
        const res = await fetch(`${serverURL}/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idShoe: editIdShoe,
            name: editName,
            size: editSize,
            price: editPrice,
            quantity: editQuantity,
          }),
        });
        if (res.ok) {
          fetchData();
          alert("Cập nhật sản phẩm thành công!");
        }
        setEditIdShoe("");
        setEditName("");
        setEditSize("");
        setEditPrice(0);
        setEditQuantity(0);
        setEditProduct("");
      } catch (error) {
        console.error(error);
        alert("Đã xảy ra lỗi khi cập nhật!");
      }
    };

    return (
      <View
        style={{
          justifyContent: "space-around",
          margin: 10,
          borderRadius: 10,
          backgroundColor: "whitesmoke",
          padding: 10,
        }}
      >
        {/**ID + Size */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "blue" }}>
            {item.idShoe}
          </Text>
          <View
            style={{
              backgroundColor: "lightgrey",
              padding: 5,
              borderRadius: 5,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Size: {item.size}
            </Text>
          </View>
        </View>

        {/**Ten san pham */}
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.name}</Text>

        {/**Price + Quantity */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
            marginBottom: 5,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "red" }}>
            {item.price}đ
          </Text>
          <Text
            style={{ fontSize: 16, fontWeight: "bold", color: "lightgrey" }}
          >
            Số lượng: {item.quantity}
          </Text>
        </View>

        {/**Sua + xoa san pham */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            marginVertical: 5,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "orange",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              height: 35,
              width: 75,
            }}
            onPress={() => setEditProduct(item._id)}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Sửa</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "green",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              marginLeft: 10,
              height: 35,
              width: 75,
            }}
            onPress={() => deleteProduct(item._id)}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
              Xóa
            </Text>
          </TouchableOpacity>
        </View>

        {/**Edit product */}
        {editProduct === item._id ? (
          <View style={{ marginTop: 10 }}>
            {/**Ma san pham */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 10,
                marginBottom: 5,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                Mã sản phẩm
              </Text>
              <TextInput
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: 35,
                  width: 150,
                  paddingHorizontal: 10,
                  elevation: 10,
                  backgroundColor: "white",
                  borderRadius: 5,
                  fontSize: 10,
                }}
                onChangeText={setEditIdShoe}
                value={editIdShoe}
                keyboardType="default"
                placeholder="Nhập ID sản phẩm"
                autoCapitalize="characters"
              />
            </View>

            {/**Ten san pham */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                Tên sản phẩm
              </Text>
              <TextInput
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: 35,
                  width: 150,
                  paddingHorizontal: 10,
                  elevation: 10,
                  backgroundColor: "white",
                  borderRadius: 5,
                  fontSize: 10,
                }}
                onChangeText={setEditName}
                value={editName}
                keyboardType="default"
                placeholder="Nhập tên sản phẩm"
              />
            </View>

            {/**Size san pham */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>Size</Text>
              <TextInput
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: 35,
                  width: 150,
                  paddingHorizontal: 10,
                  elevation: 10,
                  backgroundColor: "white",
                  borderRadius: 5,
                  fontSize: 10,
                }}
                onChangeText={setEditSize}
                value={editSize}
                keyboardType="default"
                placeholder="Nhập size"
                autoCapitalize="characters"
              />
            </View>

            {/**Gia san pham */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                Giá sản phẩm
              </Text>
              <TextInput
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: 35,
                  width: 150,
                  paddingHorizontal: 10,
                  elevation: 10,
                  backgroundColor: "white",
                  borderRadius: 5,
                  fontSize: 10,
                }}
                onChangeText={(text) => {
                  const value = Number(text);
                  setEditPrice(isNaN(value) ? 0 : value);
                }}
                value={editPrice}
                keyboardType="numeric"
                placeholder="Nhập giá sản phẩm"
              />
            </View>

            {/**So luong san pham */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                Số lượng sản phẩm
              </Text>
              <TextInput
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: 35,
                  width: 150,
                  paddingHorizontal: 10,
                  elevation: 10,
                  backgroundColor: "white",
                  borderRadius: 5,
                  fontSize: 10,
                }}
                onChangeText={(text) => {
                  const value = Number(text);
                  setEditQuantity(isNaN(value) ? 0 : value);
                }}
                value={editQuantity}
                keyboardType="numeric"
                placeholder="Nhập số lượng sản phẩm"
              />
            </View>

            {/**Button huy + xac nhan */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: 30,
                  width: 100,
                  backgroundColor: "red",
                  borderRadius: 5,
                }}
                onPress={() => setEditProduct("")}
              >
                <Text
                  style={{ color: "white", fontSize: 14, fontWeight: "bold" }}
                >
                  Hủy
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: 30,
                  width: 100,
                  marginLeft: 10,
                  backgroundColor: "blue",
                  borderRadius: 5,
                }}
                onPress={() => updateProduct(item._id)}
              >
                <Text
                  style={{ color: "white", fontSize: 14, fontWeight: "bold" }}
                >
                  Xác nhận
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <></>
        )}
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"} // ios dùng padding, android dùng height
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // điều chỉnh khoảng cách
        >
          <ScrollView
            style={{ padding: 20 }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["red"]}
              />
            }
          >
            {/**Header */}
            <View
              style={{
                borderBottomWidth: 3,
                borderBottomColor: "blue",
                paddingVertical: 15,
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                THÊM SẢN PHẨM MỚI
              </Text>
            </View>

            {/**Ma san pham */}
            <View style={{ marginTop: 10, marginBottom: 5 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Mã sản phẩm
              </Text>
              <TextInput
                style={{
                  height: 50,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  elevation: 10,
                  backgroundColor: "white",
                  marginTop: 10,
                }}
                onChangeText={setIdShoe}
                value={idShoe}
                placeholder="Nhập mã sản phẩm"
                keyboardType="default"
                autoCapitalize="characters"
              />
            </View>

            {/**Ten san pham */}
            <View style={{ marginTop: 10, marginBottom: 5 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Tên sản phẩm
              </Text>
              <TextInput
                style={{
                  height: 50,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  elevation: 10,
                  backgroundColor: "white",
                  marginTop: 10,
                }}
                onChangeText={setName}
                value={name}
                placeholder="Nhập tên sản phẩm"
                keyboardType="default"
              />
            </View>

            {/**Size */}
            <View style={{ marginVertical: 5 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Chọn Size
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: 50,
                    width: 50,
                    borderRadius: 10,
                    elevation: 10,
                    backgroundColor: "white",
                    borderColor: size === "S" ? "blue" : "transparent",
                    borderWidth: size === "S" ? 1 : 0,
                  }}
                  onPress={() => setSize("S")}
                >
                  <Text>S</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: 50,
                    width: 50,
                    borderRadius: 10,
                    elevation: 10,
                    backgroundColor: "white",
                    borderColor: size === "M" ? "blue" : "transparent",
                    borderWidth: size === "M" ? 1 : 0,
                  }}
                  onPress={() => setSize("M")}
                >
                  <Text>M</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: 50,
                    width: 50,
                    borderRadius: 10,
                    elevation: 10,
                    backgroundColor: "white",
                    borderColor: size === "L" ? "blue" : "transparent",
                    borderWidth: size === "L" ? 1 : 0,
                  }}
                  onPress={() => setSize("L")}
                >
                  <Text>L</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: 50,
                    width: 50,
                    borderRadius: 10,
                    elevation: 10,
                    backgroundColor: "white",
                    borderColor: size === "XL" ? "blue" : "transparent",
                    borderWidth: size === "XL" ? 1 : 0,
                  }}
                  onPress={() => setSize("XL")}
                >
                  <Text>XL</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: 50,
                    width: 50,
                    borderRadius: 10,
                    elevation: 10,
                    backgroundColor: "white",
                    borderColor: size === "XXL" ? "blue" : "transparent",
                    borderWidth: size === "XXL" ? 1 : 0,
                  }}
                  onPress={() => setSize("XXL")}
                >
                  <Text>XXL</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/**Gia san pham */}
            <View style={{ marginTop: 10, marginBottom: 5 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Giá (VND)
              </Text>
              <TextInput
                style={{
                  height: 50,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  elevation: 10,
                  backgroundColor: "white",
                  marginTop: 10,
                }}
                onChangeText={(text) => {
                  const value = Number(text);
                  setPrice(isNaN(value) ? 0 : value);
                }}
                value={price}
                placeholder="Nhập tên sản phẩm"
                keyboardType="numeric"
              />
            </View>

            {/**So luong san pham */}
            <View style={{ marginTop: 10, marginBottom: 5 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Số lượng</Text>
              <TextInput
                style={{
                  height: 50,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  elevation: 10,
                  backgroundColor: "white",
                  marginTop: 10,
                }}
                onChangeText={(text) => {
                  const value = Number(text);
                  setQuantity(isNaN(value) ? 0 : value);
                }}
                value={quantity}
                placeholder="Nhập số lượng"
                keyboardType="numeric"
              />
            </View>

            {/**Them san pham Button */}
            <View>
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: 50,
                  margin: 20,
                  backgroundColor: "green",
                  borderRadius: 10,
                  elevation: 10,
                }}
                onPress={() => {
                  addProduct();
                  setIdShoe("");
                  setName("");
                  setPrice("");
                  setQuantity("");
                }}
              >
                <Text
                  style={{ fontSize: 22, fontWeight: "bold", color: "white" }}
                >
                  THÊM SẢN PHẨM
                </Text>
              </TouchableOpacity>
            </View>

            {/**Danh sach san pham */}
            <View style={{ marginTop: 10, height: 850 }}>
              <View
                style={{
                  borderBottomWidth: 3,
                  borderBottomColor: "blue",
                  paddingVertical: 15,
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  DANH SÁCH SẢN PHẨM
                </Text>
              </View>
              {loading ? (
                <FlatList
                  data={products}
                  renderItem={({ item }) => <Item item={item} />}
                  keyExtractor={(item) => item._id}
                  nestedScrollEnabled={true}
                />
              ) : (
                <ActivityIndicator
                  size="large"
                  color="red"
                  style={{ marginTop: 30 }}
                />
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
