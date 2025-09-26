import { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function ChooseColor({ navigation, route }) {
  const data = route.params.data || [];
  console.log(data);
  const blackPhone = {uri: data[0].image};
  const bluePhone = {uri: data[1].image};
  const redPhone = {uri: data[2].image};
  const silverPhone = {uri: data[3].image};

  const [colorPhone, setColorPhone] = useState(route.params.image);
  const [pricePhone, setPricePhone] = useState(route.params.price);
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', padding: 10, height: '20%', backgroundColor: '#E0E0E0' }}>
          <Image source={colorPhone} style={{ height: 130, width: 105 }} />
          <View>
            <Text style={{ fontSize: 18, padding: 10 }}>
              Điện Thoại Vsmart Joy 3{'\n'}Hàng chính hãng
            </Text>
            <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
              <Text style={{ fontSize: 16 }}>Màu:</Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  paddingLeft: 5,
                  color:
                    colorPhone === blackPhone
                      ? 'black'
                      : colorPhone === bluePhone
                      ? 'blue'
                      : colorPhone === redPhone
                      ? 'red'
                      : 'white',
                }}>
                {colorPhone === blackPhone
                  ? 'Đen'
                  : colorPhone === bluePhone
                  ? 'Xanh'
                  : colorPhone === redPhone
                  ? 'Đỏ'
                  : 'Trắng'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
              <Text style={{ fontSize: 14 }}>Cung cấp bởi </Text>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                Tiki Tradding
              </Text>
            </View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                padding: 10,
                color:
                  colorPhone === blackPhone
                    ? 'black'
                    : colorPhone === bluePhone
                    ? 'blue'
                    : colorPhone === redPhone
                    ? 'red'
                    : 'white',
              }}>
              {pricePhone}
            </Text>
          </View>
        </View>

        <View style={{ flex: 1, backgroundColor: '#C4C4C4' }}>
          <Text
            style={{
              padding: 10,
              fontSize: 18,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Chọn một màu bên dưới:
          </Text>
          
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
              style={{
                height: 100,
                width: 100,
                backgroundColor: 'blue',
                margin: 10,
              }}
              onPress={() => {
                setColorPhone(bluePhone);
                setPricePhone(data[1].price);
              }}></TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 100,
                width: 100,
                backgroundColor: 'red',
                margin: 10,
              }}
              onPress={() => {
                setColorPhone(redPhone);
                setPricePhone(data[2].price);
              }}></TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 100,
                width: 100,
                backgroundColor: 'black',
                margin: 10,
              }}
              onPress={() => {
                setColorPhone(blackPhone);
                setPricePhone('1.990.000');
              }}></TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 100,
                width: 100,
                backgroundColor: 'white',
                margin: 10,
              }}
              onPress={() => {
                setColorPhone(silverPhone);
                setPricePhone(data[3].price);
              }}></TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#1952E2',
              height: 50,
              borderRadius: 10,
              marginVertical: 20,
              marginHorizontal: 10,
              elevation: 10,
            }}
            onPress={() =>
              navigation.navigate('Main Screen', { data, image: colorPhone, price: pricePhone, })
            }>
            <Text style={{ fontSize: 24, color: 'white', fontWeight: 'bold' }}>
              XONG
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
