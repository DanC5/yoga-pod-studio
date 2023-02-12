import React from "react";
import { Image, StyleSheet } from "react-native";
import { createNavigationContainerRef, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";

import { DisplayScreen } from "./screens/Display";
import { IdleScreen } from "./screens/Idle";
import { InputScreen } from "./screens/Input";

type DisplayParams = {
  classStyle: string;
  props: string[];
  teacher: string;
};

export type StackParamList = {
  Idle: undefined;
  Input: undefined;
  Display: DisplayParams;
};

export type NavigationProp = StackNavigationProp<StackParamList>;

const navRef = createNavigationContainerRef();

const Stack = createStackNavigator();

const HeaderTitle = () => (
  <Image style={styles.header} source={require("../assets/yp-white.png")} />
);

export const Navigator: React.FC = () => {
  return (
    <NavigationContainer ref={navRef}>
      <Stack.Navigator
        initialRouteName="Idle"
        screenOptions={{
          headerTitle: HeaderTitle,
          headerLeftContainerStyle: {
            paddingBottom: 20,
          },
          headerStyle: {
            backgroundColor: "#000",
          },
          headerTintColor: "#fff",
          headerTitleContainerStyle: {
            paddingBottom: 15,
          },
          headerTitleStyle: {
            alignSelf: "center",
          },
        }}
      >
        <Stack.Screen name="Idle" component={IdleScreen} />
        <Stack.Screen
          name="Input"
          component={InputScreen}
          options={{ headerBackTitle: "Screen Saver" }}
        />
        <Stack.Screen name="Display" component={DisplayScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    resizeMode: "contain",
    width: 150,
  },
});
