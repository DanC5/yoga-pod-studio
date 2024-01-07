import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

import { useThemeContext } from '../context/ThemeContext';

export const ThemeModal: React.FC = () => {
  const { setTheme, theme } = useThemeContext();
  const [isGNV, setIsGNV] = useState(theme === 'gnv');

  const toggleSwitch = () => {
    setIsGNV((prev) => !prev);
    setTheme(isGNV ? 'boulder' : 'gnv');
  };

  return (
    <View style={styles.modalWrapper}>
      <View style={styles.modalContent}>
        <View style={styles.titleWrapper}>
          <Text style={styles.titleText}>Choose Your Location</Text>
        </View>
        <View style={styles.switchWrapper}>
          <Text style={styles.locationText}>Boulder</Text>
          <Switch
            trackColor={{ true: '#00aeef' }}
            ios_backgroundColor="#7fff00"
            onValueChange={toggleSwitch}
            value={isGNV}
            style={styles.switchComponent}
          />
          <Text style={styles.locationText}>Gainesville</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6e6e6',
  },
  modalContent: {
    backgroundColor: '#fff',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '33%',
    width: '50%',
    borderRadius: 16,
  },
  titleWrapper: {
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 36,
  },
  switchWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  locationText: {
    fontSize: 30,
  },
  switchComponent: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
  },
});
