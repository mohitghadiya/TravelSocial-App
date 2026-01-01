// // import React, { useState, useRef, useEffect } from 'react';
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   StyleSheet,
// //   Dimensions,
// //   Animated,
// //   ScrollView,
// //   KeyboardAvoidingView,
// //   Platform,
// //   Pressable,
// //   Alert,
// //   Easing
// // } from 'react-native';
// // import Icon from 'react-native-vector-icons/Ionicons';
// // import { colors } from '../theme/color';
// // import OtpScreen from '../screens/OtpScreen';


// // const { width } = Dimensions.get('window');
// // const isSmallDevice = width < 375;

// // // Simple Gradient Component
// // const SimpleGradient = ({ colors: gradientColors, style, children }) => {
// //   const getAdjustedColors = () => {
// //     if (gradientColors.length === 1) return [gradientColors[0], gradientColors[0], gradientColors[0]];
// //     if (gradientColors.length === 2) return [gradientColors[0], gradientColors[1], gradientColors[1]];
// //     return gradientColors;
// //   };
  
// //   const adjustedColors = getAdjustedColors();
  
// //   return (
// //     <View style={[style, { overflow: 'hidden', position: 'relative' }]}>
// //       <View style={{
// //         position: 'absolute',
// //         top: 0,
// //         left: 0,
// //         right: 0,
// //         bottom: 0,
// //         backgroundColor: adjustedColors[0],
// //       }} />
// //       <View style={{
// //         position: 'absolute',
// //         top: 0,
// //         left: 0,
// //         right: 0,
// //         bottom: 0,
// //         backgroundColor: adjustedColors[1] || adjustedColors[0],
// //         opacity: 0.6,
// //       }} />
// //       <View style={{
// //         position: 'absolute',
// //         top: 0,
// //         left: 0,
// //         right: 0,
// //         bottom: 0,
// //         backgroundColor: adjustedColors[2] || adjustedColors[1] || adjustedColors[0],
// //         opacity: 0.3,
// //       }} />
// //       {children}
// //     </View>
// //   );
// // };

// // export default function SignupScreen({ navigation }) {
// //   const [name, setName] = useState('');
// //   const [mobile, setMobile] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [confirmPassword, setConfirmPassword] = useState('');
// //   const [secure, setSecure] = useState(true);
// //   const [confirmSecure, setConfirmSecure] = useState(true);
// //   const [acceptedTerms, setAcceptedTerms] = useState(false);
// //   const [isLoading, setIsLoading] = useState(false);

// //   // Animation values
// //   const fadeAnim = useRef(new Animated.Value(0)).current;
// //   const slideAnim = useRef(new Animated.Value(50)).current;
// //   const scaleAnim = useRef(new Animated.Value(0.95)).current;
// //   const buttonScale = useRef(new Animated.Value(1)).current;
// //   const rotateAnim = useRef(new Animated.Value(0)).current;

// //   useEffect(() => {
// //     // Entrance animations
// //     Animated.parallel([
// //       Animated.timing(fadeAnim, {
// //         toValue: 1,
// //         duration: 800,
// //         useNativeDriver: true,
// //         easing: Easing.out(Easing.cubic)
// //       }),
// //       Animated.timing(slideAnim, {
// //         toValue: 0,
// //         duration: 800,
// //         useNativeDriver: true,
// //         easing: Easing.out(Easing.cubic)
// //       }),
// //       Animated.timing(scaleAnim, {
// //         toValue: 1,
// //         duration: 800,
// //         useNativeDriver: true,
// //         easing: Easing.out(Easing.cubic)
// //       })
// //     ]).start();
// //   }, []);

// //   // Loading animation
// //   useEffect(() => {
// //     if (isLoading) {
// //       Animated.loop(
// //         Animated.timing(rotateAnim, {
// //           toValue: 1,
// //           duration: 1000,
// //           easing: Easing.linear,
// //           useNativeDriver: true,
// //         })
// //       ).start();
// //     } else {
// //       rotateAnim.setValue(0);
// //     }
// //   }, [isLoading]);

// //   const handlePressIn = () => {
// //     Animated.spring(buttonScale, {
// //       toValue: 0.95,
// //       useNativeDriver: true,
// //       friction: 3,
// //       tension: 40
// //     }).start();
// //   };

// //   const handlePressOut = () => {
// //     Animated.spring(buttonScale, {
// //       toValue: 1,
// //       useNativeDriver: true,
// //       friction: 3,
// //       tension: 40
// //     }).start();
// //   };

// //   const validatePassword = (pass) => {
// //     const requirements = [
// //       { test: pass.length >= 8, message: "At least 8 characters" },
// //       { test: /[A-Z]/.test(pass), message: "One uppercase letter" },
// //       { test: /[0-9]/.test(pass), message: "One number" },
// //       { test: /[!@#$%^&*(),.?":{}|<>]/.test(pass), message: "One special character" },
// //     ];

// //     const errors = requirements.filter(req => !req.test).map(req => req.message);
// //     return {
// //       isValid: errors.length === 0,
// //       errors,
// //       strength: pass.length < 4 ? 'Weak' : pass.length < 8 ? 'Fair' : errors.length > 2 ? 'Good' : 'Strong'
// //     };
// //   };

// //   const passwordValidation = validatePassword(password);

// //   const handleSignup = () => {
// //     // Validation
// //     if (!name.trim()) {
// //       Alert.alert("Required", "Please enter your full name");
// //       return;
// //     }

// //     if (!mobile || mobile.length !== 10) {
// //       Alert.alert("Invalid", "Please enter a valid 10-digit mobile number");
// //       return;
// //     }

// //     if (!passwordValidation.isValid) {
// //       Alert.alert("Weak Password", "Please ensure your password meets all requirements");
// //       return;
// //     }

// //     if (password !== confirmPassword) {
// //       Alert.alert("Mismatch", "Passwords do not match");
// //       return;
// //     }

// //     if (!acceptedTerms) {
// //       Alert.alert("Required", "Please accept the Terms & Conditions");
// //       return;
// //     }

// //     setIsLoading(true);
    
// //     // Simulate API call
// //     setTimeout(() => {
// //       setIsLoading(false);
// //       navigation.navigate('Otp', { 
// //         name, 
// //         mobile, 
// //         password 
// //       });
// //     }, 1500);
// //   };

// //   const rotateInterpolate = rotateAnim.interpolate({
// //     inputRange: [0, 1],
// //     outputRange: ['0deg', '360deg']
// //   });

// //   const getStrengthColor = () => {
// //     switch(passwordValidation.strength) {
// //       case 'Weak': return '#EF4444';
// //       case 'Fair': return '#F59E0B';
// //       case 'Good': return '#3B82F6';
// //       case 'Strong': return '#10B981';
// //       default: return colors.muted;
// //     }
// //   };

// //   return (
// //     <KeyboardAvoidingView
// //       style={{ flex: 1, backgroundColor: colors.bg }}
// //       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// //       keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
// //     >
// //       <ScrollView 
// //         contentContainerStyle={styles.scrollContainer}
// //         keyboardShouldPersistTaps="handled"
// //         showsVerticalScrollIndicator={false}
// //       >
// //         <Animated.View style={[
// //           styles.animatedContainer,
// //           {
// //             opacity: fadeAnim,
// //             transform: [
// //               { translateY: slideAnim },
// //               { scale: scaleAnim }
// //             ]
// //           }
// //         ]}>
// //           {/* Header Section */}
// //           <View style={styles.header}>
// //             <View style={styles.logoContainer}>
// //               <SimpleGradient
// //                 colors={[colors.primaryPink, '#EC4899', '#BE185D']}
// //                 style={styles.logoGradient}
// //               >
// //                 <Icon name="person-add-outline" size={32} color="#FFFFFF" />
// //               </SimpleGradient>
// //               <Text style={styles.appName}>Nexus</Text>
// //             </View>
            
// //             <Text style={styles.title}>Join Our Community 🌟</Text>
// //             <Text style={styles.subtitle}>Create your account to get started</Text>
// //           </View>

// //           {/* Form Container */}
// //           <View style={styles.card}>
// //             {/* Name Input */}
// //             <View style={styles.inputWrapper}>
// //               <View style={styles.inputIconContainer}>
// //                 <Icon name="person-outline" size={22} color={colors.primaryPink} />
// //               </View>
// //               <TextInput
// //                 placeholder="Full Name"
// //                 placeholderTextColor={colors.muted}
// //                 style={styles.input}
// //                 value={name}
// //                 onChangeText={setName}
// //                 selectionColor={colors.primaryPink}
// //               />
// //             </View>

// //             {/* Mobile Input */}
// //             <View style={styles.inputWrapper}>
// //               <View style={styles.inputIconContainer}>
// //                 <Icon name="call-outline" size={22} color={colors.primaryPink} />
// //               </View>
// //               <TextInput
// //                 placeholder="Mobile Number"
// //                 placeholderTextColor={colors.muted}
// //                 style={styles.input}
// //                 keyboardType="phone-pad"
// //                 value={mobile}
// //                 onChangeText={setMobile}
// //                 maxLength={10}
// //                 selectionColor={colors.primaryPink}
// //               />
// //             </View>

// //             {/* Password Input */}
// //             <View style={styles.inputWrapper}>
// //               <View style={styles.inputIconContainer}>
// //                 <Icon name="lock-closed-outline" size={22} color={colors.primaryPink} />
// //               </View>
// //               <TextInput
// //                 placeholder="Password"
// //                 placeholderTextColor={colors.muted}
// //                 style={styles.input}
// //                 secureTextEntry={secure}
// //                 value={password}
// //                 onChangeText={setPassword}
// //                 selectionColor={colors.primaryPink}
// //               />
// //               <Pressable 
// //                 onPress={() => setSecure(!secure)}
// //                 style={styles.eyeButton}
// //                 hitSlop={10}
// //               >
// //                 <Icon
// //                   name={secure ? 'eye-outline' : 'eye-off-outline'}
// //                   size={20}
// //                   color={colors.muted}
// //                 />
// //               </Pressable>
// //             </View>

// //             {/* Password Strength Indicator */}
// //             {password.length > 0 && (
// //               <View style={styles.passwordStrengthContainer}>
// //                 <View style={styles.strengthBar}>
// //                   <View style={[
// //                     styles.strengthFill,
// //                     { 
// //                       width: `${Math.min(100, password.length * 10)}%`,
// //                       backgroundColor: getStrengthColor()
// //                     }
// //                   ]} />
// //                 </View>
// //                 <Text style={[styles.strengthText, { color: getStrengthColor() }]}>
// //                   {passwordValidation.strength} Password
// //                 </Text>
// //                 {passwordValidation.errors.length > 0 && (
// //                   <View style={styles.requirementsList}>
// //                     {passwordValidation.errors.map((error, index) => (
// //                       <Text key={index} style={styles.requirementItem}>
// //                         ✗ {error}
// //                       </Text>
// //                     ))}
// //                   </View>
// //                 )}
// //               </View>
// //             )}

// //             {/* Confirm Password */}
// //             <View style={styles.inputWrapper}>
// //               <View style={styles.inputIconContainer}>
// //                 <Icon name="lock-closed-outline" size={22} color={colors.primaryPink} />
// //               </View>
// //               <TextInput
// //                 placeholder="Confirm Password"
// //                 placeholderTextColor={colors.muted}
// //                 style={styles.input}
// //                 secureTextEntry={confirmSecure}
// //                 value={confirmPassword}
// //                 onChangeText={setConfirmPassword}
// //                 selectionColor={colors.primaryPink}
// //               />
// //               <Pressable 
// //                 onPress={() => setConfirmSecure(!confirmSecure)}
// //                 style={styles.eyeButton}
// //                 hitSlop={10}
// //               >
// //                 <Icon
// //                   name={confirmSecure ? 'eye-outline' : 'eye-off-outline'}
// //                   size={20}
// //                   color={colors.muted}
// //                 />
// //               </Pressable>
// //             </View>

// //             {/* Password Match Indicator */}
// //             {confirmPassword.length > 0 && password.length > 0 && (
// //               <View style={styles.matchIndicator}>
// //                 <Icon 
// //                   name={password === confirmPassword ? "checkmark-circle" : "close-circle"} 
// //                   size={16} 
// //                   color={password === confirmPassword ? "#10B981" : "#EF4444"} 
// //                 />
// //                 <Text style={[
// //                   styles.matchText,
// //                   { color: password === confirmPassword ? "#10B981" : "#EF4444" }
// //                 ]}>
// //                   {password === confirmPassword ? "Passwords match" : "Passwords do not match"}
// //                 </Text>
// //               </View>
// //             )}

// //             {/* Terms & Conditions */}
// //             <Pressable 
// //               style={styles.termsContainer}
// //               onPress={() => setAcceptedTerms(!acceptedTerms)}
// //             >
// //               <View style={[
// //                 styles.checkbox,
// //                 acceptedTerms && styles.checkboxChecked
// //               ]}>
// //                 {acceptedTerms && (
// //                   <Icon name="checkmark" size={14} color="#FFFFFF" />
// //                 )}
// //               </View>
// //               <Text style={styles.termsText}>
// //                 I agree to the{' '}
// //                 <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
// //                 <Text style={styles.termsLink}>Privacy Policy</Text>
// //               </Text>
// //             </Pressable>

// //             {/* Sign Up Button */}
// //             <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
// //               <Pressable
// //                 onPressIn={handlePressIn}
// //                 onPressOut={handlePressOut}
// //                 onPress={handleSignup}
// //                 disabled={isLoading}
// //                 style={({ pressed }) => [
// //                   styles.buttonContainer,
// //                   pressed && styles.buttonPressed
// //                 ]}
// //               >
// //                 <SimpleGradient
// //                   colors={[colors.primaryPink, '#EC4899']}
// //                   style={styles.buttonGradient}
// //                 >
// //                   {isLoading ? (
// //                     <View style={styles.loadingContainer}>
// //                       <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
// //                         <Icon name="sync-outline" size={24} color="#FFFFFF" />
// //                       </Animated.View>
// //                       <Text style={styles.buttonText}>Creating Account...</Text>
// //                     </View>
// //                   ) : (
// //                     <>
// //                       <Text style={styles.buttonText}>Create Account</Text>
// //                       <Icon name="arrow-forward" size={20} color="#FFFFFF" style={styles.buttonIcon} />
// //                     </>
// //                   )}
// //                 </SimpleGradient>
// //               </Pressable>
// //             </Animated.View>

// //             {/* Login Link */}
// //             <View style={styles.loginContainer}>
// //               <Text style={styles.loginText}>Already have an account? </Text>
// //               <Pressable onPress={() => navigation.navigate('Login')}>
// //                 {({ pressed }) => (
// //                   <Text style={[
// //                     styles.loginLink,
// //                     pressed && styles.loginLinkPressed
// //                   ]}>
// //                     Sign In
// //                   </Text>
// //                 )}
// //               </Pressable>
// //             </View>
// //           </View>

// //           {/* Footer */}
// //           <View style={styles.footer}>
// //             <Text style={styles.footerText}>
// //               By creating an account, you agree to our{' '}
// //               <Text style={styles.footerLink}>Terms</Text> and{' '}
// //               <Text style={styles.footerLink}>Privacy Policy</Text>
// //             </Text>
// //           </View>
// //         </Animated.View>
// //       </ScrollView>
// //     </KeyboardAvoidingView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   scrollContainer: {
// //     flexGrow: 1,
// //     padding: isSmallDevice ? 16 : 24,
// //     paddingTop: isSmallDevice ? 40 : 60,
// //     paddingBottom: 40,
// //   },
// //   animatedContainer: {
// //     flex: 1,
// //   },
// //   header: {
// //     alignItems: 'center',
// //     marginBottom: 40,
// //   },
// //   logoContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginBottom: 24,
// //   },
// //   logoGradient: {
// //     width: 56,
// //     height: 56,
// //     borderRadius: 16,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     marginRight: 12,
// //   },
// //   appName: {
// //     fontSize: 28,
// //     fontWeight: '800',
// //     color: colors.text,
// //     letterSpacing: 0.5,
// //   },
// //   title: {
// //     fontSize: isSmallDevice ? 28 : 32,
// //     fontWeight: '800',
// //     color: colors.text,
// //     textAlign: 'center',
// //     marginBottom: 8,
// //     letterSpacing: 0.5,
// //   },
// //   subtitle: {
// //     fontSize: isSmallDevice ? 14 : 16,
// //     color: colors.muted,
// //     textAlign: 'center',
// //     maxWidth: 300,
// //     lineHeight: 22,
// //   },
// //   card: {
// //     backgroundColor: colors.card,
// //     borderRadius: 24,
// //     padding: isSmallDevice ? 20 : 24,
// //     marginBottom: 24,
// //     borderWidth: 1,
// //     borderColor: 'rgba(255, 255, 255, 0.1)',
// //     shadowColor: colors.primaryPink,
// //     shadowOffset: { width: 0, height: 10 },
// //     shadowOpacity: 0.3,
// //     shadowRadius: 20,
// //     elevation: 10,
// //   },
// //   inputWrapper: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     backgroundColor: 'rgba(0, 0, 0, 0.5)',
// //     borderRadius: 16,
// //     borderWidth: 1,
// //     borderColor: colors.border,
// //     marginBottom: 16,
// //     paddingHorizontal: 16,
// //     paddingVertical: 8,
// //     minHeight: 56,
// //   },
// //   inputIconContainer: {
// //     marginRight: 12,
// //     backgroundColor: 'rgba(236, 72, 153, 0.1)',
// //     padding: 8,
// //     borderRadius: 12,
// //   },
// //   input: {
// //     flex: 1,
// //     fontSize: 16,
// //     color: colors.text,
// //     paddingVertical: 12,
// //   },
// //   eyeButton: {
// //     padding: 8,
// //     marginLeft: 8,
// //   },
// //   passwordStrengthContainer: {
// //     marginBottom: 16,
// //     padding: 12,
// //     backgroundColor: 'rgba(0, 0, 0, 0.4)',
// //     borderRadius: 12,
// //     borderWidth: 1,
// //     borderColor: colors.border,
// //   },
// //   strengthBar: {
// //     height: 4,
// //     backgroundColor: colors.border,
// //     borderRadius: 2,
// //     marginBottom: 8,
// //     overflow: 'hidden',
// //   },
// //   strengthFill: {
// //     height: '100%',
// //     borderRadius: 2,
// //   },
// //   strengthText: {
// //     fontSize: 12,
// //     fontWeight: '600',
// //     marginBottom: 6,
// //   },
// //   requirementsList: {
// //     marginTop: 4,
// //   },
// //   requirementItem: {
// //     fontSize: 11,
// //     color: '#EF4444',
// //     marginVertical: 1,
// //   },
// //   matchIndicator: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginBottom: 16,
// //     paddingHorizontal: 8,
// //   },
// //   matchText: {
// //     fontSize: 12,
// //     fontWeight: '500',
// //     marginLeft: 6,
// //   },
// //   termsContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginBottom: 24,
// //     padding: 8,
// //   },
// //   checkbox: {
// //     width: 20,
// //     height: 20,
// //     borderRadius: 6,
// //     borderWidth: 2,
// //     borderColor: colors.primaryPink,
// //     marginRight: 12,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     backgroundColor: 'transparent',
// //   },
// //   checkboxChecked: {
// //     backgroundColor: colors.primaryPink,
// //   },
// //   termsText: {
// //     flex: 1,
// //     fontSize: 13,
// //     color: colors.muted,
// //     lineHeight: 18,
// //   },
// //   termsLink: {
// //     color: colors.primaryPink,
// //     fontWeight: '600',
// //   },
// //   buttonContainer: {
// //     borderRadius: 16,
// //     overflow: 'hidden',
// //     marginBottom: 24,
// //     shadowColor: colors.primaryPink,
// //     shadowOffset: { width: 0, height: 8 },
// //     shadowOpacity: 0.3,
// //     shadowRadius: 16,
// //     elevation: 8,
// //   },
// //   buttonPressed: {
// //     opacity: 0.9,
// //   },
// //   buttonGradient: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     height: 56,
// //     paddingHorizontal: 24,
// //   },
// //   loadingContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //   },
// //   buttonText: {
// //     color: '#FFFFFF',
// //     fontSize: 16,
// //     fontWeight: '600',
// //     letterSpacing: 0.5,
// //   },
// //   buttonIcon: {
// //     marginLeft: 8,
// //   },
// //   loginContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     marginTop: 8,
// //   },
// //   loginText: {
// //     color: colors.muted,
// //     fontSize: 14,
// //   },
// //   loginLink: {
// //     color: colors.primaryPink,
// //     fontSize: 14,
// //     fontWeight: '600',
// //     letterSpacing: 0.3,
// //   },
// //   loginLinkPressed: {
// //     color: '#F472B6',
// //     opacity: 0.8,
// //   },
// //   footer: {
// //     alignItems: 'center',
// //     paddingTop: 20,
// //     borderTopWidth: 1,
// //     borderTopColor: 'rgba(148, 163, 184, 0.1)',
// //   },
// //   footerText: {
// //     color: colors.muted,
// //     fontSize: 12,
// //     textAlign: 'center',
// //     lineHeight: 18,
// //   },
// //   footerLink: {
// //     color: colors.primaryPink,
// //     fontWeight: '500',
// //   },
// // });




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
// import { API_BASE_URL } from "../config/api";
// import { colors } from "../theme/colors";

// export default function SignupScreen({ navigation }) {
//   const [name, setName] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [secure, setSecure] = useState(true);
//   const [loading, setLoading] = useState(false);

//   const validatePassword = (pass) => {
//     if (pass.length < 8) return "Minimum 8 characters required";
//     if (!/[A-Z]/.test(pass)) return "One uppercase letter required";
//     if (!/[0-9]/.test(pass)) return "One number required";
//     if (!/[!@#$%^&*]/.test(pass)) return "One special character required";
//     return null;
//   };

//   const handleSignup = async () => {
//     if (!name || !mobile || !password || !confirmPassword) {
//       return Alert.alert("Error", "All fields are required");
//     }

//     if (mobile.length !== 10) {
//       return Alert.alert("Error", "Enter valid 10-digit mobile number");
//     }

//     const passError = validatePassword(password);
//     if (passError) {
//       return Alert.alert("Weak Password", passError);
//     }

//     if (password !== confirmPassword) {
//       return Alert.alert("Error", "Passwords do not match");
//     }

//     try {
//       setLoading(true);

//       const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name,
//           mobile,
//           password,
//           otp: "123456", // backend expects otp for now
//         }),
//       });

//       const data = await res.json();
//       setLoading(false);

//       if (!res.ok) {
//         return Alert.alert("Signup Failed", data.msg || "Something went wrong");
//       }

//       Alert.alert("Success", "Account created successfully");
//       navigation.replace("Login");

//     } catch (error) {
//       setLoading(false);
//       Alert.alert("Error", "Cannot connect to server");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.card}>
//         <Text style={styles.subtitle}>Create Account</Text>

//         {/* NAME */}
//         <View style={styles.inputWrapper}>
//           <Icon name="person-outline" size={20} color={colors.muted} />
//           <TextInput
//             placeholder="Full name"
//             placeholderTextColor={colors.muted}
//             style={styles.input}
//             value={name}
//             onChangeText={setName}
//           />
//         </View>

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
//           <TouchableOpacity onPress={() => setSecure(!secure)}>
//             <Icon
//               name={secure ? "eye-outline" : "eye-off-outline"}
//               size={18}
//               color={colors.muted}
//             />
//           </TouchableOpacity>
//         </View>

//         {/* CONFIRM PASSWORD */}
//         <View style={styles.inputWrapper}>
//           <Icon name="lock-closed-outline" size={20} color={colors.muted} />
//           <TextInput
//             placeholder="Confirm password"
//             placeholderTextColor={colors.muted}
//             style={styles.input}
//             secureTextEntry={secure}
//             value={confirmPassword}
//             onChangeText={setConfirmPassword}
//           />
//         </View>

//         {/* SIGNUP BUTTON */}
//         <TouchableOpacity
//           style={styles.button}
//           onPress={handleSignup}
//           disabled={loading}
//         >
//           <Text style={styles.buttonText}>
//             {loading ? "Creating account..." : "Create Account"}
//           </Text>
//         </TouchableOpacity>

//         {/* LOGIN */}
//         <Text style={styles.footer}>
//           Already have an account?{" "}
//           <Text
//             style={styles.link}
//             onPress={() => navigation.navigate("Login")}
//           >
//             Login
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
//     justifyContent: "center",
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
//   subtitle: {
//     color: colors.text,
//     fontSize: 22,
//     fontWeight: "700",
//     marginBottom: 20,
//   },
//   inputWrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: colors.border,
//     borderRadius: 14,
//     paddingHorizontal: 12,
//     marginBottom: 14,
//     backgroundColor: "#000",
//   },
//   input: {
//     flex: 1,
//     paddingVertical: 14,
//     paddingHorizontal: 10,
//     color: colors.text,
//     fontSize: 15,
//   },
//   button: {
//     backgroundColor: colors.button,
//     padding: 16,
//     borderRadius: 14,
//     marginTop: 10,
//   },
//   buttonText: {
//     color: "#000",
//     fontWeight: "700",
//     textAlign: "center",
//     fontSize: 16,
//   },
//   footer: {
//     color: colors.muted,
//     textAlign: "center",
//     marginTop: 20,
//   },
//   link: {
//     color: colors.primaryPink,
//     fontWeight: "600",
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
import { colors } from "../theme/colors";

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secure, setSecure] = useState(true);

  const validatePassword = (pass) => {
    if (pass.length < 8) return "Minimum 8 characters required";
    if (!/[A-Z]/.test(pass)) return "One uppercase letter required";
    if (!/[0-9]/.test(pass)) return "One number required";
    if (!/[!@#$%^&*]/.test(pass)) return "One special character required";
    return null;
  };

  const handleNext = () => {
    if (!name || !mobile || !password || !confirmPassword) {
      return Alert.alert("Error", "All fields are required");
    }

    if (mobile.length !== 10) {
      return Alert.alert("Error", "Enter valid 10-digit mobile number");
    }

    const passError = validatePassword(password);
    if (passError) {
      return Alert.alert("Weak Password", passError);
    }

    if (password !== confirmPassword) {
      return Alert.alert("Error", "Passwords do not match");
    }

    // ✅ Navigate to OTP Screen with data
    navigation.navigate("Otp", {
      name,
      mobile,
      password,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.subtitle}>Create Account</Text>

        <View style={styles.inputWrapper}>
          <Icon name="person-outline" size={20} color={colors.muted} />
          <TextInput
            placeholder="Full name"
            placeholderTextColor={colors.muted}
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        </View>

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

        <View style={styles.inputWrapper}>
          <Icon name="lock-closed-outline" size={20} color={colors.muted} />
          <TextInput
            placeholder="Confirm password"
            placeholderTextColor={colors.muted}
            style={styles.input}
            secureTextEntry={secure}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          Already have an account?{" "}
          <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
            Login
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

