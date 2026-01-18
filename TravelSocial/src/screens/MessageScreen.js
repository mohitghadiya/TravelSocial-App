import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const COLORS = {
  bg: "#0B0B14",
  my: "#FF006F",
  their: "#1C1D2E",
  text: "#fff",
  sub: "rgba(255,255,255,0.6)",
};

const LOGGED_IN = "me";

/* MOCK CHAT */
const INITIAL = [
  { id: "1", text: "Hey 👋", from: "them" },
  { id: "2", text: "Hi!", from: "me", seen: true },
];

export default function MessageScreen({ route, navigation }) {
  const { user } = route.params;
  const [messages, setMessages] = useState(INITIAL);
  const [text, setText] = useState("");
  const flatRef = useRef(null);

  useEffect(() => {
    flatRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const send = () => {
    if (!text.trim()) return;
    setMessages((p) => [
      ...p,
      { id: Date.now().toString(), text, from: "me", seen: false },
    ]);
    setText("");
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.name}>{user.name}</Text>
      </View>

      {/* CHAT */}
      <FlatList
        ref={flatRef}
        data={messages}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 14 }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.bubble,
              item.from === "me" ? styles.my : styles.their,
            ]}
          >
            <Text style={styles.text}>{item.text}</Text>
            {item.from === "me" && (
              <Text style={styles.seen}>
                {item.seen ? "Seen" : "Sent"}
              </Text>
            )}
          </View>
        )}
      />

      {/* INPUT */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.inputRow}>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Message…"
            placeholderTextColor={COLORS.sub}
            style={styles.input}
          />
          <TouchableOpacity onPress={send}>
            <Ionicons
              name="send"
              size={22}
              color={text ? COLORS.my : COLORS.sub}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },

  header: {
    flexDirection: "row",
    gap: 12,
    padding: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },

  name: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "600",
  },

  bubble: {
    maxWidth: "75%",
    padding: 12,
    borderRadius: 14,
    marginBottom: 8,
  },

  my: {
    backgroundColor: COLORS.my,
    alignSelf: "flex-end",
  },

  their: {
    backgroundColor: COLORS.their,
    alignSelf: "flex-start",
  },

  text: { color: "#fff" },

  seen: {
    fontSize: 10,
    color: COLORS.sub,
    marginTop: 4,
    textAlign: "right",
  },

  inputRow: {
    flexDirection: "row",
    padding: 12,
    gap: 10,
    borderTopWidth: 0.5,
    borderTopColor: "rgba(255,255,255,0.1)",
  },

  input: {
    flex: 1,
    backgroundColor: "#141526",
    borderRadius: 20,
    paddingHorizontal: 14,
    color: "#fff",
  },
});