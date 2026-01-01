import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";

import HomeScreen from "../screens/HomeScreen";
import TripPlannerScreen from "../screens/TripPlannerScreen";
import MapScreen from "../screens/MapScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

/* ===== COLORS ===== */
const COLORS = {
  bg: "#000000",           // Pure black
  surface: "#0B0E17",
  border: "rgba(255,255,255,0.08)",

  pink: "#FF2F92",
  blue: "#4D7CFF",

  iconInactive: "#7E84A3",
};

export default function MainTabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        /* 🔥 FIXED: NO absolute positioning */
        tabBarStyle: {
          backgroundColor: COLORS.surface,

          height: 72 + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
          paddingTop: 8,

          borderTopWidth: 1,
          borderTopColor: COLORS.border,

          shadowColor: "#000",
          shadowOpacity: 0.4,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: -4 },
          elevation: 12,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} active="home" inactive="home-outline" />
          ),
        }}
      />

      <Tab.Screen
        name="Trips"
        component={TripPlannerScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              active="calendar"
              inactive="calendar-outline"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              active="navigate"
              inactive="navigate-outline"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              active="person"
              inactive="person-outline"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

/* ===== TAB ICON ===== */
const TabIcon = ({ focused, active, inactive }) => {
  if (!focused) {
    return (
      <View style={styles.icon}>
        <Ionicons
          name={inactive}
          size={26}
          color={COLORS.iconInactive}
        />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={[COLORS.pink, COLORS.blue]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.iconActive}
    >
      <Ionicons name={active} size={26} color="#FFFFFF" />
    </LinearGradient>
  );
};

/* ===== STYLES ===== */
const styles = StyleSheet.create({
  icon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  iconActive: {
    width: 52,
    height: 52,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#FF2F92",
    shadowOpacity: 0.55,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 14,
  },
});