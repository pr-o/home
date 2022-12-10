'use client';

import { useState, useEffect, useCallback } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState(true);

  useEffect(() => {
    console.log('theme =>', theme);
  }, [theme]);

  const toggle = useCallback(() => setTheme((state) => !state), []);

  useEffect(() => {
    if (window.matchMedia) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme(true);
      } else setTheme(false);

      // listen to changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
        setTheme(event.matches ? true : false);
      });
    }
  }, []);

  return [theme, toggle] as const;
};
