import type { StatusBarStyle } from 'react-native';

/**
 * yoga pod palette.
 *
 *   cyan #00AEEF   navy #143980
 *
 * The blue is deliberate and stays. Inside RAD Collective, yoga pod is the
 * blue one -- it is how the brand is recognised and how it gets talked about
 * next to RITUAL and APEX. RAD cohesion is carried by structure, type and
 * layout rather than by flattening every studio to one colour.
 *
 * Day is Dan's original scheme cleaned up. Night is the same identity on a
 * dark ground, for hallways with the lights down.
 */

export type Appearance = 'night' | 'day';

/** What the user picked. 'auto' follows the iPad's own light/dark setting. */
export type DisplayMode = 'auto' | Appearance;

export type Palette = {
  name: Appearance;
  bg: string;
  surface: string;
  headerBg: string;
  headerTint: string;
  text: string;
  textMuted: string;
  accent: string;
  accentText: string;
  /** Teacher name on the display screen, and other supporting text. */
  secondary: string;
  border: string;
  danger: string;
  statusBar: StatusBarStyle;
};

const NIGHT: Palette = {
  name: 'night',
  bg: '#0B1219',
  surface: '#141E28',
  headerBg: '#000000',
  headerTint: '#FFFFFF',
  text: '#EAF2F7',
  textMuted: '#7E8C99',
  accent: '#00AEEF',
  accentText: '#04121A',
  secondary: '#5AC8F0',
  border: '#22303C',
  danger: '#E08A72',
  statusBar: 'light-content',
};

const DAY: Palette = {
  name: 'day',
  bg: '#FFFFFF',
  surface: '#F4F7F9',
  headerBg: '#000000',
  headerTint: '#FFFFFF',
  text: '#16202B',
  textMuted: '#6B7785',
  accent: '#00AEEF',
  accentText: '#FFFFFF',
  secondary: '#143980',
  border: '#D8E0E6',
  danger: '#C4553C',
  // The header bar is dark in both appearances, so the status bar
  // stays light either way.
  statusBar: 'light-content',
};

export const PALETTES: Record<Appearance, Palette> = { night: NIGHT, day: DAY };

export const DISPLAY_MODE_LABELS: Record<DisplayMode, string> = {
  auto: 'Auto',
  night: 'Night',
  day: 'Day',
};

export const DISPLAY_MODES: DisplayMode[] = ['auto', 'night', 'day'];
