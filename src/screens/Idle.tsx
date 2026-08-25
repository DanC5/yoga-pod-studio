import React from 'react';
import { Image, StatusBar, StyleSheet, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ThemeModal } from '../components/ThemeModal';
import { useThemeContext } from '../context/ThemeContext';

import type { NavigationProp } from '../Navigator';

type Props = {
  isModalOpen: boolean;
};

export const IdleScreen: React.FC<Props> = ({ isModalOpen }) => {
  const navigation = useNavigation<NavigationProp>();
  const { appearance, palette, theme } = useThemeContext();

  // The Gainesville idle art ships as dark ink on transparent, so it needs
  // a light-ink counterpart for the Night appearance. gnvIdle-white.png is
  // generated from the original's alpha channel -- it reads correctly, but
  // swap it for a real white export from the brand files when one exists.
  //
  // The Boulder art is fully opaque and carries its own ground, so it works
  // against either appearance unchanged.
  const imgPath =
    theme === 'boulder'
      ? require('../../assets/boulderIdle.png')
      : appearance === 'night'
        ? require('../../assets/gnvIdle-white.png')
        : require('../../assets/gnvIdle.png');

  if (isModalOpen) {
    return <ThemeModal />;
  }

  return (
    <TouchableHighlight
      onPress={() => navigation.navigate('Input')}
      style={[
        styles.container,
        { backgroundColor: palette.bg, padding: theme === 'boulder' ? 0 : 48 },
      ]}
      underlayColor={palette.bg}
    >
      <>
        <StatusBar barStyle={palette.statusBar} />
        <Image
          resizeMode={theme === 'boulder' ? 'center' : 'contain'}
          source={imgPath}
          style={styles.breathe}
        />
      </>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  breathe: {
    height: '100%',
    width: '100%',
  },
});
