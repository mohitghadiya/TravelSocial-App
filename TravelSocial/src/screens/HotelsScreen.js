import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { hotels } from '../constants/dummyData';
import HotelCard from '../components/HotelCard';

export default function HotelsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hotels for you</Text>

      <FlatList
        data={hotels}
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