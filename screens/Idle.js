import React from "react";
import { StyleSheet, Text, View } from "react-native";

const IdleScreen = ({ navigation }) => {
  const teacher = navigation.getParam("teacher");
  const classStyle = navigation.getParam("classStyle");
  const props = navigation.getParam("props");
  // const notes = navigation.getParam("notes");

  return (
    <View style={styles.container}>
      <Text style={styles.header} onPress={() => navigation.navigate("Input")}>
        Breathe First
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
  },
  header: {
    fontSize: 100,
    padding: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  teacher: {
    fontSize: 75,
    padding: 10,
    alignItems: "center"
  },
  prompt: {
    fontSize: 60,
    padding: 20,
    marginTop: 20
  },
  propsCol: {},
  propsRow: {
    flexDirection: "row",
    justifyContent: "center"
  },
  propsCard: {
    padding: 10,
    margin: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "blue"
  },
  propsText: {
    fontSize: 50,
    padding: 10,
    color: "#fff"
  }
});

export default IdleScreen;
