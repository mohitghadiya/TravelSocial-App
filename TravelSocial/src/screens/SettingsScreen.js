import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  // Dynamic styles generated using isDark
  const styles = dynamicStyles(isDark);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Dark Mode</Text>
        <Switch value={isDark} onValueChange={toggleTheme} />
      </View>

      <Text style={styles.note}>
        More settings (notifications, language, etc.) can go here later.
      </Text>
    </View>
  );
}

// 🔥 Dynamic styles
const dynamicStyles = (isDark) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
      backgroundColor: isDark ? '#0f172a' : '#F3F4F6',
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 10,
      color: isDark ? '#fff' : '#000',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 10,
    },
    label: {
      fontSize: 16,
      color: isDark ? '#e2e8f0' : '#000',
    },
    note: {
      marginTop: 20,
      color: isDark ? '#94a3b8' : '#6B7280',
      fontSize: 13,
    },
  });
