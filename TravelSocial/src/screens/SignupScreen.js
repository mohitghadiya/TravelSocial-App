import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { API_BASE_URL } from "../config/api";


const { width } = Dimensions.get("window");

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleGetOtp = async () => {
    if (!mobile) {
      return Alert.alert("Error", "Please enter mobile number first");
    }

    // TODO: call your backend to send OTP to this mobile number
    // await fetch("http://your-backend/send-otp", { ... })

    setShowOtpInput(true);
    Alert.alert("OTP Sent", "We sent an OTP to your mobile number.");
  };
  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!minLength) return "Password must be at least 8 characters";
    if (!hasUpper) return "Password must contain at least one uppercase letter";
    if (!hasNumber) return "Password must contain at least one number";
    if (!hasSpecial) return "Password must contain at least one special character";

    return null; // Valid
  };



  const handleSignup = async () => {
    if (!name || !mobile || !password || !confirmPassword || !otp) {
      return Alert.alert("Error", "All fields are required");
    }

    if (password !== confirmPassword) {
      return Alert.alert("Error", "Passwords do not match");
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      return Alert.alert("Weak Password", passwordError);
    }

    if (!acceptedTerms) {
      return Alert.alert("Error", "Please accept Terms & Conditions");
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          mobile,
          password,
          otp,
        }),
      });

      const data = await res.json();

      if (res.ok && data.msg === "Signup successful") {
        Alert.alert("Success", "Account created! Login now.");
        navigation.replace("Login");
      } else {
        Alert.alert(
          "Signup Failed",
          data.msg ?? data.error ?? "Unexpected error"
        );
      }


    } catch (error) {
      Alert.alert("Error", "Could not connect to server");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      {/* Name */}
      <View style={styles.inputRow}>
        <Ionicons name="person-outline" size={22} color="#777" />
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Mobile + Get OTP */}
      <View style={styles.inputRow}>
        <Ionicons name="call-outline" size={22} color="#777" />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Mobile Number"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
          value={mobile}
          onChangeText={setMobile}
          maxLength={10}
        />
        <Pressable style={styles.otpButton} onPress={handleGetOtp}>
          <Text style={styles.otpButtonText}>Get OTP</Text>
        </Pressable>
      </View>

      {/* OTP Input (dropdown style, appears after Get OTP) */}
      {showOtpInput && (
        <View style={styles.inputRow}>
          <Ionicons name="keypad-outline" size={22} color="#777" />
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            placeholderTextColor="#999"
            keyboardType="number-pad"
            value={otp}
            onChangeText={setOtp}
            maxLength={6}
          />
        </View>
      )}

      {/* Password */}
      <View style={styles.inputRow}>
        <Ionicons name="lock-closed-outline" size={22} color="#777" />
        <TextInput
          style={styles.input}
          color="#000"
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <Pressable onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={22}
            color="#777"
          />
        </Pressable>
      </View>

      {/* Confirm Password */}
      <View style={styles.inputRow}>
        <Ionicons name="lock-closed-outline" size={22} color="#777" />
        <TextInput
          style={styles.input}
          color="#000"
          placeholder="Confirm Password"
          placeholderTextColor="#999"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Pressable
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <Ionicons
            name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
            size={22}
            color="#777"
          />
        </Pressable>
      </View>

      {/* Terms & Conditions */}
      <View style={styles.termsRow}>
        <Pressable
          style={styles.checkbox}
          onPress={() => setAcceptedTerms(!acceptedTerms)}
        >
          {acceptedTerms && (
            <Ionicons name="checkmark" size={18} color="#007BFF" />
          )}
        </Pressable>
        <Text style={styles.termsText}>
          I accept the <Text style={styles.termsLink}>Terms & Conditions</Text>
        </Text>
      </View>

      {/* Sign Up Button */}
      <Pressable style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>

      {/* Go to Login */}
      <Pressable onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 40 },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginBottom: 12,
  },
  input: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
  },

  otpButton: {
    marginLeft: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#007BFF",
  },
  otpButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },

  termsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#007BFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  termsText: {
    fontSize: 14,
    color: "#444",
    flexShrink: 1,
  },
  termsLink: {
    color: "#007BFF",
    fontWeight: "600",
  },

  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
    width: width * 0.9,
    alignSelf: "center",
  },
  buttonText: { color: "white", fontSize: 18, fontWeight: "600" },

  link: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 14,
    color: "#007BFF",
  },
});