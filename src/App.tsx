import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { useAppSelector } from 'app/hooks';
import { AdminLayout } from 'components/Layout';
import { selectThemeColor, themeColorActions } from 'features/themeColor/themeColorSlice';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#0A1929',
      dark: '#1E1E1E',
      light: '#20262D',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#1E4976',
      dark: '#001E3C',
      light: '#FFFFFF',
    },
    error: {
      main: '#EB0014',
    },
  },
});

const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#FFFFFF',
      dark: '#FFFFFF',
      light: '#FFFFFF',
      contrastText: '#202020',
    },
    secondary: {
      main: '#202020',
      dark: '#FFFFFF',
      light: '#202020',
    },
    error: {
      main: '#EB0014',
    },
  },
});

function App() {
  const isDark = useAppSelector(selectThemeColor);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(themeColorActions.fetchThemeColorFromLocalStorage());
  }, [dispatch]);

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <AdminLayout />
      </ThemeProvider>
    </>
  );
}

export default App;
