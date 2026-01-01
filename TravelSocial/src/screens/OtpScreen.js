import React, { useEffect, useRef, useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';
// import { colors } from '../theme/colors';

// export default function OtpScreen({ navigation }) {
//   const inputs = useRef([]);
//   const [otp, setOtp] = useState(['', '', '', '']);
//   const [seconds, setSeconds] = useState(30);
//   const [canResend, setCanResend] = useState(false);

//   /* ================= TIMER ================= */
//   useEffect(() => {
//     if (seconds === 0) {
//       setCanResend(true);
//       return;
//     }

//     const timer = setInterval(() => {
//       setSeconds(prev => prev - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [seconds]);

//   /* ================= OTP CHANGE ================= */
//   const handleChange = (text, index) => {
//     if (!/^\d?$/.test(text)) return;

//     const newOtp = [...otp];
//     newOtp[index] = text;
//     setOtp(newOtp);

//     // 👉 auto move next
//     if (text && index < 3) {
//       inputs.current[index + 1].focus();
//     }
//   };

//   /* ================= AUTO DECREMENT (BACKSPACE) ================= */
//   const handleKeyPress = (e, index) => {
//     if (
//       e.nativeEvent.key === 'Backspace' &&
//       otp[index] === '' &&
//       index > 0
//     ) {
//       inputs.current[index - 1].focus();
//     }
//   };

//   /* ================= RESEND OTP ================= */
//   const handleResend = () => {
//     setOtp(['', '', '', '']);
//     setSeconds(30);
//     setCanResend(false);
//     inputs.current[0].focus();
//     // 🔥 yahan OTP resend API lagegi
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.card}>
//         <Text style={styles.title}>Verify OTP</Text>
//         <Text style={styles.subtitle}>
//           Enter the 4-digit code sent to your mobile
//         </Text>

//         {/* ================= OTP BOXES ================= */}
//         <View style={styles.otpRow}>
//           {otp.map((value, i) => (
//             <TextInput
//               key={i}
//               ref={ref => (inputs.current[i] = ref)}
//               style={[
//                 styles.otpBox,
//                 value && styles.otpActive,
//               ]}
//               keyboardType="number-pad"
//               maxLength={1}
//               value={value}
//               onChangeText={text => handleChange(text, i)}
//               onKeyPress={e => handleKeyPress(e, i)}
//             />
//           ))}
//         </View>

//         {/* ================= TIMER / RESEND ================= */}
//         {!canResend ? (
//           <Text style={styles.timer}>
//             Resend OTP in 00:{seconds < 10 ? `0${seconds}` : seconds}
//           </Text>
//         ) : (
//           <TouchableOpacity onPress={handleResend}>
//             <Text style={styles.resend}>Resend OTP</Text>
//           </TouchableOpacity>
//         )}

//         {/* ================= VERIFY BUTTON ================= */}
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => navigation.navigate('Login')}
//         >
//           <Text style={styles.buttonText}>Verify & Continue</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// /* ================= STYLES ================= */
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.bg,
//     justifyContent: 'center',
//     padding: 20,
//   },

//   card: {
//     backgroundColor: colors.card,
//     borderRadius: 24,
//     padding: 24,
//     shadowColor: colors.primaryBlue,
//     shadowOpacity: 0.4,
//     shadowRadius: 30,
//     elevation: 20,
//   },

//   title: {
//     color: colors.text,
//     fontSize: 22,
//     fontWeight: '700',
//     textAlign: 'center',
//   },

//   subtitle: {
//     color: colors.muted,
//     textAlign: 'center',
//     marginTop: 10,
//     marginBottom: 24,
//   },

//   otpRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },

//   otpBox: {
//     width: 60,
//     height: 60,
//     borderRadius: 14,
//     backgroundColor: '#000',
//     borderWidth: 1,
//     borderColor: colors.border,
//     textAlign: 'center',
//     fontSize: 22,
//     color: colors.text,
//   },

//   otpActive: {
//     borderColor: colors.primaryPink,
//     shadowColor: colors.primaryPink,
//     shadowOpacity: 0.6,
//     shadowRadius: 10,
//   },

//   timer: {
//     color: colors.muted,
//     textAlign: 'center',
//     marginBottom: 16,
//   },

//   resend: {
//     color: colors.primaryPink,
//     fontWeight: '600',
//     textAlign: 'center',
//     marginBottom: 16,
//   },

//   button: {
//     backgroundColor: colors.button,
//     padding: 16,
//     borderRadius: 14,
//   },

//   buttonText: {
//     color: '#000',
//     fontWeight: '700',
//     textAlign: 'center',
//   },
// });

// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import { API_BASE_URL } from "../config/api";

// const OtpScreen = ({ route, navigation }) => {
//   // 👉 data coming from Signup screen
//   // const { name, mobile, password } = route.params;
//   const { name, mobile, password } = route?.params || {};


//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);

//   // 🔹 Auto send OTP when screen opens
//   // useEffect(() => {
//   //   sendOtp();
//   // }, []);

//   useEffect(() => {
//   if (!mobile) return;
//   sendOtp();
// }, [mobile]);


//   // ================= SEND OTP =================
//   const sendOtp = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${API_BASE_URL}/api/auth/send-otp`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phone: mobile }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         Alert.alert("Error", data.message || "Failed to send OTP");
//       }
//     } catch (error) {
//       Alert.alert("Error", "Server not reachable");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= VERIFY OTP + SIGNUP =================
//   const verifyOtpAndSignup = async () => {
//     if (otp.length !== 6) {
//       return Alert.alert("Error", "Please enter a valid 6-digit OTP");
//     }

//     setLoading(true);

//     try {
//       // 🔹 Verify OTP
//       const verifyRes = await fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phone: mobile, otp }),
//       });

//       const verifyData = await verifyRes.json();

//       if (!verifyRes.ok) {
//         setLoading(false);
//         return Alert.alert("Error", verifyData.message || "Invalid OTP");
//       }

//       // 🔹 Signup after OTP verified
//       const signupRes = await fetch(`${API_BASE_URL}/api/auth/signup`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name,
//           mobile,
//           password,
//           otp,
//         }),
//       });

//       const signupData = await signupRes.json();

//       if (!signupRes.ok) {
//         setLoading(false);
//         return Alert.alert("Signup Failed", signupData.msg || "Signup error");
//       }

//       Alert.alert("Success", "Account created successfully");
//       navigation.replace("Login");

//     } catch (error) {
//       Alert.alert("Error", "Server error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= UI =================
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>OTP Verification</Text>
//       <Text style={styles.subtitle}>OTP sent to +91 {mobile}</Text>

//       <TextInput
//         placeholder="Enter OTP"
//         keyboardType="number-pad"
//         maxLength={6}
//         style={styles.input}
//         value={otp}
//         onChangeText={setOtp}
//       />

//       <TouchableOpacity
//         style={styles.button}
//         onPress={verifyOtpAndSignup}
//         disabled={loading}
//       >
//         {loading ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           <Text style={styles.buttonText}>Verify OTP</Text>
//         )}
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default OtpScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", padding: 20 },
//   title: { fontSize: 24, fontWeight: "bold", textAlign: "center" },
//   subtitle: { textAlign: "center", marginBottom: 30, color: "#555" },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 15,
//     borderRadius: 8,
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: "#007bff",
//     padding: 15,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
// });




import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { colors } from "../theme/colors";
import { API_BASE_URL } from "../config/api";

export default function OtpScreen({ route, navigation }) {
  // ✅ SAFE params (no crash)
  const { name, mobile, password } = route?.params || {};

  const inputs = useRef([]);
  const [otp, setOtp] = useState(["", "", "", ""]); // 4-digit OTP UI
  const [seconds, setSeconds] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ================= AUTO SEND OTP ================= */
  useEffect(() => {
    if (!mobile) return;
    sendOtp();
  }, [mobile]);

  /* ================= TIMER ================= */
  useEffect(() => {
    if (seconds === 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  /* ================= SEND OTP API ================= */
  const sendOtp = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: mobile }),
      });

      const data = await res.json();
      if (!res.ok) {
        Alert.alert("Error", data.message || "Failed to send OTP");
      }
    } catch (error) {
      Alert.alert("Error", "Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  /* ================= OTP INPUT ================= */
  const handleChange = (text, index) => {
    if (!/^\d?$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  /* ================= BACKSPACE ================= */
  const handleKeyPress = (e, index) => {
    if (
      e.nativeEvent.key === "Backspace" &&
      otp[index] === "" &&
      index > 0
    ) {
      inputs.current[index - 1].focus();
    }
  };

  /* ================= VERIFY OTP + SIGNUP ================= */
  const verifyOtpAndSignup = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 4) {
      return Alert.alert("Error", "Please enter valid OTP");
    }

    setLoading(true);

    try {
      // 🔹 VERIFY OTP
      const verifyRes = await fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: mobile, otp: enteredOtp }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyRes.ok) {
        return Alert.alert("Error", verifyData.message || "Invalid OTP");
      }

      // 🔹 SIGNUP AFTER OTP VERIFIED
      const signupRes = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, mobile, password }),
      });

      const signupData = await signupRes.json();
      if (!signupRes.ok) {
        return Alert.alert("Signup Failed", signupData.msg || "Signup error");
      }

      Alert.alert("Success", "Account created successfully");
      navigation.replace("Login");
    } catch (error) {
      Alert.alert("Error", "Server error");
    } finally {
      setLoading(false);
    }
  };

  /* ================= RESEND OTP ================= */
  const handleResend = () => {
    setOtp(["", "", "", ""]);
    setSeconds(30);
    setCanResend(false);
    inputs.current[0]?.focus();
    sendOtp();
  };

  // 🛑 Extra safety
  if (!mobile) {
    return (
      <View style={styles.container}>
        <Text style={{ color: colors.text }}>Invalid OTP Screen Access</Text>
      </View>
    );
  }

  /* ================= UI ================= */
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.subtitle}>
          Enter the 4-digit code sent to +91 {mobile}
        </Text>

        {/* OTP BOXES */}
        <View style={styles.otpRow}>
          {otp.map((value, i) => (
            <TextInput
              key={i}
              ref={(ref) => (inputs.current[i] = ref)}
              style={[styles.otpBox, value && styles.otpActive]}
              keyboardType="number-pad"
              maxLength={1}
              value={value}
              onChangeText={(text) => handleChange(text, i)}
              onKeyPress={(e) => handleKeyPress(e, i)}
            />
          ))}
        </View>

        {/* TIMER / RESEND */}
        {!canResend ? (
          <Text style={styles.timer}>
            Resend OTP in 00:{seconds < 10 ? `0${seconds}` : seconds}
          </Text>
        ) : (
          <TouchableOpacity onPress={handleResend}>
            <Text style={styles.resend}>Resend OTP</Text>
          </TouchableOpacity>
        )}

        {/* VERIFY BUTTON */}
        <TouchableOpacity
          style={styles.button}
          onPress={verifyOtpAndSignup}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.buttonText}>Verify & Continue</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ================= STYLES (UNCHANGED) ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 24,
    shadowColor: colors.primaryBlue,
    shadowOpacity: 0.4,
    shadowRadius: 30,
    elevation: 20,
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    color: colors.muted,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 24,
  },
  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  otpBox: {
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: "#000",
    borderWidth: 1,
    borderColor: colors.border,
    textAlign: "center",
    fontSize: 22,
    color: colors.text,
  },
  otpActive: {
    borderColor: colors.primaryPink,
    shadowColor: colors.primaryPink,
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },
  timer: {
    color: colors.muted,
    textAlign: "center",
    marginBottom: 16,
  },
  resend: {
    color: colors.primaryPink,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
  },
  button: {
    backgroundColor: colors.button,
    padding: 16,
    borderRadius: 14,
  },
  buttonText: {
    color: "#000",
    fontWeight: "700",
    textAlign: "center",
  },
});
