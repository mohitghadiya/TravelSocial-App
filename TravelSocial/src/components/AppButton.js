import React, { useRef } from 'react';
import { Text, StyleSheet, Pressable, Animated } from 'react-native';

export default function AppButton({ title, onPress, style, textStyle }) {
  const scale = useRef(new Animated.Value(1)).current;

  const animateIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
      friction: 4,
    }).start();
  };

  const animateOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 4,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={animateIn}
      onPressOut={animateOut}
      android_ripple={{ color: '#1D4ED8' }}
      onHoverIn={animateIn}
      onHoverOut={animateOut}
      style={({ pressed }) => [styles.pressable, style, pressed && { opacity: 0.9 }]}
    >
      <Animated.View style={[styles.btn, { transform: [{ scale }] }]}>
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    marginVertical: 6,
    borderRadius: 999,
    overflow: 'hidden',
  },
  btn: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { color: 'white', fontSize: 16, fontWeight: '600' },
});