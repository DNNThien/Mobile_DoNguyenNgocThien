import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function GetDataMockAPI({ navigation, route }) {
  const serverURL = 'https://68d63e56c2a1754b4269fedd.mockapi.io/VsmartPhone';
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(serverURL);
      const data = await response.json();
      navigation.replace('Main Screen', {data: data})
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(true);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 2000);
  }, []);

  return (
    <View>
      <ActivityIndicator size={50} color='blue'/>
    </View>
  )
}
