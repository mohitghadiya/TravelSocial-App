import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { chats } from '../constants/dummyData';
import Avatar from '../components/Avatar';

export default function ChatListScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chats</Text>
      <FlatList
        data={chats}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate('Chat', { chat: item })}
          >
            <Avatar />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.msg}>{item.lastMessage}</Text>
            </View>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#F3F4F6' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  name: { fontSize: 16, fontWeight: 'bold' },
  msg: { fontSize: 12, color: '#6B7280' },
});