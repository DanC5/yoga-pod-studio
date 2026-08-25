import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

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
export const PropCard: React.FC<Props> = ({ prop, selected, onToggle }) => (
  <TouchableOpacity
    accessibilityRole="button"
    accessibilityState={{ selected }}
    onPress={() => onToggle(prop)}
    style={selected ? styles.selectedCard : styles.unselectedCard}
  >
    <Text style={selected ? styles.selectedText : styles.unselectedText}>{prop}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  unselectedCard: {
    borderColor: 'gray',
    borderRadius: 8,
    borderWidth: 1,
    margin: 10,
    padding: 16,
  },
  selectedCard: {
    backgroundColor: '#00aeef',
    borderColor: '#e6e6e6',
    borderRadius: 8,
    borderWidth: 1,
    margin: 10,
    padding: 16,
  },
  unselectedText: {
    color: 'gray',
    fontSize: 20,
  },
  selectedText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
