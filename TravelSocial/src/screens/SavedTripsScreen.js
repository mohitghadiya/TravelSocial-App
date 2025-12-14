import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SavedTripsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved trips</Text>
      <Text style={styles.text}>
        UI placeholder — later you can show saved hotels, packages, and itineraries here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#F3F4F6' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 14 },
});