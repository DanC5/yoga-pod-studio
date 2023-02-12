import React from "react";
import { Image, StyleSheet, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";

import type { NavigationProp } from "../Navigator";

export const IdleScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <TouchableHighlight onPress={() => navigation.navigate("Input")} style={styles.container}>
      <Image source={require("../../assets/breatheFirst.png")} style={styles.breathe} />
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
  },
  breathe: {
    height: "75%",
    width: "90%",
  },
});
