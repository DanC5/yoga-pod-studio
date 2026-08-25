import React, { useMemo } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

import { useThemeContext } from '../context/ThemeContext';
import { NoPhoneBadge } from '../components/NoPhoneBadge';
import { HOT_CLASS_NOTICE, PHONE_FREE_LABEL } from '../constants/defaults';

import type { Palette } from '../constants/palette';
import type { StackParamList } from '../Navigator';

type RouteParams = RouteProp<StackParamList, 'Display'>;

export const DisplayScreen = () => {
  const {
    params: { classStyle, props, teacher },
  } = useRoute<RouteParams>();
  const { isHot, palette } = useThemeContext();
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

      {isHot(classStyle) && (
        <View style={styles.hotNotice}>
          <Text style={styles.hotNoticeText}>{HOT_CLASS_NOTICE}</Text>
        </View>
      )}

      {/* Every class, every time. The practice rooms are phone-free. */}
      <View style={styles.phoneFree}>
        <NoPhoneBadge color={palette.textMuted} size={56} />
        <Text style={styles.phoneFreeText}>{PHONE_FREE_LABEL}</Text>
      </View>
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
    hotNotice: {
      borderColor: p.accent,
      borderRadius: 10,
      borderWidth: 2,
      marginTop: 28,
      paddingHorizontal: 28,
      paddingVertical: 14,
    },
    hotNoticeText: {
      color: p.accent,
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    phoneFree: {
      alignItems: 'center',
      bottom: 36,
      flexDirection: 'row',
      gap: 16,
      position: 'absolute',
    },
    phoneFreeText: {
      color: p.textMuted,
      fontSize: 22,
      letterSpacing: 2,
      textTransform: 'uppercase',
    },
    noPropsText: {
      color: p.textMuted,
      fontSize: 40,
      fontWeight: 'bold',
    },
  });
