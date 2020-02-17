import React from "react";
import { Image, StyleSheet, TouchableHighlight } from "react-native";

const IdleScreen = ({ navigation }) => {
  return (
    <TouchableHighlight
      style={styles.container}
      onPress={() => navigation.navigate("Input")}
    >
      <Image
        style={styles.breathe}
        source={require("../assets/breatheFirst.png")}
      />
      {/* <Image style={styles.seed} source={require("../assets/seedPaper.png")} /> */}
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  breathe: {
    height: "50%",
    width: "80%"
  },
  seed: {
    height: "70%",
    width: "85%"
  }
});

export default IdleScreen;
