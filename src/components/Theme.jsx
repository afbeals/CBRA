// External
import React from 'react';
import PropTypes from 'prop-types';
import {
  createMuiTheme,
  ThemeProvider,
  useTheme,
} from '@material-ui/core/styles';

// Local
import styleVars from '~Styles/abstract/_variables.scss';

// constants
const styles = { ...styleVars };

//  theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main: styles.primary,
      dark: styles.primaryDark,
      light: styles.primaryLight,
    },
    secondary: {
      main: styles.secondary,
      dark: styles.secondaryDark,
      light: styles.secondaryLight,
    },
    text: {
      primary: styles.fontPrimary,
      secondary: styles.fontSecondary,
      hint: styles.fontHint,
      disabled: styles.fontDisabled,
    },
  },
  typography: {
    fontFamily: ['Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
    fontSize: 16,
    htmlFontSize: 16,
  },
  overrides: {
    MuiFilledInput: {
      input: {
        color: styles.fontSecondary,
        backgroundColor: styles.appBackground,
      },
    },
  },
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em',
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey',
    },
  },
});

// effect
const useAppTheme = () => {
  const appTheme = useTheme();
  const {
    palette: { primary, secondary, text },
  } = appTheme;

  return [{ primary, secondary, text }];
};

// Wrapper
const AppTheme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

AppTheme.propTypes = {
  children: PropTypes.node.isRequired,
};

// exports
export default AppTheme;

export { theme, styles, useAppTheme };
