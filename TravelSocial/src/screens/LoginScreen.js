import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  Alert
} from 'react-native';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_BASE_URL } from "../config/api";

export default function LoginScreen({ navigation }) {

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!mobile || !password) {
      return Alert.alert("Error", "Please fill all fields");
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, password }),
      });

      const data = await res.json();
      console.log("LOGIN RESPONSE:", data);

      if (res.status === 200) {
        await AsyncStorage.setItem("token", data.token);
        await AsyncStorage.setItem("user", JSON.stringify(data.user));

        Alert.alert("Success", "Login successful!");
        navigation.replace("MainTabs");
      } else {
        Alert.alert("Login Failed", data.msg || "Invalid credentials");
      }

    } catch (error) {
      Alert.alert("Error", "Cannot connect to server!!!!!");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#F3F4F6' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">

        <Text style={styles.title}>Welcome back 👋</Text>
        <Text style={styles.subtitle}>Login to continue your journey</Text>

        {/* Mobile Number */}
        <AppInput
          color="#000"

          placeholder="Mobile Number"
          keyboardType="phone-pad"
          maxLength={10}
          value={mobile}
          onChangeText={setMobile}
          icon={<Ionicons name="call-outline" size={20} color="#6B7280" />}
        />

        {/* Password */}
        <AppInput
          color="#000"

          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          icon={<Ionicons name="lock-closed-outline" size={20} color="#6B7280" />}
        />

        {/* Forgot Password */}
        <Pressable style={styles.forgotContainer} onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </Pressable>

        {/* Login Button */}
        <AppButton title="Login" onPress={handleLogin} />

        {/* Signup Link */}
        <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>
          Don’t have an account? Sign up
        </Text>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, paddingTop: 80 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#6B7280', marginBottom: 24 },
  forgotContainer: { width: '100%', alignItems: 'flex-end', marginVertical: 6 },
  forgotText: { color: '#2563EB', fontSize: 14, fontWeight: '600' },
  link: { textAlign: 'center', color: '#2563EB', marginTop: 18, fontWeight: '500' },
});
