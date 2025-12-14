import React from 'react';
import { Image, StyleSheet } from 'react-native';

export default function Avatar({ size = 40, uri }) {
  return (
    <Image
      source={{ uri: uri || 'https://i.pravatar.cc/150?img=3' }}
      style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}
    />
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
});