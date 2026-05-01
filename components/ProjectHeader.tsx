import { StyleSheet, Text, View } from "react-native";

type ProjectHeaderProps = {
  title?: string;
};

export default function ProjectHeader({ title = "IoT Final Project" }: ProjectHeaderProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 14,
    borderWidth: 2,
    borderColor: "#111111",
    borderRadius: 44,
    backgroundColor: "#c8c6c8",
    paddingVertical: 22,
    alignItems: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0f0f0f",
  },
});
