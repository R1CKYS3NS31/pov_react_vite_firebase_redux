/**
 * Color intention that you want to used in your theme
 * @param {JsonObject} theme Theme customization object
 */

export const themePalette = (theme) => {
  return {
    mode: theme?.customization?.navType,
    common: {
      black: theme.colors?.dark.paper,
    },
    primary: {
      light: theme.colors?.primary.light,
      main: theme.colors?.primary.main,
      dark: theme.colors?.primary.dark,
      200: theme.colors?.primary._200,
      800: theme.colors?.primary._800,
      contrastText: theme.colors?.primary.contrastText,
    },
    secondary: {
      light: theme.colors?.secondary.light,
      main: theme.colors?.secondary.main,
      dark: theme.colors?.secondary.dark,
      200: theme.colors?.secondary._200,
      800: theme.colors?.secondary._800,
      contrastText: theme.colors?.secondary.contrastText,
    },
    error: {
      light: theme.colors?.error.light,
      main: theme.colors?.error.main,
      dark: theme.colors?.error.dark,
    },
    orange: {
      light: theme.colors?.orange.light,
      main: theme.colors?.orange.main,
      dark: theme.colors?.orange.dark,
    },
    warning: {
      light: theme.colors?.warning.light,
      main: theme.colors?.warning.main,
      dark: theme.colors?.warning.dark,
    },
    success: {
      light: theme.colors?.success.light,
      200: theme.colors?.success._200,
      main: theme.colors?.success.main,
      dark: theme.colors?.success.dark,
    },
    grey: {
      50: theme.colors?.grey._50,
      100: theme.colors?.grey._100,
      500: theme.secondaryText,
      600: theme.heading,
      700: theme.primaryText,
      900: theme.disabledText,
    },
    dark: {
      light: theme.colors?.primary.text,
      main: theme.colors?.dark._800,
      dark: theme.colors?.dark._900,
      800: theme.colors?.dark.background,
      900: theme.colors?.dark.paper,
    },
    text: {
      primary: theme.primaryText,
      secondary: theme.secondaryText,
      disabled: theme.disabledText,
      hint: theme.hintText,
    },
    background: {
      paper: theme.paper,
      default: theme.backgroundDefault,
    },
  };
};
