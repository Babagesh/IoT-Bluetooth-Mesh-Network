import { StyleSheet, Text, View } from "react-native";

type SensorDataCardProps = {
  luxValue: string;
  temperatureValue: string;
};

function ValuePill({ value }: { value: string }) {
  return (
    <View style={styles.valuePill}>
      <Text style={styles.valueText}>{value}</Text>
    </View>
  );
}

export default function SensorDataCard({ luxValue, temperatureValue }: SensorDataCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Sensor Data</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Lux</Text>
        <ValuePill value={luxValue} />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Temp</Text>
        <ValuePill value={temperatureValue} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 34,
    borderRadius: 28,
    backgroundColor: "#d8d8d8",
    borderWidth: 1,
    borderColor: "#c9c9c9",
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
    gap: 18,
  },
  heading: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "800",
    color: "#0f0f0f",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0f0f0f",
  },
  valuePill: {
    minWidth: 120,
    borderRadius: 999,
    borderWidth: 3,
    borderColor: "#7a7a7a",
    backgroundColor: "#d3d3d3",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  valueText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#444444",
  },
});
