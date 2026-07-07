export type ThemeColorKey =
  | 'primary'
  | 'background'
  | 'surface'
  | 'foreground'
  | 'muted'
  | 'border'
  | 'success'
  | 'warning'
  | 'error'
  | 'playerX'
  | 'cpuO'
  | 'tileEmpty'
  | 'shadow';

export type ThemeColorSwatch = {
  light: string;
  dark: string;
};

export type ThemeColors = Record<ThemeColorKey, ThemeColorSwatch>;
