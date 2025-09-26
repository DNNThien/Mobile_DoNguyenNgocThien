import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Home({ data, loading }) {
  console.log('data in home.js');
  console.log(data);
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
        {loading ? (
          <FlatList
            data={data}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={(item) => item.id}
            // numColumns={2}
          />
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator
              size={50}
              color="blue"
              style={{ justifyContent: 'center', alignItems: 'center' }}
            />
          </View>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
