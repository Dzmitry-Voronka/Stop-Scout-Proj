const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

// accent: background for badges and buttons that carry white text, so it must stay dark enough
// in both modes (tint is white in dark mode and would make white text invisible).
// Delay colors are darker in light mode: plain yellow text is unreadable on white.
const accent = '#1d6fb8';

export default {
  light: {
    text: '#000',
    textSecondary: '#555',
    background: '#fff',
    card: '#f2f4f7',
    accent,
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    delayOnTime: '#15803d',
    delayMinor: '#a16207',
    delayMajor: '#b91c1c',
  },
  dark: {
    text: '#fff',
    textSecondary: '#b0b0b0',
    background: '#000',
    card: '#1c1c1e',
    accent,
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    delayOnTime: '#4ade80',
    delayMinor: '#fbbf24',
    delayMajor: '#f87171',
  },
};
