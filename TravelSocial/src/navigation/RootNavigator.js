import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/* ===== AUTH & COMMON ===== */
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import OtpScreen from '../screens/OtpScreen';

/* ===== MAIN APP ===== */
import MainTabNavigator from './MainTabNavigator';

/* ===== PROFILE FLOW ===== */
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

/* ===== PROFILE TAB SCREENS ===== */
import ActivityScreen from '../screens/ActivityScreen';
import MapScreen from '../screens/MapScreen';
import MediaScreen from '../screens/MediaScreen';
import UpcomingScreen from '../screens/UpcomingScreen';

import AddTripScreen from '../screens/AddTripScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerShown: false }}
    >
      {/* ===== SPLASH ===== */}
      <Stack.Screen name="Splash" component={SplashScreen} /> 

      {/* ===== AUTH FLOW ===== */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />

      {/* ===== MAIN TABS ENTRY ===== */}
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />

      {/* ===== PROFILE STACK ===== */}
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />

      {/* ===== PROFILE SUB-SCREENS (OPTIONAL DIRECT NAV) ===== */}
      <Stack.Screen name="Activity" component={ActivityScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="Media" component={MediaScreen} />
      <Stack.Screen name="Upcoming" component={UpcomingScreen} />
      <Stack.Screen name="AddTrip" component={AddTripScreen} />
    </Stack.Navigator>
  );
}