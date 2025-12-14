import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AppInput from '../components/AppInput';
import { hotels } from '../constants/dummyData';
import HotelCard from '../components/HotelCard';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');

  const filtered = hotels.filter(h =>
    h.name.toLowerCase().includes(query.toLowerCase()) ||
    h.location.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search destinations</Text>
      <AppInput
        placeholder="Search by hotel or location..."
        value={query}
        onChangeText={setQuery}
      />

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <HotelCard
            hotel={item}
            onPress={() => navigation.navigate('HotelDetail', { hotel: item })}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#F3F4F6' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
});