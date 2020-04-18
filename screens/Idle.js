import React from "react";
import { Image, StyleSheet, TouchableHighlight } from "react-native";

const IdleScreen = ({ navigation }) => {
  return (
    <TouchableHighlight
      onPress={() => navigation.navigate("Input")}
      style={styles.container}
    >
      <Image
        source={require("../assets/breatheFirst.png")}
        style={styles.breathe}
      />
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center"
  },
  breathe: {
    height: "55%",
    width: "90%"
  }
});

export default IdleScreen;
