import React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
  color: string;
  size?: number;
};

/**
 * A phone in a circle with a slash through it, drawn from plain Views.
 *
 * Deliberately not an SVG or an icon font: either would mean a new native
 * dependency and another pod install, which is a much bigger thing to ask a
 * reviewer to accept than thirty lines of layout.
 */
export const NoPhoneBadge: React.FC<Props> = ({ color, size = 64 }) => {
  const ring = {
    borderColor: color,
    borderRadius: size / 2,
    borderWidth: Math.max(2, size * 0.045),
    height: size,
    width: size,
  };
  const phone = {
    borderColor: color,
    borderRadius: size * 0.07,
    borderWidth: Math.max(2, size * 0.04),
    height: size * 0.46,
    width: size * 0.28,
  };
  const slash = {
    backgroundColor: color,
    height: Math.max(2, size * 0.045),
    width: size * 0.82,
  };

  return (
    <View accessibilityLabel="No phones" accessibilityRole="image" style={[styles.ring, ring]}>
      <View style={phone} />
      <View style={[styles.slash, slash]} />
    </View>
  );
};

const styles = StyleSheet.create({
  ring: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  slash: {
    position: 'absolute',
    transform: [{ rotate: '-45deg' }],
  },
});
