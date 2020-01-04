import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import InputScreen from "./screens/Input";
import DisplayScreen from "./screens/Display";

const Navigator = createStackNavigator(
  {
    Input: { screen: InputScreen },
    Display: { screen: DisplayScreen }
  },
  {
    initialRouteName: "Input",
    defaultNavigationOptions: {
      headerTitle: "yoga pod",
      headerStyle: {
        backgroundColor: "#000"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 30,
        paddingBottom: 60
      },
      headerLeftContainerStyle: {
        paddingBottom: 20
      },
      headerBackTitle: "Reset"
    }
  }
);

export default createAppContainer(Navigator);
