import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';

export default function ChatScreen({ route }) {
  const { chat } = route.params;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#F3F4F6' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Chat with {chat.name}</Text>
        <ScrollView style={styles.messages} contentContainerStyle={{ paddingBottom: 16 }}>
          <Text style={styles.bubbleLeft}>Hey, when is the next trip? 😄</Text>
          <Text style={styles.bubbleRight}>Soon! Planning Goa again 🔥</Text>
        </ScrollView>
        <AppInput placeholder="Type a message..." />
        <AppButton title="Send (UI only)" onPress={() => {}} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  messages: { flex: 1, marginVertical: 10 },
  bubbleLeft: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E7EB',
    padding: 10,
    borderRadius: 12,
    marginBottom: 6,
    maxWidth: '80%',
  },
  bubbleRight: {
    alignSelf: 'flex-end',
    backgroundColor: '#2563EB',
    padding: 10,
    borderRadius: 12,
    marginBottom: 6,
    maxWidth: '80%',
    color: '#FFFFFF',
  },
});