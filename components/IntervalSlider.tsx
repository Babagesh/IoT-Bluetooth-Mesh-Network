import Slider from "@react-native-community/slider";
import { StyleSheet, Text, View } from "react-native";

type IntervalSliderProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
};

export default function IntervalSlider({ label, value, onChange }: IntervalSliderProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.sliderRow}>
        <Text style={styles.speedText}>Fast</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={value}
          onValueChange={onChange}
          minimumTrackTintColor="#9ea1a6"
          maximumTrackTintColor="#d6d6d6"
          thumbTintColor="#f4f4f4"
        />
        <Text style={styles.speedText}>Slow</Text>
      </View>

      <View style={styles.scaleRow}>
        {Array.from({ length: 10 }, (_, index) => {
          const point = index + 1;
          return (
            <Text key={point} style={styles.scaleText}>
              {point}
            </Text>
          );
        })}
      </View>

      <Text style={styles.currentValue}>{value}s</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderTopWidth: 2,
    borderTopColor: "#d4d4d4",
    paddingTop: 16,
  },
  label: {
    fontSize: 28,
    fontWeight: "800",
    color: "#2b2b2b",
    marginBottom: 8,
  },
  sliderRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  slider: {
    flex: 1,
    height: 40,
  },
  speedText: {
    width: 44,
    textAlign: "center",
    color: "#7c7f86",
    fontWeight: "700",
    fontSize: 12,
  },
  scaleRow: {
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 44,
  },
  scaleText: {
    color: "#b5b5b5",
    fontSize: 10,
    fontWeight: "700",
  },
  currentValue: {
    marginTop: 8,
    textAlign: "center",
    color: "#303030",
    fontWeight: "700",
    fontSize: 16,
  },
});
