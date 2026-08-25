export type Location = 'boulder' | 'gnv';

export const LOCATIONS: Location[] = ['boulder', 'gnv'];

export const LOCATION_LABELS: Record<Location, string> = {
  boulder: 'Boulder',
  gnv: 'Gainesville',
};

/**
 * Seed data only.
 *
 * These lists are what a fresh install starts with, and what "Reset to
 * Defaults" restores. Once the app is running, the live lists come from
 * device storage and are edited by teachers in the Manage Lists screen.
 * Editing this file does NOT change an iPad that already has saved lists.
 */
export const DEFAULT_CLASSES: Record<Location, string[]> = {
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
    'FIT 30',
    'FIT 60',
    'HOT',
    'HOT 45',
    'HOT FLOW Fusion',
    'Sweat, Heat, & Beatz',
    'NIDRA',
    'SOUND',
    'YIN',
    'YIN 45',
    'YIN 75',
    'YIN & NIDRA',
    'YIN & SOUND',
    'Breathwork',
    'Broga',
    'Pranayama & NIDRA',
    'Private',
    'Teacher Training',
    'Workshop',
  ],
};

export const DEFAULT_PROPS: Record<Location, string[]> = {
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

export const PREFERRED_DEFAULT_CLASS: Record<Location, string> = {
  boulder: 'podFLOW 2 (heated) 🔥',
  gnv: 'FLOW 2',
};

/** Guards against a teacher pasting an essay into the class name field. */
export const MAX_CLASS_NAME_LENGTH = 40;
export const MAX_PROP_NAME_LENGTH = 24;
