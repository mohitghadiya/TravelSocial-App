import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';


import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import TripPlannerScreen from '../screens/TripPlannerScreen';
import HotelsScreen from '../screens/HotelsScreen';
import ReelsScreen from '../screens/ReelsScreen';
import MapScreen from '../screens/MapScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          borderTopWidth: 0,
          elevation: 8,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName = 'home';

          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Search') iconName = focused ? 'search' : 'search-outline';
          else if (route.name === 'Trips') iconName = focused ? 'map' : 'map-outline';
          else if (route.name === 'Hotels') iconName = focused ? 'bed' : 'bed-outline';
          else if (route.name === 'Reels') iconName = focused ? 'film' : 'film-outline';
          else if (route.name === 'Map') iconName = focused ? 'location' : 'location-outline';
          else if (route.name === 'Settings') iconName = focused ? 'settings' : 'settings-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Trips" component={TripPlannerScreen} />
      <Tab.Screen name="Hotels" component={HotelsScreen} />
      <Tab.Screen name="Reels" component={ReelsScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}