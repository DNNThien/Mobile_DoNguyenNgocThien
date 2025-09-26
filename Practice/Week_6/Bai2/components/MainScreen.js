import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function MainScreen({ navigation, route }) {
  const data = route.params.data || [];
  console.log('main screen')
  console.log(data)
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
          }}>
          <Image
            source={
              route.params?.image ? route.params?.image : { uri: data[1].image }
            }
            style={{ height: 400, width: 325 }}
            resizeMode="contain"
          />
        </View>
        <Text style={{ fontSize: 18, marginLeft: 10 }}>
          Điện Thoại Vsmart Joy 3 - Hàng chính hãng
        </Text>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: 150,
            }}>
            <Image
              source={require('../assets/star.png')}
              style={{ height: 25, width: 25 }}
            />
            <Image
              source={require('../assets/star.png')}
              style={{ height: 25, width: 25 }}
            />
            <Image
              source={require('../assets/star.png')}
              style={{ height: 25, width: 25 }}
            />
            <Image
              source={require('../assets/star.png')}
              style={{ height: 25, width: 25 }}
            />
            <Image
              source={require('../assets/star.png')}
              style={{ height: 25, width: 25 }}
            />
          </View>
          <Text style={{ marginLeft: 25 }}>(Xem 828 đánh giá)</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 10,
          }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', paddingLeft: 10 }}>
            {route.params?.price ? route.params?.price : '1.790.000'} đ
          </Text>
          <Text
            style={{
              fontSize: 14,
              textDecorationLine: 'line-through',
              marginLeft: 75,
            }}>
            2.790.000 đ
          </Text>
        </View>

        <View
          style={{ flexDirection: 'row', alignContent: 'center', padding: 10 }}>
          <Text style={{ color: 'red', fontWeight: 'bold' }}>
            Ở ĐÂU RẺ HƠN HOÀN TIỀN
          </Text>
          <Image
            source={require('../assets/question_mark.png')}
            style={{ height: 15, width: 15, marginLeft: 20 }}
          />
        </View>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 15,
            borderRadius: 15,
            height: 50,
            marginTop: 20,
            elevation: 10,
            backgroundColor: 'white',
          }}
          onPress={() =>
            navigation.navigate('Choose Color', {
              data,
              image: route.params?.image
                ? route.params?.image
                : { uri: data[1].image },
              price: route.params?.price
                ? route.params?.price
                : data[1].price,
            })
          }>
          <Text
            style={{
              fontSize: 18,
              textAlignVertical: 'center',
              paddingTop: 3,
            }}>
            4 MÀU-CHỌN MÀU
          </Text>
          <Text
            style={{
              position: 'absolute',
              right: 0,
              fontSize: 32,
              paddingRight: 20,
              textAlignVertical: 'center',
              paddingBottom: 3,
            }}>
            >
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'red',
            borderRadius: 10,
            height: 50,
            marginHorizontal: 15,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            marginBottom: 50,
            elevation: 10,
          }}
          onPress={() => alert('OKE')}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 22 }}>
            CHỌN MUA
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});
