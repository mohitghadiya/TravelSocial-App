import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import AppButton from '../components/AppButton';

const { width } = Dimensions.get('window');

export default function HotelDetailScreen({ route }) {
  const { hotel } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
      <Image source={{ uri: hotel.image }} style={[styles.image, { height: width * 0.6 }]} />
      <Text style={styles.name}>{hotel.name}</Text>
      <Text style={styles.location}>{hotel.location}</Text>
      <Text style={styles.info}>
        ⭐ {hotel.rating} • ₹ {hotel.price}/night
      </Text>

      <Text style={styles.section}>About</Text>
      <Text style={styles.text}>{hotel.description}</Text>

      <Text style={styles.section}>Amenities</Text>
      {hotel.amenities.map((a, i) => (
        <Text key={i} style={styles.text}>
          • {a}
        </Text>
      ))}

      <View style={{ marginTop: 20 }}>
        <AppButton title="Book (Mock)" onPress={() => {}} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  image: { width: '100%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  name: { fontSize: 24, fontWeight: 'bold', marginTop: 16, marginHorizontal: 16 },
  location: { fontSize: 14, color: '#6B7280', marginHorizontal: 16, marginTop: 4 },
  info: { fontSize: 16, marginHorizontal: 16, marginTop: 6 },
  section: { fontSize: 18, fontWeight: 'bold', marginTop: 16, marginHorizontal: 16 },
  text: { fontSize: 14, marginHorizontal: 16, marginTop: 4 },
});