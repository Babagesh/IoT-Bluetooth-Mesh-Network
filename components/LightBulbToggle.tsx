import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type LightBulbToggleProps = {
  isOn: boolean;
  onToggle: () => void;
};

export default function LightBulbToggle({ isOn, onToggle }: LightBulbToggleProps) {
  return (
    <View style={styles.wrapper}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Toggle light bulb"
        onPress={onToggle}
        style={[styles.button, isOn ? styles.buttonOn : null]}
      >
        <MaterialCommunityIcons
          name={isOn ? "lightbulb-on" : "lightbulb-outline"}
          size={140}
          color={isOn ? "#f9b719" : "#1c1a24"}
        />
      </Pressable>
      <Text style={styles.statusText}>{isOn ? "Light On" : "Light Off"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    marginTop: 30,
  },
  button: {
    width: 240,
    height: 240,
    borderRadius: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonOn: {
    backgroundColor: "#fff1a8",
    shadowColor: "#f2b705",
    shadowOpacity: 0.45,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 24,
    elevation: 4,
  },
  statusText: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: "700",
    color: "#2b2b2b",
  },
});
