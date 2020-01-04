import React from "react";
import { StyleSheet, Text, View } from "react-native";

const DisplayScreen = ({ navigation }) => {
  const teacher = navigation.getParam("teacher");
  const classStyle = navigation.getParam("classStyle");
  const props = navigation.getParam("props");
  const notes = navigation.getParam("notes");

  return (
    <View style={styles.container}>
      <Text>
        Display screen, {teacher}, {classStyle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default DisplayScreen;
