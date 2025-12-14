import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { trips } from '../constants/dummyData';
import AppCard from '../components/AppCard';
import AppButton from '../components/AppButton';

export default function TripPlannerScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your trips</Text>

      <FlatList
        data={trips}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <AppCard>
            <Text style={styles.tripTitle}>{item.title}</Text>
            <Text style={styles.tripMeta}>
              {item.destination} • {item.days} days
            </Text>
          </AppCard>
        )}
        showsVerticalScrollIndicator={false}
      />

      <AppButton title="Create new trip (UI only)" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#F3F4F6' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  tripTitle: { fontSize: 16, fontWeight: 'bold' },
  tripMeta: { fontSize: 12, color: '#6B7280' },
});