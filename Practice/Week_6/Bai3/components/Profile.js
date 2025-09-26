import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

export default function Profile() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ borderWidth: 1 }}>
          <ImageBackground
            source={require('../assets/Background.jpeg')}
            style={{
              height: '100%',
              width: '100%',
            }}></ImageBackground>
          <LinearGradient
            colors={['rgba(0,0,0,0.6)', 'transparent']}
            style={StyleSheet.absoluteFill}
          />
          <View style={{ position: 'absolute', top: 0, right: 0, margin: 20 }}>
            <TouchableOpacity onPress={() => alert('Underdeveloped')}>
              <Image
                source={require('../assets/edit.png')}
                style={{ height: 35, width: 35, tintColor: 'white' }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              position: 'absolute',
              bottom: 0,
              height: 200,
              width: '100%',
              marginBottom: 115,
              paddingLeft: 50,
              paddingBottom: 10,
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
                paddingVertical: 10,
              }}>
              Đỗ Nguyễn Ngọc Thiện
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={require('../assets/birthday-cake.png')}
                style={{
                  height: 15,
                  width: 15,
                  tintColor: 'white',
                  marginRight: 10,
                }}
              />
              <Text style={{ fontSize: 16, color: 'white' }}>
                29 October 2003
              </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={require('../assets/telephone.png')}
                style={{
                  height: 15,
                  width: 15,
                  tintColor: 'white',
                  marginRight: 10,
                }}
              />
              <Text style={{ fontSize: 16, color: 'white' }}>
                +84 123 456 789
              </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={require('../assets/email.png')}
                style={{
                  height: 15,
                  width: 15,
                  tintColor: 'white',
                  marginRight: 10,
                }}
              />
              <Text style={{ fontSize: 16, color: 'white' }}>
                thiendo@gmail.com
              </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={require('../assets/location.png')}
                style={{
                  height: 15,
                  width: 15,
                  tintColor: 'white',
                  marginRight: 10,
                  marginBottom: 10,
                }}
              />
              <Text style={{ fontSize: 16, color: 'white' }}>
                12 Nguyen Van Bao Street, Go Vap District{'\n'}Ho Chi Minh City,
                Vietnam
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
