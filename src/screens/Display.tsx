import React, { useMemo } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

import { useThemeContext } from '../context/ThemeContext';

import type { Palette } from '../constants/palette';
import type { StackParamList } from '../Navigator';

type RouteParams = RouteProp<StackParamList, 'Display'>;

export const DisplayScreen = () => {
  const {
    params: { classStyle, props, teacher },
  } = useRoute<RouteParams>();
  const { palette } = useThemeContext();
  const styles = useMemo(() => makeStyles(palette), [palette]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={palette.statusBar} />
      <Text style={styles.classHeader}>{classStyle}</Text>
      <Text style={styles.teacher}>with {teacher}</Text>
      {!!props.length && (
        <View style={styles.propsCol}>
          <Text style={styles.prompt}>Please grab</Text>
          {/* Wraps to as many rows as needed. The old version split at a
              fixed index of 3, so a 7th or 8th prop silently overflowed. */}
          <View style={styles.propsGrid}>
            {props.map((p) => (
              <View style={styles.propsCard} key={p}>
                <Text style={styles.propsText}>{p}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
      {!props.length && (
        <View style={styles.noPropsCard}>
          <Text style={styles.noPropsText}>No props specified</Text>
        </View>
      )}
    </View>
  );
};

DisplayScreen.navigationOptions = {
  headerBackTitle: 'Reset',
};

const makeStyles = (p: Palette) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: p.bg,
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 48,
    },
    classHeader: {
      color: p.text,
      fontSize: 100,
      fontWeight: 'bold',
      letterSpacing: 1,
      marginBottom: 8,
      textAlign: 'center',
    },
    teacher: {
      color: p.secondary,
      fontSize: 72,
      marginBottom: 16,
      textAlign: 'center',
    },
    prompt: {
      color: p.textMuted,
      fontSize: 30,
      letterSpacing: 6,
      marginTop: 24,
      paddingBottom: 8,
      textTransform: 'uppercase',
    },
    propsCol: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    propsGrid: {
      alignItems: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    propsCard: {
      backgroundColor: p.accent,
      borderRadius: 10,
      marginHorizontal: 16,
      marginVertical: 12,
      paddingHorizontal: 28,
      paddingVertical: 16,
    },
    propsText: {
      color: p.accentText,
      fontSize: 36,
      fontWeight: 'bold',
    },
    noPropsCard: {
      borderColor: p.border,
      borderRadius: 10,
      borderWidth: 2,
      marginTop: 50,
      paddingHorizontal: 32,
      paddingVertical: 20,
    },
    noPropsText: {
      color: p.textMuted,
      fontSize: 40,
      fontWeight: 'bold',
    },
  });
