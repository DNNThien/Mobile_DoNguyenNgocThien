import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Home from './components/Home.js';
import Search from './components/Search.js';
import Profile from './components/Profile.js';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  const serverURL = 'https://68d63e56c2a1754b4269fedd.mockapi.io/VsmartPhone';
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(serverURL);
      const data = await response.json();
      setData(data);
      console.log('data in app.js');
      console.log(data);
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
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Home">
          {() => <Home data={data} loading={loading} />}
        </Tab.Screen>
        <Tab.Screen name="Search">{() => <Search data={data} />}</Tab.Screen>
        <Tab.Screen name="Profile">{() => <Profile data={data} />}</Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
