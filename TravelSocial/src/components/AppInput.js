import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function AppInput(props) {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor="#9CA3AF"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
});