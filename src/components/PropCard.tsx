import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { useThemeContext } from '../context/ThemeContext';

import type { Palette } from '../constants/palette';

type Props = {
  prop: string;
  selected: boolean;
  onToggle: (prop: string) => void;
};

/**
 * Presentational only. Selection now lives in the parent's state.
 *
 * The previous version kept its own `selected` boolean AND mutated the
 * shared props array in place with push/splice. Because that mutation
 * never went through setState, React had no idea the data changed --
 * the card repainted only because its private boolean flipped. Any
 * re-render from another source (rotation, keyboard, navigation) could
 * put the highlighted cards and the submitted array out of sync.
 */
export const PropCard: React.FC<Props> = ({ prop, selected, onToggle }) => {
  const { palette } = useThemeContext();
  const styles = useMemo(() => makeStyles(palette), [palette]);

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={() => onToggle(prop)}
      style={selected ? styles.selectedCard : styles.unselectedCard}
    >
      <Text style={selected ? styles.selectedText : styles.unselectedText}>{prop}</Text>
    </TouchableOpacity>
  );
};

const makeStyles = (p: Palette) =>
  StyleSheet.create({
    unselectedCard: {
      borderColor: p.border,
      borderRadius: 8,
      borderWidth: 1.5,
      margin: 10,
      padding: 16,
    },
    selectedCard: {
      backgroundColor: p.accent,
      borderColor: p.accent,
      borderRadius: 8,
      borderWidth: 1.5,
      margin: 10,
      padding: 16,
    },
    unselectedText: {
      color: p.textMuted,
      fontSize: 20,
    },
    selectedText: {
      color: p.accentText,
      fontSize: 20,
      fontWeight: 'bold',
    },
  });
