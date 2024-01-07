import React from 'react';

import { Navigator } from './src/Navigator';
import { ThemeProvider } from './src/context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <Navigator />
    </ThemeProvider>
  );
}
