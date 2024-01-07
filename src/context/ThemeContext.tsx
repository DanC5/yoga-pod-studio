import React, { PropsWithChildren, useContext, useEffect, useState } from 'react';
import { MMKV } from 'react-native-mmkv';

const classes = {
  boulder: [
    'podFLOW 1',
    'podFLOW 2',
    'podFLOW 2 (heated) 🔥',
    'podHOT',
    'podHOT 95°',
    'Rocket Yoga 🚀',
    'podFIT',
    'podFIT Express',
    'Foundation',
    'Vin Yin',
    'Yin',
    'Yin & Nidra',
    'Restorative',
    'Restorative & Nidra',
    'SWEAT.HEAT.BEATZ 🔥',
    'Teacher Training',
    'Workshop',
    'Private',
  ],
  gnv: [
    'BASICS',
    'FLOW 1',
    'FLOW 2',
    'FLOW 2 75',
    'FLOW 3',
    'FIT',
    'FIT 60',
    'HOT',
    'HOT 45',
    'HOT FLOW Fusion',
    'Sweat, Heat, & Beatz',
    'YIN',
    'YIN 45',
    'YIN 75',
    'Breathwork',
    'Teacher Training',
    'Workshop',
    'Private',
  ],
};

const classProps = {
  boulder: [
    '1 Block',
    '2 Blocks',
    'Strap',
    'Bolster',
    'Blanket',
    'Sandbag',
    'Light Weights',
    'Heavy Weights',
    'Resistance Band',
  ],
  gnv: [
    'Consent Card',
    '1 Block',
    '2 Blocks',
    'Strap',
    'Bolster',
    'Blanket',
    'Light Weights',
    'Heavy Weights',
  ],
};

type ThemeContextValue = {
  classes: string[];
  classProps: string[];
  defaultClass: 'podFLOW 2 (heated) 🔥' | 'FLOW 2';
  setTheme: React.Dispatch<React.SetStateAction<'boulder' | 'gnv'>>;
  theme: 'boulder' | 'gnv';
};

const ThemeContext = React.createContext({} as ThemeContextValue);

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<'boulder' | 'gnv'>('gnv');

  const storage = new MMKV();

  useEffect(() => {
    const storedTheme = storage.getString('theme');

    if (storedTheme === 'boulder' || storedTheme === 'gnv') {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    storage.set('theme', theme);
  }, [theme]);

  const defaultClass = theme === 'boulder' ? 'podFLOW 2 (heated) 🔥' : 'FLOW 2';

  const themeContextValue: ThemeContextValue = {
    classes: classes[theme],
    classProps: classProps[theme],
    defaultClass,
    setTheme,
    theme,
  };

  return <ThemeContext.Provider value={themeContextValue}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = () => useContext(ThemeContext);
