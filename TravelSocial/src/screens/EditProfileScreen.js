// import React, { useState, useRef } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   Animated,
//   SafeAreaView,
//   StatusBar,
//   Platform,
//   KeyboardAvoidingView,
//   FlatList,
// } from "react-native";
// import { launchImageLibrary } from "react-native-image-picker";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { useNavigation } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { API_BASE_URL } from "../config/api";
// import { useEffect } from "react";



// /* ===== LUXURY COLOR PALETTE ===== */
// const COLORS = {
//   bg: "#0B0B14",
//   card: "#141526",
//   border: "rgba(255,255,255,0.08)",

//   text: "#FFFFFF",
//   subText: "rgba(255,255,255,0.55)",

//   blue: "#6A7CFF",      // muted royal blue
//   pink: "#FF7EB6",      // soft rose
//   gold: "#FFD37A",      // champagne yellow

//   glowBlue: "rgba(106,124,255,0.25)",
//   glowPink: "rgba(255,126,182,0.25)",

//   success: "#6EE7B7",
// };

// const STATUS_BAR_HEIGHT =
//   Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;

// export default function EditProfileScreen() {
//   const navigation = useNavigation();
//   const [loading, setLoading] = useState(true);

//   const [avatar, setAvatar] = useState("https://via.placeholder.com/300");
//   const [username, setUsername] = useState("nishantahir");
//   const [saved, setSaved] = useState(false);

//   const [name, setName] = useState(null);
//   const [bio, setBio] = useState(null);


//   const successAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     loadProfile();

//   }, []);

//   const loadProfile = async () => {
//     try {
//       const token = await AsyncStorage.getItem("token");

//       const res = await fetch(`${API_BASE_URL}/api/profile/me`, {
//         headers: { Authorization: token },
//       });

//       const data = await res.json();

//       if (data.success) {
//         setName(data.user.name ?? "");
//         setBio(data.user.bio ?? "");
//         setAvatar(
//           data.user.avatar?.length
//             ? data.user.avatar
//             : "https://via.placeholder.com/300"
//         );
//       }
//     } catch (e) {
//       console.log(e);
//     } finally {
//       setLoading(false);
//     }
//   };



//   /* IMAGE PICKER */
//   const pickImage = () => {
//     launchImageLibrary({ mediaType: "photo", quality: 0.85 }, (res) => {
//       if (res?.assets?.[0]?.uri) {
//         setAvatar(res.assets[0].uri);
//       }
//     });
//   };

//   /* SAVE */

//   const onSave = async () => {
//     try {
//       const token = await AsyncStorage.getItem("token");

//       const res = await fetch(`${API_BASE_URL}/api/profile/me`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token,
//         },
//         body: JSON.stringify({
//           name,
//           bio,
//           avatar,
//         }),
//       });

//       const data = await res.json();

//       if (data.success) {
//         setSaved(true);

//         Animated.timing(successAnim, {
//           toValue: 1,
//           duration: 280,
//           useNativeDriver: true,
//         }).start();

//         setTimeout(() => {
//           navigation.replace("Profile");
//         }, 600);
//       } else {
//         console.log("Update failed:", data);
//       }
//     } catch (err) {
//       console.log("Update profile error:", err);
//     }
//   };



//   if (loading) {
//     return (
//       <SafeAreaView style={styles.safe}>
//         <Text style={{ color: "#fff", textAlign: "center", marginTop: 120 }}>
//           Loading profile...
//         </Text>
//       </SafeAreaView>
//     );
//   }

//   /* ===== FORM CONTENT ===== */
//   const renderContent = () => (
//     <>
//       {saved && (
//         <Animated.View
//           style={[
//             styles.successBar,
//             {
//               opacity: successAnim,
//               transform: [
//                 {
//                   translateY: successAnim.interpolate({
//                     inputRange: [0, 1],
//                     outputRange: [-8, 0],
//                   }),
//                 },
//               ],
//             },
//           ]}
//         >
//           <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
//           <Text style={styles.successText}>Profile updated successfully</Text>
//         </Animated.View>
//       )}

//       {/* AVATAR */}
//       <View style={styles.avatarWrap}>
//         <View style={styles.avatarGlow}>
//           <View style={styles.avatarBorder}>
//             <Image source={{ uri: avatar }} style={styles.avatar} />
//           </View>
//         </View>

//         <TouchableOpacity style={styles.changePhotoBtn} onPress={pickImage}>
//           <Ionicons name="camera-outline" size={18} color={COLORS.subText} />
//           <Text style={styles.changePhotoText}>Change photo</Text>
//         </TouchableOpacity>
//       </View>

//       {/* INPUTS */}
//       <Field label="Name" value={name} onChange={setName} />
//       <Field
//         label="Bio (optional)"
//         value={bio}
//         onChange={setBio}
//         multiline
//         height={110}
//       />

//     </>
//   );

//   return (
//     <SafeAreaView style={styles.safe}>
//       <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

//       {/* HEADER */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.iconCircle}
//           onPress={() => navigation.replace("Profile")}
//         >
//           <Ionicons name="arrow-back" size={18} color={COLORS.text} />
//         </TouchableOpacity>

//         <Text style={styles.headerTitle}>Edit Profile</Text>

//         <TouchableOpacity onPress={onSave}>
//           <Text style={styles.saveText}>Save</Text>
//         </TouchableOpacity>
//       </View>

//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         keyboardVerticalOffset={STATUS_BAR_HEIGHT + 64}
//       >
//         <FlatList
//           data={[1]}
//           renderItem={null}
//           ListHeaderComponent={renderContent}
//           keyExtractor={() => "edit-profile"}
//           showsVerticalScrollIndicator={false}
//           keyboardShouldPersistTaps="handled"
//           contentContainerStyle={{ paddingBottom: 40 }}
//         />
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// /* ===== FIELD ===== */

// const Field = ({
//   label,
//   value,
//   onChange,
//   placeholder,
//   multiline,
//   height,
// }) => (
//   <View style={styles.field}>
//     <Text style={styles.label}>{label}</Text>
//     <TextInput
//       key={label} // 🔥 FORCE RE-RENDER
//       value={value}
//       onChangeText={onChange}
//       placeholder={placeholder}
//       placeholderTextColor={COLORS.subText}
//       multiline={multiline}
//       textAlignVertical={multiline ? "top" : "center"}
//       style={[
//         styles.input,
//         multiline && { height: height || 100 },
//       ]}
//     />
//   </View>
// );





import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../config/api";

/* ===== COLORS ===== */
const COLORS = {
  bg: "#0B0B14",
  card: "#141526",
  border: "rgba(255,255,255,0.08)",
  text: "#FFFFFF",
  subText: "rgba(255,255,255,0.55)",
  blue: "#6A7CFF",
  pink: "#FF7EB6",
  glowBlue: "rgba(106,124,255,0.25)",
  success: "#6EE7B7",
  error: "#ff6b6b",
};

const STATUS_BAR_HEIGHT =
  Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;

const { width } = Dimensions.get("window");
const AVATAR_SIZE = width < 360 ? 90 : width < 420 ? 110 : 130;

export default function EditProfileScreen() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);

  const [avatar, setAvatar] = useState("https://via.placeholder.com/300");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [saved, setSaved] = useState(false);


    const [name, setName] = useState(null);
  const [bio, setBio] = useState(null);

  const successAnim = useRef(new Animated.Value(0)).current;

  /* ===== LOAD PROFILE ===== */
  useEffect(() => {
    loadProfile();
  }, []);

  // const loadProfile = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem("token");

  //     const res = await fetch(`${API_BASE_URL}/api/profile/me`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });

  //     const data = await res.json();

  //     if (data?.success) {
  //       setName(data.user?.name || "");
  //       setUsername(data.user?.username || "");
  //       setBio(data.user?.bio || "");
  //       setAvatar(data.user?.avatar || "https://via.placeholder.com/300");
  //     }
  //   } catch (err) {
  //     console.log("Load profile error:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


//=============================================updated======================================================
  
  const loadProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${API_BASE_URL}/api/profile/me`, {
        headers: { Authorization: token },
      });

      const data = await res.json();

      if (data.success) {
        setName(data.user.name ?? "");
        setBio(data.user.bio ?? "");
        setAvatar(
          data.user.avatar?.length
            ? data.user.avatar
            : "https://via.placeholder.com/300"
        );
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  /* ===== IMAGE PICKER ===== */
  const pickImage = () => {
    launchImageLibrary({ mediaType: "photo", quality: 0.85 }, (res) => {
      if (res?.assets?.[0]?.uri) {
        setAvatar(res.assets[0].uri);
      }
    });
  };

const validateUsername = (text) => {
  const value = text.toLowerCase().trim();
  setUsername(value);

  /*
    Rules:
    - 3–15 chars
    - a-z, 0-9, _ .
    - no start/end with dot
    - no consecutive dots
  */

  const regex = /^(?!\.)(?!.*\.\.)([a-z0-9._]{3,15})(?<!\.)$/;

  if (!value) {
    setUsernameError("Username is required");
  } else if (!regex.test(value)) {
    setUsernameError(
      "Use lowercase letters, numbers, dot & underscore (3–15 chars)"
    );
  } else {
    setUsernameError("");
  }
};


  /* ===== SAVE PROFILE ===== */
  // const onSave = async () => {
  //   if (usernameError) return;

  //   try {
  //     const token = await AsyncStorage.getItem("token");

  //     const res = await fetch(`${API_BASE_URL}/api/profile/me`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         name,
  //         username,
  //         bio,
  //         avatar,
  //       }),
  //     });

  //     const data = await res.json();

  //     if (data?.success) {
  //       setSaved(true);

  //       Animated.timing(successAnim, {
  //         toValue: 1,
  //         duration: 280,
  //         useNativeDriver: true,
  //       }).start();

  //       setTimeout(() => {
  //         navigation.replace("Profile");
  //       }, 600);
  //     }
  //   } catch (err) {
  //     console.log("Update profile error:", err);
  //   }
  // };

  // if (loading) {
  //   return (
  //     <SafeAreaView style={styles.safe}>
  //       <Text style={styles.loadingText}>Loading profile...</Text>
  //     </SafeAreaView>
  //   );
  // }



  // =============================================updated======================================================
  const onSave = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${API_BASE_URL}/api/profile/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          name,
          bio,
          avatar,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSaved(true);

        Animated.timing(successAnim, {
          toValue: 1,
          duration: 280,
          useNativeDriver: true,
        }).start();

        setTimeout(() => {
          navigation.replace("Profile");
        }, 600);
      } else {
        console.log("Update failed:", data);
      }
    } catch (err) {
      console.log("Update profile error:", err);
    }
  };



  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={{ color: "#fff", textAlign: "center", marginTop: 120 }}>
          Loading profile...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
  <StatusBar
  backgroundColor={COLORS.bg}
  barStyle="light-content"
/>


      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconCircle}
          onPress={() => navigation.replace("Profile")}
        >
          <Ionicons name="arrow-back" size={18} color={COLORS.text} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Edit Profile</Text>

        <TouchableOpacity onPress={onSave} disabled={!!usernameError}>
          <Text
            style={[
              styles.saveText,
              usernameError && { opacity: 0.4 },
            ]}
          >
            Save
          </Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
keyboardVerticalOffset={64}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* SUCCESS */}
          {saved && (
            <Animated.View
              style={[
                styles.successBar,
                {
                  opacity: successAnim,
                  transform: [
                    {
                      translateY: successAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-8, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Ionicons
                name="checkmark-circle"
                size={16}
                color={COLORS.success}
              />
              <Text style={styles.successText}>
                Profile updated successfully
              </Text>
            </Animated.View>
          )}

          {/* AVATAR */}
          <View style={styles.avatarWrap}>
            <View style={styles.avatarGlow}>
              <View style={styles.avatarBorder}>
                <Image source={{ uri: avatar }} style={styles.avatar} />
              </View>
            </View>

            <TouchableOpacity style={styles.changePhotoBtn} onPress={pickImage}>
              <Ionicons name="camera-outline" size={18} color={COLORS.subText} />
              <Text style={styles.changePhotoText}>Change photo</Text>
            </TouchableOpacity>
          </View>

          {/* INPUTS */}
          <Field label="Name" value={name} onChange={setName} />
          <Field
            label="Username"
            value={username}
            onChange={validateUsername}
            error={usernameError}
          />
          
          <Field
            label="Bio (optional)"
            value={bio}
            onChange={setBio}
            multiline
            height={110}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ===== FIELD COMPONENT ===== */
// const Field = ({ label, value, onChange, multiline, height, error }) => (
//   <View style={styles.field}>
//     <Text style={styles.label}>{label}</Text>

//     <TextInput
//       value={value}
//       onChangeText={onChange}
//       multiline={multiline}
//       autoCapitalize="none"
//       textAlignVertical={multiline ? "top" : "center"}
//       style={[
//         styles.input,
//         multiline && { height: height || 100 },
//         error && { borderColor: COLORS.error },
//       ]}
//       placeholderTextColor={COLORS.subText}
//     />

//     {error ? <Text style={styles.errorText}>{error}</Text> : null}
//   </View>
// );

//=============================================updated======================================================

// /* ===== FIELD ===== */

const Field = ({
  label,
  value,
  onChange,
  placeholder,
  multiline,
  height,
}) => (
  <View style={styles.field}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      key={label} // 🔥 FORCE RE-RENDER
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      placeholderTextColor={COLORS.subText}
      multiline={multiline}
      textAlignVertical={multiline ? "top" : "center"}
      style={[
        styles.input,
        multiline && { height: height || 100 },
      ]}
    />
  </View>
);






/* ===== STYLES ===== */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },

  loadingText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 120,
  },

 header: {
  height: 64,
  paddingHorizontal: 16,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottomWidth: 0.6,
  borderBottomColor: COLORS.border,
},


  headerTitle: { fontSize: 17, fontWeight: "600", color: COLORS.text },
  saveText: { fontSize: 15, fontWeight: "600", color: COLORS.pink },

  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 0.8,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.02)",
  },

  successBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "rgba(110,231,183,0.08)",
    borderBottomWidth: 0.6,
    borderBottomColor: COLORS.border,
  },

  successText: { fontSize: 13, color: COLORS.success },

  avatarWrap: { alignItems: "center", marginVertical: 26 },

  avatarGlow: {
    shadowColor: COLORS.glowBlue,
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 18,
  },

  avatarBorder: {
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 1,
    borderColor: COLORS.blue,
  },

  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
  },

  changePhotoBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 14,
  },

  changePhotoText: { fontSize: 14, color: COLORS.subText },

  field: { marginHorizontal: 16, marginBottom: 18 },
  label: { fontSize: 13, marginBottom: 6, color: COLORS.subText },

  input: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: COLORS.text,
    borderWidth: 0.6,
    borderColor: COLORS.border,
  },

  errorText: {
    marginTop: 6,
    fontSize: 12,
    color: COLORS.error,
  },
});