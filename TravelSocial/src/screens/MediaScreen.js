import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";

/* ===== APP THEME (SAME AS PROFILE) ===== */
const COLORS = {
  bg: "#0A0A1A",
  card: "#13142B",
  border: "rgba(58,0,255,0.35)",
  text: "#FFFFFF",
  subText: "#9EA3C8",
  blue: "#3A00FF",
};

const { width } = Dimensions.get("window");

const ITEM_GAP = 6;
const ITEM_SIZE = (width - ITEM_GAP * 4) / 3;
const ITEM_HEIGHT = ITEM_SIZE * 1.15;

export default function MediaScreen() {
  const photos = [
    { id: "1", url: "https://via.placeholder.com/600", location: "Delhi" },
    { id: "2", url: "https://via.placeholder.com/600", location: "Jaipur" },
    { id: "3", url: "https://via.placeholder.com/600" },
    { id: "4", url: "https://via.placeholder.com/600", location: "Goa" },
    { id: "5", url: "https://via.placeholder.com/600" },
    { id: "6", url: "https://via.placeholder.com/600", location: "Manali" },
  ];

  const safePhotos = Array.isArray(photos) ? photos : [];

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <Text style={styles.title}>📸 Travel Media</Text>
        <Text style={styles.countText}>
          {safePhotos.length} Photos
        </Text>
      </View>

      {/* ===== GRID (FlatList but scroll disabled) ===== */}
      <FlatList
        data={safePhotos}
        keyExtractor={(item, index) => item.id || index.toString()}
        numColumns={3}
        scrollEnabled={false}   // ✅ IMPORTANT
        contentContainerStyle={styles.grid}
        columnWrapperStyle={{ gap: ITEM_GAP }}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.item}
          >
            <Image
              source={{ uri: item.url }}
              style={styles.image}
              resizeMode="cover"
            />

            {item.location && (
              <View style={styles.locationBox}>
                <Text style={styles.locationText}>
                  {item.location}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
}

/* =========================
   STYLES
   ========================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 14,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },

  countText: {
    fontSize: 12,
    color: COLORS.subText,
    marginTop: 2,
  },

  grid: {
    paddingHorizontal: ITEM_GAP,
    paddingBottom: 50,
  },

  item: {
    width: ITEM_SIZE,
    height: ITEM_HEIGHT,
    marginBottom: ITEM_GAP,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: COLORS.card,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  locationBox: {
    position: "absolute",
    bottom: 8,
    left: 8,
    backgroundColor: "rgba(0,0,0,0.55)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  locationText: {
    fontSize: 10,
    color: COLORS.text,
  },
});