import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
  SafeAreaView,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

/* ===== LUXURY COLOR PALETTE ===== */
const COLORS = {
  bg: "#0B0B14",
  card: "#141526",
  border: "rgba(255,255,255,0.08)",

  text: "#FFFFFF",
  subText: "rgba(255,255,255,0.55)",

  blue: "#6A7CFF",      // muted royal blue
  pink: "#FF7EB6",      // soft rose
  gold: "#FFD37A",      // champagne yellow

  glowBlue: "rgba(106,124,255,0.25)",
  glowPink: "rgba(255,126,182,0.25)",

  success: "#6EE7B7",
};

const STATUS_BAR_HEIGHT =
  Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;

export default function EditProfileScreen() {
  const navigation = useNavigation();

  const [avatar, setAvatar] = useState("https://via.placeholder.com/300");
  const [name, setName] = useState("Nishant Ahir");
  const [username, setUsername] = useState("nishantahir");
  const [location, setLocation] = useState("India");
  const [bio, setBio] = useState("Exploring cities, roads & real stories");
  const [saved, setSaved] = useState(false);

  const successAnim = useRef(new Animated.Value(0)).current;

  /* IMAGE PICKER */
  const pickImage = () => {
    launchImageLibrary({ mediaType: "photo", quality: 0.85 }, (res) => {
      if (res?.assets?.[0]?.uri) {
        setAvatar(res.assets[0].uri);
      }
    });
  };

  /* SAVE */
  const onSave = () => {
    setSaved(true);
    Animated.timing(successAnim, {
      toValue: 1,
      duration: 280,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      navigation.replace("Profile");
    }, 600);
  };

  /* ===== FORM CONTENT ===== */
  const renderContent = () => (
    <>
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
          <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
          <Text style={styles.successText}>Profile updated successfully</Text>
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
      <Field label="Username" value={username} onChange={setUsername} />
      <Field label="Location" value={location} onChange={setLocation} />
      <Field
        label="Bio (optional)"
        value={bio}
        onChange={setBio}
        multiline
        height={110}
      />
    </>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconCircle}
          onPress={() => navigation.replace("Profile")}
        >
          <Ionicons name="arrow-back" size={18} color={COLORS.text} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Edit Profile</Text>

        <TouchableOpacity onPress={onSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={STATUS_BAR_HEIGHT + 64}
      >
        <FlatList
          data={[1]}
          renderItem={null}
          ListHeaderComponent={renderContent}
          keyExtractor={() => "edit-profile"}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ===== FIELD ===== */
const Field = ({ label, value, onChange, multiline, height }) => (
  <View style={styles.field}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      value={value}
      onChangeText={onChange}
      multiline={multiline}
      textAlignVertical={multiline ? "top" : "center"}
      style={[
        styles.input,
        multiline && { height: height || 100 },
      ]}
      placeholderTextColor={COLORS.subText}
    />
  </View>
);

/* ===== STYLES ===== */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },

  header: {
    height: 64 + STATUS_BAR_HEIGHT,
    paddingTop: STATUS_BAR_HEIGHT,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.6,
    borderBottomColor: COLORS.border,
  },

  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: COLORS.text,
  },

  saveText: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.pink,
  },

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

  successText: {
    fontSize: 13,
    color: COLORS.success,
  },

  avatarWrap: {
    alignItems: "center",
    marginVertical: 26,
  },

  avatarGlow: {
    shadowColor: COLORS.glowBlue,
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 18,
  },

  avatarBorder: {
    borderRadius: 70,
    borderWidth: 1,
    borderColor: COLORS.blue,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: COLORS.card,
  },

  changePhotoBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 14,
  },

  changePhotoText: {
    fontSize: 14,
    color: COLORS.subText,
  },

  field: {
    marginHorizontal: 16,
    marginBottom: 18,
  },

  label: {
    fontSize: 13,
    marginBottom: 6,
    color: COLORS.subText,
  },

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
});