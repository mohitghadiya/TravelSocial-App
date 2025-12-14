import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';

const ThemeContext = createContext();

const lightColors = {
  background: '#FFFFFF',
  card: '#F3F4F6',
  text: '#000000',
  subtext: '#6B7280',
  border: '#E5E7EB',
  primary: '#2563EB',
};

const darkColors = {
  background: '#0F172A',
  card: '#1E293B',
  text: '#FFFFFF',
  subtext: '#94A3B8',
  border: '#1E293B',
  primary: '#3B82F6',
};

export const ThemeProvider = ({ children }) => {
  const systemTheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState(systemTheme || 'light');

  const colors = theme === 'dark' ? darkColors : lightColors;

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
