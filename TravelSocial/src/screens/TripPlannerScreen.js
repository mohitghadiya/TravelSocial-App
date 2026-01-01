import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { trips } from "../constants/dummyData";
import AppCard from "../components/AppCard";
import AppButton from "../components/AppButton";

const { width } = Dimensions.get("window");

export default function TripPlannerScreen() {
  const [showPicker, setShowPicker] = useState(false);
  const [startDate, setStartDate] = useState(null);

  const onDateChange = (_, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Trips</Text>

      {/* ===== TRIP LIST ===== */}
      <FlatList
        data={trips}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AppCard>
            <Text style={styles.tripTitle}>{item.title}</Text>
            <Text style={styles.tripMeta}>
              {item.destination} • {item.days} days
            </Text>
          </AppCard>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      {/* ===== DATE PICKER ===== */}
      {showPicker && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          minimumDate={new Date()}   // 🚫 past date blocked
          onChange={onDateChange}
        />
      )}

      {/* ===== CREATE BUTTON ===== */}
      <View style={styles.buttonWrap}>
        <AppButton
          title={
            startDate
              ? `Start: ${startDate.toDateString()}`
              : "Create new trip (UI only)"
          }
          onPress={() => setShowPicker(true)}
        />
      </View>
    </View>
  );
}

/* ===== STYLES (RESPONSIVE) ===== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.04,
    paddingTop: 20,
    backgroundColor: "#F3F4F6",
  },

  title: {
    fontSize: width > 360 ? 22 : 20,
    fontWeight: "700",
    marginBottom: 12,
  },

  tripTitle: {
    fontSize: width > 360 ? 16 : 15,
    fontWeight: "600",
  },

  tripMeta: {
    fontSize: width > 360 ? 13 : 12,
    color: "#6B7280",
    marginTop: 2,
  },

  buttonWrap: {
    position: "absolute",
    bottom: 20,
    left: width * 0.04,
    right: width * 0.04,
  },
});