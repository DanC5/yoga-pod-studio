import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";

import type { StackParamList } from "../Navigator";

type RouteParams = RouteProp<StackParamList, "Display">;

export const DisplayScreen = () => {
  const {
    params: { classStyle, props, teacher },
  } = useRoute<RouteParams>();

  return (
    <View style={styles.container}>
      <Text style={styles.classHeader}>{classStyle}</Text>
      <Text style={styles.teacher}> with {teacher}</Text>
      {!!props.length && (
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
        <View style={[styles.propsCard, { marginTop: 50 }]}>
          <Text style={[styles.propsText, { fontSize: 40 }]}>No props specified</Text>
        </View>
      )}
    </View>
  );
};

DisplayScreen.navigationOptions = {
  headerBackTitle: "Reset",
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
  },
  classHeader: {
    alignItems: "center",
    fontSize: 100,
    fontWeight: "bold",
    justifyContent: "center",
    marginBottom: 8,
  },
  teacher: {
    alignItems: "center",
    fontSize: 72,
    marginBottom: 16,
  },
  prompt: {
    fontSize: 48,
    fontStyle: "italic",
    marginTop: 16,
    padding: 24,
  },
  propsCol: {
    alignItems: "center",
    justifyContent: "center",
  },
  propsRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  propsCard: {
    backgroundColor: "#00aeef",
    borderColor: "#e6e6e6",
    borderRadius: 8,
    borderWidth: 1,
    marginHorizontal: 20,
    marginVertical: 12,
    padding: 16,
  },
  propsText: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
  },
});
