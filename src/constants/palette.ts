import type { StatusBarStyle } from 'react-native';

/**
 * RAD Collective palette.
 *
 * These are the same tokens the collective's site runs on, so the app,
 * the website and the email signature stay one system:
 *
 *   forest #2D4A3E   off-white #F5F2EE   moss  #8FAF99
 *   slate  #1A1A18   black     #0E0E0E   mist  #C8C3BC
 *   warm-gray #8A8680
 *
 * The yoga pod studio accent is #4FC1E9. Keeping it means this app still
 * reads as yoga pod inside the RAD system, the same way the studio cards
 * on radcollective.us carry a per-brand accent over shared neutrals.
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
  bg: '#1A1A18',
  surface: '#232320',
  headerBg: '#0E0E0E',
  headerTint: '#F5F2EE',
  text: '#F5F2EE',
  textMuted: '#8A8680',
  accent: '#4FC1E9',
  accentText: '#1A1A18',
  secondary: '#8FAF99',
  border: '#2E2E2B',
  danger: '#D98F7A',
  statusBar: 'light-content',
};

const DAY: Palette = {
  name: 'day',
  bg: '#F5F2EE',
  surface: '#FFFFFF',
  headerBg: '#2D4A3E',
  headerTint: '#F5F2EE',
  text: '#1A1A18',
  textMuted: '#8A8680',
  accent: '#2D4A3E',
  accentText: '#F5F2EE',
  secondary: '#8A8680',
  border: '#DCD7D0',
  danger: '#B4553C',
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
