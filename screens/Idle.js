import React from "react";
import { Image, StyleSheet, Text, TouchableHighlight } from "react-native";

const IdleScreen = ({ navigation }) => {
  return (
    <TouchableHighlight
      style={styles.container}
      onPress={() => navigation.navigate("Input")}
    >
      <Image style={styles.image} source={require("../assets/46004812.png")} />
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
  image: {
    height: "50%",
    width: "50%"
  }
});

export default IdleScreen;
