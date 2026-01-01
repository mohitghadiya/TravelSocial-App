import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
  Image,
} from 'react-native';

export default function SplashScreen({ navigation }) {
  const scaleAnim = useRef(new Animated.Value(0.92)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 60,
        useNativeDriver: true, // ✅ safe
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true, // ✅ safe
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <Animated.View
        style={[
          styles.content,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
      >
        {/* LOGO IMAGE */}
        <Image
          source={require('../assets/mylogo.jpeg')} // 👈 apna logo
          style={styles.logo}
          resizeMode="contain"
        />

        {/* PREMIUM BRAND TEXT */}
        <Text style={styles.brandPrimary}>TRAVEL</Text>
        <Text style={styles.brandSecondary}>SOCIAL</Text>

        {/* TAGLINE */}
        <Text style={styles.tagline}>
          EXPLORE  •  CONNECT  •  LIVE
        </Text>
      </Animated.View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },

  content: {
    alignItems: 'center',

    // static glow (safe)
    shadowColor: '#00AAFF',
    shadowOpacity: 0.35,
    shadowRadius: 40,
    elevation: 25,
  },

  logo: {
    width: 170,
    height: 170,
    marginBottom: 28,
  },

  brandPrimary: {
    fontSize: 42,
    fontWeight: '800',
    letterSpacing: 6,
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },

  brandSecondary: {
    fontSize: 42,
    fontWeight: '300',      // 🔥 luxury contrast
    letterSpacing: 10,
    color: '#FF005C',       // premium accent
    textTransform: 'uppercase',
    marginTop: -8,
  },

  tagline: {
    marginTop: 18,
    fontSize: 11,
    letterSpacing: 4,
    color: '#9CA3AF',
    opacity: 0.9,
  },
});