import React, { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';

export default function AssetExample() {
  const [searchQuery, setSearchQuery] = useState('');
  const medicines = [
    {
      name: 'TyAmoxicillin',
      price: '$199.99',
      star: 4.9,
      description:
        'Used to treat infections such as respiratory tract infections, ear infections...',
      image: require('../assets/TyAmoxicillin.png'),
      id: 1,
    },
    {
      name: 'Paracetamol',
      price: '$199.99',
      star: 4.9,
      description:
        'Used to treat infections such as respiratory tract infections, ear infections...',
      image: require('../assets/Paracetamol.png'),
      id: 2,
    },
    {
      name: 'Ibuprotein',
      price: '$199.99',
      star: 4.9,
      description:
        'Used to treat infections such as respiratory tract infections, ear infections...',
      image: require('../assets/Ibuprotein.png'),
      id: 3,
    },
    {
      name: 'Antifungal',
      price: '$199.99',
      star: 4.9,
      description:
        'Used to treat infections such as respiratory tract infections, ear infections...',
      image: require('../assets/Antifungal.png'),
      id: 4,
    },
    {
      name: 'TyAmoxicillin',
      price: '$199.99',
      star: 4.9,
      description:
        'Used to treat infections such as respiratory tract infections, ear infections...',
      image: require('../assets/TyAmoxicillin.png'),
      id: 1,
    },
    {
      name: 'Paracetamol',
      price: '$199.99',
      star: 4.9,
      description:
        'Used to treat infections such as respiratory tract infections, ear infections...',
      image: require('../assets/Paracetamol.png'),
      id: 2,
    },
    {
      name: 'Ibuprotein',
      price: '$199.99',
      star: 4.9,
      description:
        'Used to treat infections such as respiratory tract infections, ear infections...',
      image: require('../assets/Ibuprotein.png'),
      id: 3,
    },
    {
      name: 'Antifungal',
      price: '$199.99',
      star: 4.9,
      description:
        'Used to treat infections such as respiratory tract infections, ear infections...',
      image: require('../assets/Antifungal.png'),
      id: 4,
    },
  ];

  const Item = ({ item }) => (
    <View
      style={{
        margin: 10,
        padding: 10,
        elevation: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        width: '45%',
      }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image source={item.image} style={{ height: 100, width: '100%' }} />
      </View>
      <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{item.name}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ color: 'blue', marginRight: 70 }}>{item.price}</Text>
        <Image
          source={require('../assets/star.png')}
          style={{ height: 15, width: 15 }}
        />
        <Text>{item.star}</Text>
      </View>
      <Text style={{ fontSize: 12 }}>{item.description}</Text>
      <Text
        style={{ fontSize: 14, color: 'blue' }}
        onPress={() => alert('Read more')}>
        Read More ➔
      </Text>
    </View>
  );
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        {/* search view */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            height: 75,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#f5f5f5',
              height: 55,
              width: '80%',
              borderRadius: 10,
            }}>
            <Image
              source={require('../assets/search.png')}
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
              justifyContent: 'center',
              alignItems: 'center',
              height: 55,
              width: '20%',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 45,
                width: 45,
                borderRadius: 25,
                backgroundColor: 'blue',
              }}>
              <Image
                source={require('../assets/option.png')}
                style={{ height: 15, width: 15 }}
              />
            </View>
          </View>
        </View>

        {/* banner view */}
        <View style={{ padding: 10 }}>
          <ImageBackground
            source={require('../assets/banner.png')}
            style={{ height: 150, width: '100%' }}>
            <View style={{ position: 'absolute', bottom: 0, padding: 10 }}>
              <Text
                style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                Free Consultation
              </Text>
              <Text style={{ color: 'white', fontSize: 12 }}>
                Feel free to consult with one of our experienced {'\n'} doctors
                for personalized advice.
              </Text>
            </View>
          </ImageBackground>
        </View>

        {/* hello view */}
        <View style={{ flexDirection: 'row', padding: 10, }}>
          <View style={{ width: '80%' }}>
            <Text style={{ color: 'blue', fontSize: 18, fontWeight: 'bold' }}>
              Hello, User!
            </Text>
            <Text>We have some additional suggestion for you.</Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '20%',
            }}>
            <Text style={{ color: 'blue', textAlign: 'center' }}>
              See All ➔
            </Text>
          </View>
        </View>

        {/* medicines view */}
        <FlatList
          data={medicines}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
        />

        {/* footer view */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            height: 75,
          }}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 55,
              width: 55,
            }}>
            <Image
              source={require('../assets/home.png')}
              style={{ height: 35, width: 35 }}
            />
            <Text>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 55,
              width: 55,
            }}>
            <Image
              source={require('../assets/explore.png')}
              style={{ height: 35, width: 35 }}
            />
            <Text>Explore</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 55,
              width: 55,
            }}>
            <Image
              source={require('../assets/cart.png')}
              style={{ height: 35, width: 35 }}
            />
            <Text>My Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 55,
              width: 55,
            }}>
            <Image
              source={require('../assets/hopital.png')}
              style={{ height: 35, width: 35 }}
            />
            <Text>Hospital</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 55,
              width: 55,
            }}>
            <Image
              source={require('../assets/support.png')}
              style={{ height: 35, width: 35 }}
            />
            <Text>Support</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 55,
              width: 55,
            }}>
            <Image
              source={require('../assets/user.png')}
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
