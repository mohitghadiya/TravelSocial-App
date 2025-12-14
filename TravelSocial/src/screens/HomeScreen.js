import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import { posts } from '../constants/dummyData';
import PostCard from '../components/PostCard';
import AppCard from '../components/AppCard';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <AppCard style={styles.banner} onPress={() => navigation.navigate('Hotels')}>
        <Text style={styles.bannerTitle}>Plan your next trip</Text>
        <Text style={styles.bannerSub}>Discover hotels, destinations and more.</Text>
        <Text style={styles.bannerCta}>Tap to view hotels →</Text>
      </AppCard>

      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <PostCard post={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#F3F4F6' },
  banner: {
    marginBottom: 16,
    backgroundColor: '#2563EB',
  },
  bannerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  bannerSub: { color: '#E5E7EB', marginTop: 4 },
  bannerCta: { color: '#BFDBFE', marginTop: 8, fontWeight: '500' },
});