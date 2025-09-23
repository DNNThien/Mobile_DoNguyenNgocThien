import React, { useState, useEffect, useCallback, useMemo } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export default function Screen2() {
  const serverURL = "http://localhost:3000/medicine";
  const [loading, setLoading] = useState(false);
  const [medicines, setMedicine] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchMedicine = async () => {
    try {
      const response = await fetch(serverURL);
      const data = await response.json();
      setMedicine(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(true);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchMedicine();
    }, 2000);
  }, []);

  const MedicineCard = React.memo(({ item }) => (
    <View
      style={{
        margin: 10,
        padding: 10,
        elevation: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        width: "45%",
      }}
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          source={{ uri: item.image }}
          style={{ height: 100, width: "100%" }}
        />
      </View>
      <Text style={{ fontSize: 14, fontWeight: "bold" }}>{item.name}</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ color: "blue", marginRight: 70 }}>{item.price}</Text>
        <Image
          source={require("../assets/star.png")}
          style={{ height: 15, width: 15 }}
        />
        <Text>{item.star}</Text>
      </View>
      <Text style={{ fontSize: 12 }}>{item.description}</Text>
      <Text
        style={{ fontSize: 14, color: "blue" }}
        onPress={() => alert("Read more")}
      >
        Read More ➔
      </Text>
    </View>
  ));

  const renderItem = useCallback(
    ({ item }) => <MedicineCard item={item} />,
    []
  );

  const filterMedicine = useMemo(() => {
    return medicines.filter((med) =>
      med.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [medicines, searchQuery]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        {/* search view */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            height: 75,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#f5f5f5",
              height: 55,
              width: "80%",
              borderRadius: 10,
            }}
          >
            <Image
              source={require("../assets/search.png")}
              style={{ height: 25, width: 25, margin: 10 }}
            />
            <TextInput
              style={{ fontSize: 16 }}
              onChangeText={setSearchQuery}
              value={searchQuery}
              placeholder="Search here..."
              keyboardType="default"
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 55,
              width: "20%",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: 45,
                width: 45,
                borderRadius: 25,
                backgroundColor: "blue",
              }}
            >
              <Image
                source={require("../assets/option.png")}
                style={{ height: 15, width: 15 }}
              />
            </View>
          </View>
        </View>

        {/* banner view */}
        <View style={{ padding: 10 }}>
          <ImageBackground
            source={require("../assets/banner.png")}
            style={{ height: 150, width: "100%" }}
          >
            <View style={{ position: "absolute", bottom: 0, padding: 10 }}>
              <Text
                style={{ color: "white", fontSize: 18, fontWeight: "bold" }}
              >
                Free Consultation
              </Text>
              <Text style={{ color: "white", fontSize: 12 }}>
                Feel free to consult with one of our experienced {"\n"} doctors
                for personalized advice.
              </Text>
            </View>
          </ImageBackground>
        </View>

        {/* hello view */}
        <View style={{ flexDirection: "row", padding: 10 }}>
          <View style={{ width: "80%" }}>
            <Text style={{ color: "blue", fontSize: 18, fontWeight: "bold" }}>
              Hello, User!
            </Text>
            <Text>We have some additional suggestion for you.</Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "20%",
            }}
          >
            <Text style={{ color: "blue", textAlign: "center" }}>
              See All ➔
            </Text>
          </View>
        </View>

        {/* medicines view */}
        {loading ? (
          <FlatList
            data={filterMedicine}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
          />
        ) : (
          <ActivityIndicator size="small" color="blue" />
        )}

        {/* footer view */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            height: 75,
          }}
        >
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 55,
              width: 55,
            }}
          >
            <Image
              source={require("../assets/home.png")}
              style={{ height: 35, width: 35 }}
            />
            <Text>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 55,
              width: 55,
            }}
          >
            <Image
              source={require("../assets/explore.png")}
              style={{ height: 35, width: 35 }}
            />
            <Text>Explore</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 55,
              width: 55,
            }}
          >
            <Image
              source={require("../assets/cart.png")}
              style={{ height: 35, width: 35 }}
            />
            <Text>My Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 55,
              width: 55,
            }}
          >
            <Image
              source={require("../assets/hopital.png")}
              style={{ height: 35, width: 35 }}
            />
            <Text>Hospital</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 55,
              width: 55,
            }}
          >
            <Image
              source={require("../assets/support.png")}
              style={{ height: 35, width: 35 }}
            />
            <Text>Support</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 55,
              width: 55,
            }}
          >
            <Image
              source={require("../assets/user.png")}
              style={{ height: 35, width: 35 }}
            />
            <Text>Profile</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});
