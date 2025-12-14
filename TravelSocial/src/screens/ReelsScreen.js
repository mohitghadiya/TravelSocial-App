import React from 'react';
import { FlatList, ImageBackground, StyleSheet, View, Text, Dimensions } from 'react-native';
import { reels } from '../constants/dummyData';

const { height } = Dimensions.get('window');

export default function ReelsScreen() {
  return (
    <FlatList
      data={reels}
      keyExtractor={item => item.id}
      pagingEnabled
      renderItem={({ item }) => (
        <ImageBackground source={{ uri: item.thumbnail }} style={styles.reel}>
          <View style={styles.overlay}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.caption}>Reels placeholder (no real video yet)</Text>
          </View>
        </ImageBackground>
      )}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  reel: { width: '100%', height, justifyContent: 'flex-end' },
  overlay: { padding: 20, backgroundColor: 'rgba(0,0,0,0.3)' },
  title: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  caption: { color: 'white', fontSize: 12 },
});