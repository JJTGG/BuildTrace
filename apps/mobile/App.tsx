import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BuildTrace</Text>
      <Text style={styles.description}>
        Phase 0 native workspace compatibility validation.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#171717",
  },
  description: {
    marginTop: 12,
    fontSize: 15,
    textAlign: "center",
    color: "#525252",
  },
});