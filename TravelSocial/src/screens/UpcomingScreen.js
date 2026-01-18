import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTrips } from "../context/TripContext";

/* ===== PREMIUM COLORS ===== */
const COLORS = {
  bg: "#0B0B14",
  card: "#141526",
  border: "rgba(255,255,255,0.08)",
  text: "#FFFFFF",
  subText: "rgba(255,255,255,0.55)",
  blue: "#6A7CFF",
  pink: "#FF7EB6",
  green: "#6EE7B7",
  danger: "#FF6B6B",
};

const MS_IN_DAY = 1000 * 60 * 60 * 24;

export default function UpcomingScreen() {
  const navigation = useNavigation();
  const { trips, deleteTrip, completeTrip } = useTrips();

  const [activeTab, setActiveTab] = useState("UPCOMING");

  /* 🔁 AUTO COMPLETE */
  useEffect(() => {
    const today = new Date();
    trips.forEach(trip => { 
      if (trip.endDate && trip.status !== "Completed") {
        if (today > new Date(trip.endDate)) {
          completeTrip(trip.id);
        }
      }
    });
  }, [trips]);

  /* 🔢 PROGRESS + DAYS LEFT */
  const getProgressData = (trip) => {
    const today = new Date();
    const start = new Date(trip.startDate);

    // ✅ COMPLETED
    if (trip.status === "Completed") {
      return {
        progress: 100,
        status: "Completed",
        color: COLORS.green,
        daysText: "Trip completed",
      };
    }

    // ✅ HAS END DATE
    if (trip.endDate) {
      const end = new Date(trip.endDate);

      const totalDays = Math.max(
        1,
        Math.ceil((end - start) / MS_IN_DAY)
      );

      // Trip not started yet
      if (today < start) {
        const daysToStart = Math.ceil((start - today) / MS_IN_DAY);
        return {
          progress: 0,
          status: "Planned",
          color: COLORS.blue,
          daysText: `Starts in ${daysToStart} day${daysToStart > 1 ? "s" : ""}`,
        };
      }

      // Trip ongoing
      const passedDays = Math.max(
        0,
        Math.floor((today - start) / MS_IN_DAY)
      );

      const remainingDays = Math.max(
        0,
        Math.ceil((end - today) / MS_IN_DAY)
      );

      const percent = Math.min(
        100,
        Math.round((passedDays / totalDays) * 100)
      );

      return {
        progress: percent,
        status: "Ongoing",
        color: COLORS.pink,
        daysText:
          remainingDays === 0
            ? "Last day today"
            : `${remainingDays} day${remainingDays > 1 ? "s" : ""} left`,
      };
    }

    // ✅ NO END DATE
    return {
      progress: 20,
      status: "Ongoing",
      color: COLORS.pink,
      daysText: "Ongoing trip",
    };
  };

  /* FILTER */
  const filteredTrips = trips.filter(trip =>
    activeTab === "COMPLETED"
      ? trip.status === "Completed"
      : trip.status !== "Completed"
  );

  const isEmpty = filteredTrips.length === 0;

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.content,
        isEmpty && { justifyContent: "space-between" },
      ]}
    >
      {/* ===== TOP CONTENT ===== */}
      <View>
        <View style={styles.headerRow}>
          <Text style={styles.title}>🧭 Trips</Text>
          <Text style={styles.subtitle}>
            {activeTab === "COMPLETED"
              ? "Your completed journeys"
              : "Your upcoming journeys"}
          </Text>
        </View>

        <View style={styles.toggleWrap}>
          <ToggleBtn
            label="Upcoming"
            active={activeTab === "UPCOMING"}
            onPress={() => setActiveTab("UPCOMING")}
          />
          <ToggleBtn
            label="Completed"
            active={activeTab === "COMPLETED"}
            onPress={() => setActiveTab("COMPLETED")}
          />
        </View>

        {isEmpty && (
          <Text style={styles.empty}>
            {activeTab === "COMPLETED"
              ? "No completed trips"
              : "No upcoming trips"}
          </Text>
        )}

        {!isEmpty &&
          filteredTrips.map(trip => {
            const { progress, status, color, daysText } =
              getProgressData(trip);

            const isCompleted = trip.status === "Completed";

            return (
              <View key={trip.id} style={styles.card}>
                <Text style={styles.tripTitle}>{trip.title}</Text>

                <Text style={styles.route}>
                  {trip.from || "Unknown"} → {trip.to || "Unknown"}
                </Text>

                <Text style={styles.startDate}>📅 {trip.startDate}</Text>

                {/* 🔥 DAYS LEFT TEXT */}
                <Text style={styles.daysLeft}>{daysText}</Text>

                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${progress}%`, backgroundColor: color },
                    ]}
                  />
                </View>

                <Text style={[styles.status, { color }]}>{status}</Text>

                <View style={styles.actionRow}>
                  {isCompleted ? (
                    <ActionBtn
                      label="Delete"
                      danger
                      onPress={() =>
                        Alert.alert(
                          "Delete Trip?",
                          "This cannot be undone",
                          [
                            { text: "Cancel" },
                            {
                              text: "Delete",
                              style: "destructive",
                              onPress: () => deleteTrip(trip.id),
                            },
                          ]
                        )
                      }
                    />
                  ) : (
                    <>
                      <ActionBtn
                        label="Complete"
                        onPress={() => completeTrip(trip.id)}
                      />
                      <ActionBtn
                        label="Edit"
                        onPress={() =>
                          navigation.navigate("AddTrip", { trip })
                        }
                      />
                      <ActionBtn
                        label="Delete"
                        danger
                        onPress={() =>
                          Alert.alert(
                            "Delete Trip?",
                            "This cannot be undone",
                            [
                              { text: "Cancel" },
                              {
                                text: "Delete",
                                style: "destructive",
                                onPress: () => deleteTrip(trip.id),
                              },
                            ]
                          )
                        }
                      />
                    </>
                  )}
                </View>
              </View>
            );
          })}
      </View>

      {/* ===== ADD NEW TRIP ===== */}
      {activeTab === "UPCOMING" && (
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate("AddTrip")}
        >
          <Text style={styles.addText}>＋ Plan New Trip</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

/* ===== COMPONENTS ===== */

const ToggleBtn = ({ label, active, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.toggleBtn, active && styles.toggleActive]}
  >
    <Text style={[styles.toggleText, active && styles.toggleTextActive]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const ActionBtn = ({ label, onPress, danger }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.actionBtn,
      danger && { borderColor: COLORS.danger },
    ]}
  >
    <Text
      style={[
        styles.actionText,
        danger && { color: COLORS.danger },
      ]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

/* ===== STYLES ===== */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { flexGrow: 1, padding: 16 },

  headerRow: { marginBottom: 12 },
  title: { fontSize: 16, fontWeight: "600", color: COLORS.text },
  subtitle: { fontSize: 13, color: COLORS.subText },

  toggleWrap: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderRadius: 20,
    borderWidth: 0.6,
    borderColor: COLORS.border,
    marginBottom: 20,
  },

  toggleBtn: { flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 20 },
  toggleActive: { backgroundColor: "rgba(106,124,255,0.18)" },
  toggleText: { fontSize: 13, color: COLORS.subText },
  toggleTextActive: { color: COLORS.blue, fontWeight: "600" },

  empty: { color: COLORS.subText, textAlign: "center", marginTop: 40 },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    borderWidth: 0.6,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 20,
  },

  tripTitle: { fontSize: 15, fontWeight: "600", color: COLORS.text },
  route: { fontSize: 13, color: COLORS.blue, marginTop: 4 },
  startDate: { fontSize: 12, color: COLORS.subText, marginTop: 6 },

  daysLeft: {
    fontSize: 12,
    color: COLORS.pink,
    marginTop: 6,
  },

  progressBar: {
    height: 4,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 4,
    marginTop: 10,
    overflow: "hidden",
  },

  progressFill: { height: "100%" },

  status: { fontSize: 11, fontWeight: "600", marginTop: 6 },

  actionRow: { flexDirection: "row", marginTop: 12 },

  actionBtn: {
    flex: 1,
    marginHorizontal: 4,
    borderWidth: 0.6,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingVertical: 8,
    alignItems: "center",
  },

  actionText: { fontSize: 12, color: COLORS.text },

  addBtn: {
    borderWidth: 0.6,
    borderColor: COLORS.blue,
    borderRadius: 22,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },

  addText: { fontSize: 14, color: COLORS.text },
});