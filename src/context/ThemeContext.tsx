import React, { PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';
import { MMKV } from 'react-native-mmkv';

import {
  DEFAULT_CLASSES,
  DEFAULT_PROPS,
  MAX_CLASS_NAME_LENGTH,
  MAX_PROP_NAME_LENGTH,
  PREFERRED_DEFAULT_CLASS,
  type Location,
} from '../constants/defaults';

/**
 * One module-level instance. Previously this was constructed inside the
 * component body, which allocated a new native storage handle on every
 * single render.
 */
const storage = new MMKV();

const THEME_KEY = 'theme';
const classesKey = (location: Location) => `classes.${location}`;
const propsKey = (location: Location) => `props.${location}`;

type ListMap = Record<Location, string[]>;

const readTheme = (): Location => {
  const stored = storage.getString(THEME_KEY);
  return stored === 'boulder' || stored === 'gnv' ? stored : 'gnv';
};

const readList = (key: string, fallback: string[]): string[] => {
  const raw = storage.getString(key);

  if (!raw) {
    return fallback;
  }

  try {
    const parsed = JSON.parse(raw);

    // A corrupt or half-written value must never blank out an iPad mid-shift.
    if (Array.isArray(parsed) && parsed.every((item) => typeof item === 'string')) {
      return parsed;
    }

    return fallback;
  } catch {
    return fallback;
  }
};

const writeList = (key: string, list: string[]) => {
  storage.set(key, JSON.stringify(list));
};

const readAllClasses = (): ListMap => ({
  boulder: readList(classesKey('boulder'), DEFAULT_CLASSES.boulder),
  gnv: readList(classesKey('gnv'), DEFAULT_CLASSES.gnv),
});

const readAllProps = (): ListMap => ({
  boulder: readList(propsKey('boulder'), DEFAULT_PROPS.boulder),
  gnv: readList(propsKey('gnv'), DEFAULT_PROPS.gnv),
});

const normalize = (value: string) => value.trim().toLowerCase();

export type AddResult = { ok: true } | { ok: false; reason: 'empty' | 'duplicate' };

type ThemeContextValue = {
  classes: string[];
  classProps: string[];
  defaultClass: string;
  theme: Location;
  setTheme: (location: Location) => void;
  addClass: (name: string) => AddResult;
  removeClass: (name: string) => void;
  resetClasses: () => void;
  addProp: (name: string) => AddResult;
  removeProp: (name: string) => void;
  resetProps: () => void;
};

const ThemeContext = React.createContext({} as ThemeContextValue);

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  // Lazy initialisers read storage once, synchronously, before first paint.
  // The old effect-based version briefly rendered the wrong location and
  // could write the default back over a saved value.
  const [theme, setThemeState] = useState<Location>(readTheme);
  const [allClasses, setAllClasses] = useState<ListMap>(readAllClasses);
  const [allProps, setAllProps] = useState<ListMap>(readAllProps);

  const setTheme = useCallback((location: Location) => {
    setThemeState(location);
    storage.set(THEME_KEY, location);
  }, []);

  /**
   * All three mutators follow the same shape: change the list for the
   * currently selected location, persist it, and leave the other
   * location untouched.
   */
  const mutate = useCallback(
    (
      setter: React.Dispatch<React.SetStateAction<ListMap>>,
      keyFor: (location: Location) => string,
      transform: (current: string[]) => string[],
    ) => {
      setter((prev) => {
        const next = transform(prev[theme]);
        writeList(keyFor(theme), next);
        return { ...prev, [theme]: next };
      });
    },
    [theme],
  );

  const addTo = useCallback(
    (
      current: string[],
      setter: React.Dispatch<React.SetStateAction<ListMap>>,
      keyFor: (location: Location) => string,
      maxLength: number,
      name: string,
    ): AddResult => {
      const trimmed = name.trim().slice(0, maxLength);

      if (!trimmed) {
        return { ok: false, reason: 'empty' };
      }

      if (current.some((item) => normalize(item) === normalize(trimmed))) {
        return { ok: false, reason: 'duplicate' };
      }

      mutate(setter, keyFor, (list) => [...list, trimmed]);

      return { ok: true };
    },
    [mutate],
  );

  const value = useMemo<ThemeContextValue>(() => {
    const classes = allClasses[theme];
    const classProps = allProps[theme];

    // If a teacher deleted the class we used to preselect, fall back to
    // whatever is first rather than rendering an empty picker.
    const preferred = PREFERRED_DEFAULT_CLASS[theme];
    const defaultClass = classes.includes(preferred) ? preferred : (classes[0] ?? '');

    return {
      classes,
      classProps,
      defaultClass,
      theme,
      setTheme,
      addClass: (name: string) =>
        addTo(classes, setAllClasses, classesKey, MAX_CLASS_NAME_LENGTH, name),
      removeClass: (name: string) =>
        mutate(setAllClasses, classesKey, (list) => list.filter((item) => item !== name)),
      resetClasses: () => mutate(setAllClasses, classesKey, () => [...DEFAULT_CLASSES[theme]]),
      addProp: (name: string) =>
        addTo(classProps, setAllProps, propsKey, MAX_PROP_NAME_LENGTH, name),
      removeProp: (name: string) =>
        mutate(setAllProps, propsKey, (list) => list.filter((item) => item !== name)),
      resetProps: () => mutate(setAllProps, propsKey, () => [...DEFAULT_PROPS[theme]]),
    };
  }, [allClasses, allProps, theme, setTheme, addTo, mutate]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = () => useContext(ThemeContext);
