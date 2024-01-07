import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import {
  createNavigationContainerRef,
  NavigationContainer,
  useRoute,
} from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

import { DisplayScreen } from './screens/Display';
import { IdleScreen } from './screens/Idle';
import { InputScreen } from './screens/Input';

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

type Props = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const HeaderTitle: React.FC<Props> = ({ setIsModalOpen }) => {
  const route = useRoute();

  const handleLongPress =
    route.name === 'Idle' ? () => setIsModalOpen((prev) => !prev) : () => null;

  return (
    <TouchableOpacity onLongPress={handleLongPress} style={styles.headerContainer}>
      <Image style={styles.headerImage} source={require('../assets/yp-white.png')} />
    </TouchableOpacity>
  );
};

export const Navigator: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <NavigationContainer ref={navRef}>
      <Stack.Navigator
        initialRouteName="Idle"
        screenOptions={{
          headerTitle: () => <HeaderTitle setIsModalOpen={setIsModalOpen} />,
          headerLeftContainerStyle: {
            paddingBottom: 8,
          },
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          headerTitleContainerStyle: {
            paddingBottom: 8,
          },
        }}
      >
        <Stack.Screen name="Idle">{() => <IdleScreen isModalOpen={isModalOpen} />}</Stack.Screen>
        <Stack.Screen
          name="Input"
          component={InputScreen}
          options={{ headerBackTitle: 'Screen Saver' }}
        />
        <Stack.Screen
          name="Display"
          component={DisplayScreen}
          options={{ headerBackTitle: 'Class Setup' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
  },
  headerImage: {
    flex: 1,
    resizeMode: 'contain',
  },
});
