import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Search({ data }) {
  const [searchQuery, setSearchQuery] = useState('');
  const filterMedicine = useMemo(() => {
    return data.filter((med) =>
      med.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);
  const Item = ({ item }) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        padding: 10,
        height: 200,
        borderRadius: 10,
        elevation: 10,
        backgroundColor: 'white',
      }}>
      <View style={{ padding: 10 }}>
        <Image
          source={{ uri: item.image }}
          style={{ height: 150, width: 120 }}
          resizeMode="contain"
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          height: '90%',
          padding: 10,
        }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 16 }}>Màu</Text>
          <Text style={{ marginLeft: 5, fontSize: 16, fontWeight: 'bold' }}>
            {item.color}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: 105,
          }}>
          <Image
            source={require('../assets/star.png')}
            style={{ height: 20, width: 20 }}
          />
          <Image
            source={require('../assets/star.png')}
            style={{ height: 20, width: 20 }}
          />
          <Image
            source={require('../assets/star.png')}
            style={{ height: 20, width: 20 }}
          />
          <Image
            source={require('../assets/star.png')}
            style={{ height: 20, width: 20 }}
          />
          <Image
            source={require('../assets/star.png')}
            style={{ height: 20, width: 20 }}
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: 'red',
              width: '60%',
            }}>
            {item.price}
          </Text>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 35,
              width: '40%',
              backgroundColor: 'red',
            }}
            onPress={() => alert('Do you have enough money to buy?')}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>
              Mua ngay
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            style={{
              height: 55,
              width: '80%',
              margin: 10,
              paddingHorizontal: 25,
              backgroundColor: '#c5c5c5',
              borderRadius: 10,
              elevation: 10,
            }}
            onChangeText={setSearchQuery}
            value={searchQuery}
            placeholder="Search here...."
            keyboardType="default"
          />
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={require('../assets/search.png')}
              style={{ height: 25, width: 25 }}
            />
          </View>
        </View>

        <FlatList
          data={filterMedicine}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
