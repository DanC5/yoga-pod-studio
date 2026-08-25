import React, { useMemo } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

import { useThemeContext } from '../context/ThemeContext';
import {
  DISPLAY_MODES,
  DISPLAY_MODE_LABELS,
  type DisplayMode,
  type Palette,
} from '../constants/palette';

const MODE_HINTS: Record<DisplayMode, string> = {
  auto: "Follows this iPad's light/dark setting",
  night: 'Always dark',
  day: 'Always light',
};

export const ThemeModal: React.FC = () => {
  const { appearance, displayMode, palette, setDisplayMode, setTheme, theme } = useThemeContext();
  const styles = useMemo(() => makeStyles(palette), [palette]);

  return (
    <View style={styles.modalWrapper}>
      <View style={styles.modalContent}>
        <Text style={styles.titleText}>Choose Your Location</Text>

        <View style={styles.switchWrapper}>
          <Text style={styles.locationText}>Boulder</Text>
          <Switch
            ios_backgroundColor={palette.border}
            onValueChange={() => setTheme(theme === 'gnv' ? 'boulder' : 'gnv')}
            style={styles.switchComponent}
            trackColor={{ false: palette.border, true: palette.accent }}
            value={theme === 'gnv'}
          />
          <Text style={styles.locationText}>Gainesville</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.titleText}>Display</Text>
        <View style={styles.segment}>
          {DISPLAY_MODES.map((mode) => {
            const active = mode === displayMode;

            return (
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                key={mode}
                onPress={() => setDisplayMode(mode)}
                style={[styles.segmentBtn, active && styles.segmentBtnActive]}
              >
                <Text style={[styles.segmentText, active && styles.segmentTextActive]}>
                  {DISPLAY_MODE_LABELS[mode]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <Text style={styles.hint}>
          {MODE_HINTS[displayMode]}
          {displayMode === 'auto' ? ` — currently ${appearance}` : ''}
        </Text>
      </View>
    </View>
  );
};

const makeStyles = (p: Palette) =>
  StyleSheet.create({
    modalWrapper: {
      alignItems: 'center',
      backgroundColor: p.bg,
      flex: 1,
      justifyContent: 'center',
    },
    modalContent: {
      alignItems: 'center',
      backgroundColor: p.surface,
      borderColor: p.border,
      borderRadius: 16,
      borderWidth: 1,
      paddingHorizontal: 48,
      paddingVertical: 40,
      width: '60%',
    },
    titleText: {
      color: p.text,
      fontSize: 30,
      fontWeight: 'bold',
    },
    switchWrapper: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 20,
    },
    locationText: {
      color: p.text,
      fontSize: 26,
      paddingHorizontal: 24,
    },
    switchComponent: {
      transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }],
    },
    divider: {
      backgroundColor: p.border,
      height: 1,
      marginVertical: 32,
      width: '100%',
    },
    segment: {
      borderColor: p.border,
      borderRadius: 10,
      borderWidth: 1.5,
      flexDirection: 'row',
      marginTop: 18,
      overflow: 'hidden',
    },
    segmentBtn: {
      paddingHorizontal: 34,
      paddingVertical: 14,
    },
    segmentBtnActive: {
      backgroundColor: p.accent,
    },
    segmentText: {
      color: p.textMuted,
      fontSize: 20,
      fontWeight: 'bold',
    },
    segmentTextActive: {
      color: p.accentText,
    },
    hint: {
      color: p.textMuted,
      fontSize: 16,
      marginTop: 16,
      textAlign: 'center',
    },
  });
