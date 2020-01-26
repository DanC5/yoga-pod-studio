import React from "react";
import { StyleSheet, Text, View } from "react-native";

const DisplayScreen = ({ navigation }) => {
  const teacher = navigation.getParam("teacher");
  const classStyle = navigation.getParam("classStyle");
  const props = navigation.getParam("props");

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
    fontSize: 55,
    padding: 20,
    marginTop: 20,
    fontStyle: "italic"
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
    padding: 10,
    margin: 10,
    marginLeft: 20,
    marginRight: 20,
    borderColor: "#e6e6e6",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#00aeef"
  },
  propsText: {
    fontSize: 45,
    padding: 10,
    color: "#fff"
  }
});

export default DisplayScreen;
