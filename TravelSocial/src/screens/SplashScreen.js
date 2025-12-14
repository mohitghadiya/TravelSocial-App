import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  const scale = useRef(new Animated.Value(0.7)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        friction: 4,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => navigation.replace('Login'), 1500);
    return () => clearTimeout(timer);
  }, [navigation, opacity, scale]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale }], opacity }}>
        <Text style={styles.logo}>TravelSocial</Text>
      </Animated.View>
      <Animated.Text style={[styles.subtitle, { opacity }]}>
        Travel • Social • Booking
      </Animated.Text>
      <View style={[styles.circle, styles.circleOne]} />
      <View style={[styles.circle, styles.circleTwo]} />
    </View>
  );
}

const circleSize = width * 0.9;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: { fontSize: 32, fontWeight: 'bold', color: 'white' },
  subtitle: { marginTop: 8, color: '#9CA3AF' },
  circle: {
    position: 'absolute',
    borderRadius: circleSize / 2,
    width: circleSize,
    height: circleSize,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  circleOne: {
    top: -circleSize * 0.2,
    right: -circleSize * 0.3,
  },
  circleTwo: {
    bottom: -circleSize * 0.3,
    left: -circleSize * 0.4,
  },
});