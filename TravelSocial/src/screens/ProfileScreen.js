import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

/* TAB SCREENS */
import ActivityScreen from "./ActivityScreen";
import MapScreen from "./MapScreen";
import MediaScreen from "./MediaScreen";
import UpcomingScreen from "./UpcomingScreen";

/* LUXURY COLORS */
const COLORS = {
  bg: "#0B0B14",
  card: "#141526",
  border: "rgba(255,255,255,0.08)",
  text: "#FFFFFF",
  subText: "rgba(255,255,255,0.55)",
  blue: "#6A7CFF",
  pink: "#FF7EB6",
  gold: "#FFD37A",
  glow: "rgba(106,124,255,0.25)",
};

const BADGE_SYMBOLS = { CORE: "✦", ELITE: "✧" };

const STATUS_BAR_HEIGHT =
  Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;
const HEADER_HEIGHT = 64 + STATUS_BAR_HEIGHT;

export default function ProfileScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("Activity");
  const [isFollowing, setIsFollowing] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser({
      name: "Nishant Ahir",
      avatarUrl: "https://via.placeholder.com/300",
      bio: "Digital nomad & adventure seeker • Documenting my journey",
      followers: "12.4K",
      following: "892",
      distance: "28.5K km",
      streak: "42 days",
      badges: ["CORE", "ELITE"],
    });
  }, []);

  if (!user) return null;

  /* TAB RENDER */
  const renderTab = () => {
    switch (activeTab) {
      case "Activity":
        return <ActivityScreen />;
      case "Map":
        return <MapScreen />;
      case "Media":
        return <MediaScreen />;
      case "Plan":
        return <UpcomingScreen />;
      default:
        return null;
    }
  };

  /* HEADER CONTENT */
  const ListHeader = () => (
    <>
      {/* PROFILE */}
      <View style={styles.profileWrap}>
        <View style={styles.avatarGlow}>
          <View style={styles.avatarBorder}>
            <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
          </View>
        </View>

        <View style={styles.nameRow}>
          <Text style={styles.name}>{user.name}</Text>
          {user.badges.map((b) => (
            <Text key={b} style={styles.badgeIcon}>
              {BADGE_SYMBOLS[b]}
            </Text>
          ))}
        </View>

        <Text style={styles.bio}>{user.bio}</Text>

        <View style={styles.actionRow}>
          <GlassBtn label="Edit Profile" onPress={() => navigation.navigate("EditProfile")} />
          <GlassBtn label="Message" onPress={() => navigation.navigate("Chat")} />
          <TouchableOpacity
            style={[styles.followBtn, isFollowing && styles.followingBtn]}
            onPress={() => setIsFollowing(!isFollowing)}
          >
            <Text style={[styles.followText, isFollowing && styles.followingText]}>
              {isFollowing ? "Following" : "Follow"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* STATS */}
      <View style={styles.statsCard}>
        <Stat label="Followers" value={user.followers} />
        <Stat label="Following" value={user.following} />
        <Stat label="Distance" value={user.distance} />
        <Stat label="Streak" value={user.streak} />
      </View>

      {/* TABS */}
      <View style={styles.tabBar}>
        {["Activity", "Map", "Media", "Plan"].map((tab) => {
          const active = tab === activeTab;
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[styles.tabItem, active && styles.tabActive]}
            >
              <Text style={[styles.tabText, active && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* FIXED HEADER */}
      <View style={styles.fixedHeader}>
        <IconCircle icon="arrow-back" onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Profile</Text>
        <IconCircle icon="settings-outline" onPress={() => navigation.navigate("Settings")} />
      </View>

      {/* ✅ SINGLE SCROLL OWNER */}
      <FlatList
        data={[1]}
        renderItem={() => <View style={styles.tabContent}>{renderTab()}</View>}
        ListHeaderComponent={ListHeader}
        keyExtractor={() => "profile"}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: HEADER_HEIGHT + 16,
          paddingBottom: 60,
        }}
      />
    </SafeAreaView>
  );
}

/* COMPONENTS */
const IconCircle = ({ icon, onPress }) => (
  <TouchableOpacity style={styles.iconCircle} onPress={onPress}>
    <Ionicons name={icon} size={15} color={COLORS.text} />
  </TouchableOpacity>
);

const GlassBtn = ({ label, onPress }) => (
  <TouchableOpacity style={styles.glassBtn} onPress={onPress}>
    <Text style={styles.glassText}>{label}</Text>
  </TouchableOpacity>
);

const Stat = ({ label, value }) => (
  <View style={styles.statItem}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

/* STYLES */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },

  fixedHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    paddingTop: STATUS_BAR_HEIGHT,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.bg,
    zIndex: 100,
    borderBottomWidth: 0.6,
    borderBottomColor: COLORS.border,
  },

  headerTitle: { fontSize: 17, fontWeight: "600", color: COLORS.text },

  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 0.8,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.02)",
  },

  profileWrap: { alignItems: "center", marginTop: -10 },
  avatarGlow: { shadowColor: COLORS.glow, shadowOpacity: 0.35, shadowRadius: 22, elevation: 20 },
  avatarBorder: { borderRadius: 80, borderWidth: 1, borderColor: COLORS.blue },
  avatar: { width: 80, height: 80, borderRadius: 40 },

  nameRow: { flexDirection: "row", alignItems: "center", marginTop: 14, gap: 6 },
  name: { fontSize: 18, fontWeight: "600", color: COLORS.text },
  badgeIcon: { fontSize: 13, color: COLORS.gold },

  bio: {
    marginTop: 6,
    fontSize: 13,
    color: COLORS.subText,
    textAlign: "center",
    paddingHorizontal: 26,
  },

  actionRow: { flexDirection: "row", marginTop: 20, gap: 12 },

  glassBtn: {
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: 18,
    borderWidth: 0.6,
    borderColor: COLORS.border,
    backgroundColor: "rgba(255,255,255,0.03)",
  },

  glassText: { fontSize: 13, color: COLORS.text },

  followBtn: {
    paddingHorizontal: 26,
    paddingVertical: 11,
    borderRadius: 20,
    backgroundColor: COLORS.pink,
  },

  followText: { fontSize: 14, fontWeight: "600", color: "#000" },

  followingBtn: {
    backgroundColor: COLORS.card,
    borderWidth: 0.6,
    borderColor: COLORS.border,
  },

  followingText: { color: COLORS.subText },

  statsCard: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 16,
    marginTop: 24,
    paddingVertical: 16,
    backgroundColor: COLORS.card,
    borderRadius: 20,
    borderWidth: 0.6,
    borderColor: COLORS.border,
  },

  statItem: { alignItems: "center" },
  statValue: { fontSize: 14, fontWeight: "600", color: COLORS.text },
  statLabel: { fontSize: 11, color: COLORS.subText, marginTop: 4 },

  tabBar: {
    flexDirection: "row",
    marginTop: 26,
    marginHorizontal: 16,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 0.6,
    borderColor: COLORS.border,
  },

  tabItem: { flex: 1, paddingVertical: 11, alignItems: "center" },

  tabActive: {
    backgroundColor: "rgba(106,124,255,0.14)",
    borderRadius: 16,
  },

  tabText: { fontSize: 12, color: COLORS.subText },
  tabTextActive: { color: COLORS.blue, fontWeight: "600" },

  tabContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});