import React from 'react';
import { Image, StyleSheet, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import type { NavigationProp } from '../Navigator';
import { ThemeModal } from '../components/ThemeModal';
import { useThemeContext } from '../context/ThemeContext';

type Props = {
  isModalOpen: boolean;
};

export const IdleScreen: React.FC<Props> = ({ isModalOpen }) => {
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useThemeContext();

  const imgPath =
    theme === 'boulder'
      ? require('../../assets/boulderIdle.png')
      : require('../../assets/gnvIdle.png');

  return (
    <>
      {isModalOpen ? (
        <ThemeModal />
      ) : (
        <TouchableHighlight
          onPress={() => navigation.navigate('Input')}
          style={[styles.container, { padding: theme === 'boulder' ? 0 : 48 }]}
        >
          <Image
            resizeMode={theme === 'boulder' ? 'center' : 'contain'}
            source={imgPath}
            style={styles.breathe}
          />
        </TouchableHighlight>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
  },
  breathe: {
    height: '100%',
    width: '100%',
  },
});
