import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import AppCard from './AppCard';

const { width } = Dimensions.get('window');
const imageHeight = Math.min(200, width * 0.5);

export default function HotelCard({ hotel, onPress }) {
  return (
    <AppCard onPress={onPress}>
      <Image source={{ uri: hotel.image }} style={[styles.image, { height: imageHeight }]} />
      <Text style={styles.name}>{hotel.name}</Text>
      <Text style={styles.location}>{hotel.location}</Text>
      <View style={styles.row}>
        <Text>⭐ {hotel.rating}</Text>
        <Text style={styles.price}>₹ {hotel.price}/night</Text>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  image: { width: '100%', borderRadius: 12, marginBottom: 8, backgroundColor: '#E5E7EB' },
  name: { fontSize: 16, fontWeight: 'bold' },
  location: { fontSize: 12, color: '#6B7280', marginBottom: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontWeight: 'bold' },
});