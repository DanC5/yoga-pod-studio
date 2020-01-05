import React from "react";
import { StyleSheet, Text, View } from "react-native";

const DisplayScreen = ({ navigation }) => {
  const teacher = navigation.getParam("teacher");
  const classStyle = navigation.getParam("classStyle");
  const props = navigation.getParam("props");
  // const notes = navigation.getParam("notes");

  return (
    <View style={styles.container}>
      <Text style={styles.classHeader}>{classStyle}</Text>
      <Text style={styles.teacher}> with {teacher}</Text>
      <Text style={styles.prompt}>Please grab...</Text>
      <View style={styles.propsCol}>
        <View style={styles.propsRow}>
          {props.map((p, i) => {
            if (i < 3) {
              return (
                <View style={styles.propsCard} key={i}>
                  <Text style={styles.propsText}>{p}</Text>
                </View>
              );
            }
          })}
        </View>
        <View style={styles.propsRow}>
          {props.map((p, i) => {
            if (i >= 3) {
              return (
                <View style={styles.propsCard} key={i}>
                  <Text style={styles.propsText}>{p}</Text>
                </View>
              );
            }
          })}
        </View>
      </View>
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
  classHeader: {
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

export default DisplayScreen;
