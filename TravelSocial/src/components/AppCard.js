import React from 'react';
import { View, StyleSheet, Animated, Pressable } from 'react-native';

export default function AppCard({ children, style, onPress }) {
  const scale = React.useRef(new Animated.Value(1)).current;

  const animateIn = () => {
    Animated.spring(scale, {
      toValue: 0.98,
      useNativeDriver: true,
      friction: 5,
    }).start();
  };

  const animateOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 5,
    }).start();
  };

  const content = (
    <Animated.View style={[styles.card, style, { transform: [{ scale }] }]}>
      {children}
    </Animated.View>
  );

  if (!onPress) {
    return content;
  }

  return (
    <Pressable
      onPress={onPress}
      onPressIn={animateIn}
      onPressOut={animateOut}
      onHoverIn={animateIn}
      onHoverOut={animateOut}
      style={{ borderRadius: 16 }}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
});