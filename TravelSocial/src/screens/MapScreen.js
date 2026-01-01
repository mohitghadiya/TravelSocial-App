import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

/* ===== THEME ===== */
const COLORS = {
  bg: "#0A0A1A",
  card: "#13142B",
  border: "rgba(58,0,255,0.35)",
  text: "#FFFFFF",
  subText: "#9EA3C8",
  blue: "#3A00FF",
  glow: "rgba(58,0,255,0.55)",
};

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function MapScreen() {
  const mapSummary = {
    cities: 18,
    countries: 6,
    totalDistance: "12,480 km",
    firstCity: "Jaipur",
    lastCity: "Manali",
  };

  const visitedCountries = [
    { name: "India", icon: "flag" },
    { name: "France", icon: "flag" },
    { name: "Japan", icon: "flag" },
    { name: "Thailand", icon: "flag" },
    { name: "Greece", icon: "flag" },
    { name: "+3 more", icon: "dots-horizontal" },
  ];

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      {/* HEADER */}
      <Text style={styles.screenTitle}>🌍 Travel Map</Text>
      <Text style={styles.screenSubtitle}>
        Visual overview of all the places you’ve explored
      </Text>

      {/* MAP CARD */}
      <View style={styles.mapCard}>
        <View style={styles.mapIconWrap}>
          <Ionicons name="location-sharp" size={36} color={COLORS.blue} />
          <Ionicons
            name="location-sharp"
            size={20}
            color={COLORS.blue}
            style={{ position: "absolute", left: -22, top: 12, opacity: 0.5 }}
          />
          <Ionicons
            name="location-sharp"
            size={16}
            color={COLORS.blue}
            style={{ position: "absolute", right: -22, top: 18, opacity: 0.4 }}
          />
        </View>

        <Text style={styles.mapTitle}>Your Travel Map</Text>
        <Text style={styles.mapHint}>
          Cities, routes & journeys will appear here
        </Text>
      </View>

      {/* SUMMARY */}
      <View style={styles.summaryCard}>
        <SummaryItem icon="city" label="Cities" value={mapSummary.cities} />
        <SummaryItem
          icon="earth"
          label="Countries"
          value={mapSummary.countries}
        />
        <SummaryItem
          icon="map-marker-distance"
          label="Distance"
          value={mapSummary.totalDistance}
        />
      </View>

      {/* STORY */}
      <View style={styles.storyCard}>
        <Text style={styles.sectionTitle}>Journey Story</Text>

        <StoryRow
          icon="map-marker"
          label="Started from"
          value={mapSummary.firstCity}
        />
        <StoryRow
          icon="flag-checkered"
          label="Last stop"
          value={mapSummary.lastCity}
        />
      </View>

      {/* COUNTRIES */}
      <View style={styles.countriesCard}>
        <Text style={styles.sectionTitle}>Visited Countries</Text>

        <View style={styles.countryRow}>
          {visitedCountries.map((c, i) => (
            <View key={i} style={styles.countryPill}>
              <MaterialCommunityIcons
                name={c.icon}
                size={14}
                color={COLORS.blue}
                style={{ marginRight: 6 }}
              />
              <Text style={styles.countryText}>{c.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

/* ===== SMALL COMPONENTS ===== */

const SummaryItem = ({ icon, label, value }) => (
  <View style={styles.summaryItem}>
    <MaterialCommunityIcons
      name={icon}
      size={22}
      color={COLORS.blue}
      style={{ marginBottom: 6 }}
    />
    <Text style={styles.summaryValue}>{value}</Text>
    <Text style={styles.summaryLabel}>{label}</Text>
  </View>
);

const StoryRow = ({ icon, label, value }) => (
  <View style={styles.storyRow}>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <MaterialCommunityIcons
        name={icon}
        size={16}
        color={COLORS.blue}
        style={{ marginRight: 6 }}
      />
      <Text style={styles.storyLabel}>{label}</Text>
    </View>
    <Text style={styles.storyValue}>{value}</Text>
  </View>
);

/* ===== STYLES ===== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingHorizontal: 16,
  },

  screenTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginTop: 10,
  },

  screenSubtitle: {
    fontSize: 13,
    color: COLORS.subText,
    marginBottom: 20,
  },

  mapCard: {
    height: 220,
    backgroundColor: COLORS.card,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
    shadowColor: COLORS.glow,
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 18,
  },

  mapIconWrap: {
    marginBottom: 10,
  },

  mapTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text,
    marginTop: 10,
  },

  mapHint: {
    fontSize: 12,
    color: COLORS.subText,
    marginTop: 6,
    textAlign: "center",
    paddingHorizontal: 30,
  },

  summaryCard: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 18,
    marginBottom: 22,
  },

  summaryItem: {
    flex: 1,
    alignItems: "center",
  },

  summaryValue: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
  },

  summaryLabel: {
    fontSize: 11,
    color: COLORS.subText,
    marginTop: 2,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 12,
  },

  storyCard: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 22,
  },

  storyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  storyLabel: {
    fontSize: 12,
    color: COLORS.subText,
  },

  storyValue: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.text,
  },

  countriesCard: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
  },

  countryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  countryPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "rgba(255,255,255,0.04)",
  },

  countryText: {
    fontSize: 12,
    color: COLORS.subText,
  },
});