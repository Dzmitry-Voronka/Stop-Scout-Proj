const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

// Delay colors are darker in light mode: plain yellow text is unreadable on white.
export default {
  light: {
    text: '#000',
    textSecondary: '#555',
    background: '#fff',
    card: '#f2f4f7',
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
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    delayOnTime: '#4ade80',
    delayMinor: '#fbbf24',
    delayMajor: '#f87171',
  },
};
