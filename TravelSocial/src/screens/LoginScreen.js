// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from "react-native";

// import Icon from "react-native-vector-icons/Ionicons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { API_BASE_URL } from "../config/api";

// import { colors } from '../theme/colors';


// export default function LoginScreen({ navigation }) {
//   const [mobile, setMobile] = useState("");
//   const [password, setPassword] = useState("");
//   const [secure, setSecure] = useState(true);
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     if (!mobile || !password) {
//       return Alert.alert("Error", "All fields are required");
//     }

//     try {
//       setLoading(true);

//       const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ mobile, password }),
//       });

//       const data = await res.json();
//       setLoading(false);

//       if (!res.ok) {
//         return Alert.alert("Login Failed", data.msg || "Invalid credentials");
//       }

//       // Save auth
//       await AsyncStorage.setItem("token", data.token);
//       await AsyncStorage.setItem("user", JSON.stringify(data.user));

//       Alert.alert("Success", "Login successful");
//       navigation.replace("MainTabs");

//     } catch (error) {
//       setLoading(false);
//       Alert.alert("Error", "Cannot connect to server");
//     }
//   };

//   // return (
//   //   <View style={styles.container}>
//   //     <View style={styles.card}>
//   //       <Text style={styles.title}>Welcome Back 👋</Text>

//   //       {/* MOBILE */}
//   //       <View style={styles.inputWrapper}>
//   //         <Icon name="call-outline" size={20} color="#9CA3AF" />
//   //         <TextInput
//   //           placeholder="Mobile Number"
//   //           placeholderTextColor="#9CA3AF"
//   //           style={styles.input}
//   //           keyboardType="phone-pad"
//   //           maxLength={10}
//   //           value={mobile}
//   //           onChangeText={setMobile}
//   //         />
//   //       </View>

//   //       {/* PASSWORD */}
//   //       <View style={styles.inputWrapper}>
//   //         <Icon name="lock-closed-outline" size={20} color="#9CA3AF" />
//   //         <TextInput
//   //           placeholder="Password"
//   //           placeholderTextColor="#9CA3AF"
//   //           style={styles.input}
//   //           secureTextEntry={secure}
//   //           value={password}
//   //           onChangeText={setPassword}
//   //         />
//   //         <TouchableOpacity onPress={() => setSecure(!secure)}>
//   //           <Icon
//   //             name={secure ? "eye-outline" : "eye-off-outline"}
//   //             size={18}
//   //             color="#9CA3AF"
//   //           />
//   //         </TouchableOpacity>
//   //       </View>

//   //       {/* FORGOT */}
//   //       <TouchableOpacity style={styles.forgot}>
//   //         <Text style={styles.forgotText}>Forgot Password?</Text>
//   //       </TouchableOpacity>

//   //       {/* LOGIN BUTTON */}
//   //       <TouchableOpacity
//   //         style={styles.button}
//   //         onPress={handleLogin}
//   //         disabled={loading}
//   //       >
//   //         <Text style={styles.buttonText}>
//   //           {loading ? "Logging in..." : "Login"}
//   //         </Text>
//   //       </TouchableOpacity>

//   //       {/* SIGNUP */}
//   //       <Text style={styles.footer}>
//   //         Don’t have an account?{" "}
//   //         <Text
//   //           style={styles.link}
//   //           onPress={() => navigation.navigate("Signup")}
//   //         >
//   //           Sign up
//   //         </Text>
//   //       </Text>
//   //     </View>
//   //   </View>
//   // );
//   return (
//     <View style={styles.container}>
//       <View style={styles.card}>
//         <Text style={styles.title}>Hello,</Text>
//         <Text style={styles.subtitle}>Welcome Back</Text>

//         {/* MOBILE */}
//         <View style={styles.inputWrapper}>
//           <Icon name="call-outline" size={20} color={colors.muted} />
//           <TextInput
//             placeholder="Mobile number"
//             placeholderTextColor={colors.muted}
//             style={styles.input}
//             keyboardType="phone-pad"
//             maxLength={10}
//             value={mobile}
//             onChangeText={setMobile}
//           />
//         </View>

//         {/* PASSWORD */}
//         <View style={styles.inputWrapper}>
//           <Icon name="lock-closed-outline" size={20} color={colors.muted} />
//           <TextInput
//             placeholder="Password"
//             placeholderTextColor={colors.muted}
//             style={styles.input}
//             secureTextEntry={secure}
//             value={password}
//             onChangeText={setPassword}
//           />

//           {/* login button */}
//           <TouchableOpacity
//             style={styles.button}
//             onPress={handleLogin}
//             disabled={loading}
//           >
//             <Icon
//               name={secure ? 'eye-outline' : 'eye-off-outline'}
//               size={18}
//               color={colors.muted}
//             />
//           </TouchableOpacity>
//         </View>





//         <TouchableOpacity>
//           <Text style={styles.forgot}>Forgot password?</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => navigation.navigate('MainTabs')}
//         >
//           <Text style={styles.buttonText}>Login</Text>
//         </TouchableOpacity>

//         <Text style={styles.footer}>
//           Don’t have an account?{' '}
//           <Text
//             style={styles.link}
//             onPress={() => navigation.navigate('Signup')}
//           >
//             Sign up
//           </Text>
//         </Text>
//       </View>
//     </View>
//   );
// }



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
//     shadowColor: colors.primaryPink,
//     shadowOpacity: 0.4,
//     shadowRadius: 30,
//     elevation: 20,
//   },

//   title: {
//     color: colors.text,
//     fontSize: 26,
//     fontWeight: '700',
//   },

//   subtitle: {
//     color: colors.text,
//     fontSize: 22,
//     fontWeight: '700',
//     marginBottom: 20,
//   },

//   inputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: colors.border,
//     borderRadius: 14,
//     paddingHorizontal: 12,
//     marginBottom: 14,
//     backgroundColor: '#000',
//   },

//   input: {
//     flex: 1,
//     paddingVertical: 14,
//     paddingHorizontal: 10,
//     color: colors.text,
//     fontSize: 15,
//   },

//   forgot: {
//     color: colors.muted,
//     textAlign: 'right',
//     marginBottom: 20,
//   },

//   button: {
//     backgroundColor: colors.button,
//     padding: 16,
//     borderRadius: 14,
//     marginTop: 10,
//   },

//   buttonText: {
//     color: '#000',
//     fontWeight: '700',
//     textAlign: 'center',
//     fontSize: 16,
//   },

//   footer: {
//     color: colors.muted,
//     textAlign: 'center',
//     marginTop: 20,
//   },

//   link: {
//     color: colors.primaryPink,
//     fontWeight: '600',
//   },
// });






import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../config/api";
import { colors } from "../theme/colors";

export default function LoginScreen({ navigation }) {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!mobile || !password) {
      return Alert.alert("Error", "All fields are required");
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        return Alert.alert("Login Failed", data.msg || "Invalid credentials");
      }

      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("user", JSON.stringify(data.user));

      Alert.alert("Success", "Login successful");
      navigation.replace("MainTabs");

    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Cannot connect to server");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Hello,</Text>
        <Text style={styles.subtitle}>Welcome Back</Text>

        {/* MOBILE */}
        <View style={styles.inputWrapper}>
          <Icon name="call-outline" size={20} color={colors.muted} />
          <TextInput
            placeholder="Mobile number"
            placeholderTextColor={colors.muted}
            style={styles.input}
            keyboardType="phone-pad"
            maxLength={10}
            value={mobile}
            onChangeText={setMobile}
          />
        </View>

        {/* PASSWORD */}
        <View style={styles.inputWrapper}>
          <Icon name="lock-closed-outline" size={20} color={colors.muted} />
          <TextInput
            placeholder="Password"
            placeholderTextColor={colors.muted}
            style={styles.input}
            secureTextEntry={secure}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setSecure(!secure)}>
            <Icon
              name={secure ? "eye-outline" : "eye-off-outline"}
              size={18}
              color={colors.muted}
            />
          </TouchableOpacity>
        </View>

        {/* FORGOT */}
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot password?</Text>
        </TouchableOpacity>

        {/* LOGIN BUTTON */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Logging in..." : "Login"}
          </Text>
        </TouchableOpacity>

        {/* SIGNUP */}
        <Text style={styles.footer}>
          Don’t have an account?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Signup")}
          >
            Sign up
          </Text>
        </Text>
      </View>
    </View>
  );
}

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
    shadowColor: colors.primaryPink,
    shadowOpacity: 0.4,
    shadowRadius: 30,
    elevation: 20,
  },

  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: "700",
  },

  subtitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 12,
    marginBottom: 14,
    backgroundColor: "#000",
  },

  input: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 10,
    color: colors.text,
    fontSize: 15,
  },

  forgot: {
    color: colors.muted,
    textAlign: "right",
    marginBottom: 20,
  },

  button: {
    backgroundColor: colors.button,
    padding: 16,
    borderRadius: 14,
    marginTop: 10,
  },

  buttonText: {
    color: "#000",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 16,
  },

  footer: {
    color: colors.muted,
    textAlign: "center",
    marginTop: 20,
  },

  link: {
    color: colors.primaryPink,
    fontWeight: "600",
  },
});
