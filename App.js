import React from 'react';
import { default as colorTheme } from './theme.json';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './src/navigation/navigation.components'
import { ThemeContext } from './theme-context';
import { Provider } from 'react-redux';
import Store from './src/store/config';

export default () => {

  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  return (
    <>
      <Provider store={Store}>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ApplicationProvider {...eva} theme={{ ...eva[theme], ...colorTheme }}>
          <AppNavigator />
        </ApplicationProvider>
      </ThemeContext.Provider>
    </Provider>
    </>
  );
};