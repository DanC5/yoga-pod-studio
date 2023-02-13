import React from "react";
import { Image, StyleSheet, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";

import type { NavigationProp } from "../Navigator";

export const IdleScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <TouchableHighlight onPress={() => navigation.navigate("Input")} style={styles.container}>
      <Image
        resizeMode="contain"
        source={require("../../assets/breatheFirst.png")}
        style={styles.breathe}
      />
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
    width: "100%",
    padding: 48,
  },
  breathe: {
    height: "100%",
    width: "100%",
  },
});
