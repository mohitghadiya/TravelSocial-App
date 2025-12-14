import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Avatar from './Avatar';
import AppCard from './AppCard';

const { width } = Dimensions.get('window');
const imageHeight = Math.min(320, width * 0.9);

export default function PostCard({ post }) {
  return (
    <AppCard>
      <View style={styles.header}>
        <Avatar size={36} />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.userName}>{post.userName}</Text>
          <Text style={styles.location}>{post.location}</Text>
        </View>
      </View>

      <Image source={{ uri: post.image }} style={[styles.image, { height: imageHeight }]} />
      <Text style={styles.caption}>{post.caption}</Text>
      <Text style={styles.likes}>❤️ {post.likes} likes</Text>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  userName: { fontWeight: 'bold', fontSize: 15 },
  location: { fontSize: 12, color: '#6B7280' },
  image: { width: '100%', borderRadius: 14, marginVertical: 8, backgroundColor: '#E5E7EB' },
  caption: { fontSize: 14, marginTop: 4 },
  likes: { fontSize: 12, color: '#6B7280', marginTop: 4 },
});