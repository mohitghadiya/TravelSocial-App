import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTrips } from "../context/TripContext";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

/* ===== COLORS ===== */
const COLORS = {
  bg: "#0B0B14",
  card: "#141526",
  border: "rgba(255,255,255,0.08)",
  text: "#FFFFFF",
  subText: "rgba(255,255,255,0.55)",
  blue: "#6A7CFF",
  pink: "#FF7EB6",
  danger: "#FF6B6B",
};

export default function AddTripScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { addTrip, updateTrip } = useTrips();

  const editingTrip = route.params?.trip;

  /* ===== STATES ===== */
  const [title, setTitle] = useState(editingTrip?.title || "");
  const [from, setFrom] = useState(editingTrip?.from || "");
  const [to, setTo] = useState(editingTrip?.to || "");

  const [startDate, setStartDate] = useState(
    editingTrip?.startDate ? new Date(editingTrip.startDate) : null
  );
  const [endDate, setEndDate] = useState(
    editingTrip?.endDate ? new Date(editingTrip.endDate) : null
  );

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  /* ===== FORMAT DATE ===== */
  const formatDate = (date) =>
    date ? date.toISOString().split("T")[0] : "";

  /* ===== VALIDATION ===== */
  const validate = () => {
    if (!title.trim()) {
      Alert.alert("Validation", "Trip title is required");
      return false;
    }
    if (!from.trim() || !to.trim()) {
      Alert.alert("Validation", "From and To locations are required");
      return false;
    }
    if (!startDate) {
      Alert.alert("Validation", "Start date is required");
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (startDate < today) {
      Alert.alert("Validation", "Start date cannot be in the past");
      return false;
    }

    if (endDate && endDate < startDate) {
      Alert.alert("Validation", "End date cannot be before start date");
      return false;
    }

    return true;
  };

  /* ===== SAVE ===== */
  const onSave = () => {
    if (!validate()) return;

    const tripData = {
      id: editingTrip?.id || Date.now().toString(),
      title,
      from,
      to,
      startDate: formatDate(startDate),
      endDate: endDate ? formatDate(endDate) : null,
      status: "Ongoing",
    };

    editingTrip ? updateTrip(tripData) : addTrip(tripData);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color={COLORS.text} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          {editingTrip ? "Edit Trip" : "Add Trip"}
        </Text>

        <TouchableOpacity onPress={onSave}>
          <Text style={styles.saveHeaderText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Field label="Trip Title" value={title} onChange={setTitle} />
        <Field label="From" value={from} onChange={setFrom} />
        <Field label="To" value={to} onChange={setTo} />

        <DateField
          label="Start Date"
          value={startDate}
          onPress={() => setShowStartPicker(true)}
        />

        <DateField
          label="End Date (Optional)"
          value={endDate}
          onPress={() => setShowEndPicker(true)}
        />
      </ScrollView>

      {/* DATE PICKERS */}
      {showStartPicker && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          minimumDate={new Date()}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(e, date) => {
            setShowStartPicker(false);
            if (date) setStartDate(date);
          }}
        />
      )}

      {showEndPicker && (
        <DateTimePicker
          value={endDate || startDate || new Date()}
          minimumDate={startDate || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(e, date) => {
            setShowEndPicker(false);
            if (date) setEndDate(date);
          }}
        />
      )}
    </SafeAreaView>
  );
}

/* ===== INPUT FIELD ===== */
const Field = ({ label, value, onChange }) => (
  <View style={styles.field}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      value={value}
      onChangeText={onChange}
      style={styles.input}
      placeholderTextColor={COLORS.subText}
    />
  </View>
);

/* ===== DATE FIELD ===== */
const DateField = ({ label, value, onPress }) => (
  <View style={styles.field}>
    <Text style={styles.label}>{label}</Text>
    <TouchableOpacity style={styles.input} onPress={onPress}>
      <Text style={{ color: value ? COLORS.text : COLORS.subText }}>
        {value ? value.toISOString().split("T")[0] : "Select date"}
      </Text>
      <Ionicons
        name="calendar-outline"
        size={18}
        color={COLORS.subText}
        style={styles.calendarIcon}
      />
    </TouchableOpacity>
  </View>
);

/* ===== STYLES ===== */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.6,
    borderBottomColor: COLORS.border,
  },

  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },

  saveHeaderText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.blue,
  },

  container: { flex: 1 },
  content: { padding: 16 },

  field: { marginBottom: 18 },
  label: { color: COLORS.subText, marginBottom: 6 },

  input: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    color: COLORS.text,
    borderWidth: 0.6,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  calendarIcon: { marginLeft: 8 },
});