import React from "react";
import { StyleSheet, Text, View } from "react-native";

const DisplayScreen = ({ navigation }) => {
  const classStyle = navigation.getParam("classStyle");
  const props = navigation.getParam("props");
  const teacher = navigation.getParam("teacher");

  return (
    <View style={styles.container}>
      <Text style={styles.classHeader}>{classStyle}</Text>
      <Text style={styles.teacher}> with {teacher}</Text>
      {props.length !== 0 && (
        <View style={styles.propsCol}>
          <Text style={styles.prompt}>Please grab...</Text>
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
      )}
      {!props.length && (
        <View style={{ ...styles.propsCard, marginTop: 50 }}>
          <Text style={{ ...styles.propsText, fontSize: 40 }}>
            No props specified
          </Text>
        </View>
      )}
    </View>
  );
};

DisplayScreen.navigationOptions = {
  headerBackTitle: "Reset"
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center"
  },
  classHeader: {
    alignItems: "center",
    fontSize: 100,
    justifyContent: "center",
    padding: 10
  },
  teacher: {
    alignItems: "center",
    fontSize: 75,
    padding: 10
  },
  prompt: {
    fontSize: 55,
    fontStyle: "italic",
    marginTop: 20,
    padding: 20
  },
  propsCol: {
    alignItems: "center",
    justifyContent: "center"
  },
  propsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: 5,
    marginRight: 15
  },
  propsCard: {
    backgroundColor: "#00aeef",
    borderColor: "#e6e6e6",
    borderRadius: 5,
    borderWidth: 1,
    margin: 10,
    marginLeft: 20,
    marginRight: 20,
    padding: 10
  },
  propsText: {
    color: "#fff",
    fontSize: 45,
    padding: 10
  }
});

export default DisplayScreen;
