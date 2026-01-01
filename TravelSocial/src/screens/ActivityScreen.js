import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import Svg, {
  Polyline,
  Circle,
  Defs,
  LinearGradient,
  Stop,
  Text as SvgText,
  G,
  Rect,
} from "react-native-svg";

/* ===== THEME ===== */
const COLORS = {
  bg: "#0A0A1A",
  card: "#13142B",
  border: "rgba(58,0,255,0.35)",
  text: "#FFFFFF",
  subText: "#9EA3C8",
  blue: "#3A00FF",
  pink: "#FF2F92",
  purple: "#7B61FF",
};

/* ===== DIMENSIONS ===== */
const SCREEN_WIDTH = Dimensions.get("window").width;
const CHART_HEIGHT = 180;
const CHART_PADDING_LEFT = 56;
const DOT_GAP = 32;
const TOP_PADDING = 24;
const BOTTOM_PADDING = 24;

/* ===== DATA ===== */
const DATA_7D = [
  { label: "Mon", date: "12/25/2025", km: 25 },
  { label: "Tue", date: "12/26/2025", km: 18 },
  { label: "Wed", date: "12/27/2025", km: 6 },
  { label: "Thu", date: "12/28/2025", km: 22 },
  { label: "Fri", date: "12/29/2025", km: 9 },
  { label: "Sat", date: "12/30/2025", km: 31 },
  { label: "Sun", date: "12/31/2025", km: 14 },
];

const DATA_30D = Array.from({ length: 30 }).map((_, i) => ({
  label: `Day ${i + 1}`,
  date: `01/${i + 1}/2026`,
  km: Math.floor(Math.random() * 35) + 2,
}));

const TIMELINE = [
  { title: "Jan 2025", value: "820 km" },
  { title: "Dec 2024", value: "1,120 km" },
];

const JOURNEYS = [
  { title: "Delhi → Jaipur", value: "280 km • 2 days" },
  { title: "Mumbai → Goa", value: "590 km • 5 days" },
];

export default function ActivityScreen() {
  const [range, setRange] = useState("7D");
  const [tooltip, setTooltip] = useState(null);

  const chartData = range === "7D" ? DATA_7D : DATA_30D;

  const chartWidth =
    range === "7D"
      ? SCREEN_WIDTH - 64
      : chartData.length * DOT_GAP + CHART_PADDING_LEFT;

  const bottomLabels =
    range === "7D"
      ? chartData.map(d => d.label)
      : ["W1", "W2", "W3", "W4"];

  const { points, maxKm, dots } = useMemo(() => {
    const max = Math.max(...chartData.map(d => d.km), 1);
    const usableHeight =
      CHART_HEIGHT - TOP_PADDING - BOTTOM_PADDING;

    const pts = [];
    const dotData = [];

    chartData.forEach((d, i) => {
      const x = CHART_PADDING_LEFT + i * DOT_GAP;
      const y =
        CHART_HEIGHT -
        BOTTOM_PADDING -
        (d.km / max) * usableHeight;

      pts.push(`${x},${y}`);
      dotData.push({ ...d, x, y });
    });

    return { points: pts.join(" "), maxKm: max, dots: dotData };
  }, [chartData]);

  const LIST_DATA = [
    { type: "timelineTitle" },
    ...TIMELINE.map(i => ({ ...i, type: "timeline" })),
    { type: "journeyTitle" },
    ...JOURNEYS.map(i => ({ ...i, type: "journey" })),
  ];

  return (
    <FlatList
      data={LIST_DATA}
      keyExtractor={(_, i) => i.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        <>
          <Text style={styles.title}>📊 Travel Activity</Text>
          <Text style={styles.subtitle}>
            Clear view of how much you travel
          </Text>

          <View style={styles.rangeRow}>
            <RangeBtn label="⏱️ 7D" active={range === "7D"} onPress={() => setRange("7D")} />
            <RangeBtn label="⏱️ 30D" active={range === "30D"} onPress={() => setRange("30D")} />
          </View>

          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>📈 Distance Overview</Text>

            {/* 🔥 FIXED: FlatList instead of ScrollView */}
            <FlatList
              horizontal
              data={[1]}
              keyExtractor={(_, i) => i.toString()}
              showsHorizontalScrollIndicator={false}
              renderItem={() => (
                <Svg width={chartWidth} height={CHART_HEIGHT}>
                  <Defs>
                    <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                      <Stop offset="0%" stopColor={COLORS.pink} />
                      <Stop offset="100%" stopColor={COLORS.blue} />
                    </LinearGradient>
                  </Defs>

                  {[0, maxKm / 2, maxKm].map((v, i) => {
                    const y =
                      CHART_HEIGHT -
                      BOTTOM_PADDING -
                      (v / maxKm) *
                        (CHART_HEIGHT - TOP_PADDING - BOTTOM_PADDING);
                    return (
                      <SvgText
                        key={i}
                        x={CHART_PADDING_LEFT - 12}
                        y={y + 4}
                        fill={COLORS.subText}
                        fontSize="11"
                        textAnchor="end"
                      >
                        {Math.round(v)}
                      </SvgText>
                    );
                  })}

                  <Polyline
                    points={points}
                    stroke="url(#grad)"
                    strokeWidth="3"
                    fill="none"
                  />

                  {dots.map((d, i) => (
                    <Circle
                      key={i}
                      cx={d.x}
                      cy={d.y}
                      r={tooltip?.date === d.date ? 6 : 4}
                      fill={tooltip?.date === d.date ? COLORS.pink : COLORS.blue}
                      onPress={() => setTooltip(d)}
                    />
                  ))}

                  {tooltip && (
                    <G>
                      <Rect
                        x={tooltip.x - 44}
                        y={tooltip.y - 52}
                        width={88}
                        height={36}
                        rx={8}
                        ry={8}
                        fill={COLORS.card}
                        stroke={COLORS.border}
                      />
                      <SvgText
                        x={tooltip.x}
                        y={tooltip.y - 36}
                        fontSize="10"
                        fill={COLORS.subText}
                        textAnchor="middle"
                      >
                        {tooltip.date}
                      </SvgText>
                      <SvgText
                        x={tooltip.x}
                        y={tooltip.y - 20}
                        fontSize="12"
                        fill={COLORS.text}
                        fontWeight="600"
                        textAnchor="middle"
                      >
                        km: {tooltip.km}
                      </SvgText>
                    </G>
                  )}
                </Svg>
              )}
            />

            <View style={styles.dayRow}>
              {bottomLabels.map((label, i) => (
                <View key={i} style={{ flex: 1, alignItems: "center" }}>
                  <Text style={styles.dayText}>{label}</Text>
                </View>
              ))}
            </View>
          </View>
        </>
      }
      renderItem={({ item }) => {
        if (item.type === "timelineTitle")
          return <Text style={styles.sectionTitle}>🗓️ Timeline</Text>;
        if (item.type === "journeyTitle")
          return <Text style={styles.sectionTitle}>🧭 Journeys</Text>;

        return (
          <View style={styles.rowCard}>
            <Text style={styles.rowLeft}>{item.title}</Text>
            <Text style={styles.rowRight}>{item.value}</Text>
          </View>
        );
      }}
    />
  );
}

/* ===== SMALL COMPONENTS ===== */

const RangeBtn = ({ label, active, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.rangeBtn, active && styles.rangeActive]}
  >
    <Text style={[styles.rangeText, active && { color: COLORS.blue }]}>
      {label}
    </Text>
  </TouchableOpacity>
);

/* ===== STYLES ===== */
const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 80, backgroundColor: COLORS.bg },
  title: { fontSize: 17, fontWeight: "600", color: COLORS.text },
  subtitle: { fontSize: 12, color: COLORS.subText, marginBottom: 16 },
  rangeRow: { flexDirection: "row", marginBottom: 16 },
  rangeBtn: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 10,
  },
  rangeActive: { borderColor: COLORS.blue },
  rangeText: { fontSize: 13, color: COLORS.subText },
  chartCard: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
  },
  chartTitle: { color: COLORS.text, fontSize: 15, fontWeight: "600", marginBottom: 10 },
  dayRow: { flexDirection: "row", marginTop: 8 },
  dayText: { fontSize: 11, color: COLORS.subText },
  sectionTitle: { fontSize: 15, fontWeight: "600", color: COLORS.text, marginVertical: 12 },
  rowCard: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  rowLeft: { color: COLORS.text, fontSize: 13 },
  rowRight: { color: COLORS.subText, fontSize: 13 },
}); 