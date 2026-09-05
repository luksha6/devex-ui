export const color = {
  light: {
    bg: '#fdfdfd',
    surface: '#f1f1f2',
    text: '#1f2937',
    textMuted: '#46474d',
    interactive: '#22463d',
    danger: '#cc1100',
    success: '#306b00',
    warning: '#995200',
    deprecated: '#5c5e66',
    internal: '#5d5e66',
  },
  dark: {
    bg: '#121413',
    surface: '#1c1e1d',
    text: '#f3f4f4',
    textMuted: '#c8c9cd',
    interactive: '#9ec9be',
    danger: '#ff6a59',
    success: '#8fc96a',
    warning: '#e0a35c',
    deprecated: '#b4b5bb',
    internal: '#b4b5bb',
  },
} as const;

export const space = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  6: 24,
  8: 32,
} as const;

export const typeScale = {
  label: 11,
  mono: 13,
  body: 15,
  title: 20,
  section: 28,
  display: 36,
  measure: 68,
} as const;

export const tokens = { color, space, typeScale } as const;
