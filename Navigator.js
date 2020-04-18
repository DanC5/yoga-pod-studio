import React from "react";
import { Image, StyleSheet } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import DisplayScreen from "./screens/Display";
import IdleScreen from "./screens/Idle";
import InputScreen from "./screens/Input";

const Navigator = createStackNavigator(
  {
    Display: { screen: DisplayScreen },
    Idle: { screen: IdleScreen },
    Input: { screen: InputScreen }
  },
  {
    initialRouteName: "Idle",
    defaultNavigationOptions: {
      headerTitle: () => (
        <Image
          style={styles.header}
          source={require("./assets/yp-white.png")}
        />
      ),
      headerLeftContainerStyle: {
        paddingBottom: 20
      },
      headerStyle: {
        backgroundColor: "#000"
      },
      headerTintColor: "#fff",
      headerTitleContainerStyle: {
        paddingBottom: 15
      },
      headerTitleStyle: {
        alignSelf: "center"
      }
    }
  }
);

const styles = StyleSheet.create({
  header: {
    flex: 1,
    resizeMode: "contain",
    width: 150
  }
});

export default createAppContainer(Navigator);
