import { createTheme } from "@mui/material/styles";

// project imports
import { componentStyleOverrides } from "./compStyleOverride";
import { themePalette } from "./palette";
import { themeTypography } from "./typography";
import { color } from "./color";

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */

export const theme = (customization) => {
  const themeOption = {
    colors: color,
    heading: color.grey._900,
    paper: color.background.paper,
    backgroundDefault: color.background.default,
    background: color.primary.light,
    primaryText: color.text.primary,
    secondaryText: color.text.secondary,
    hintText: color.text.hint,
    disabledText: color.text.disabled,
    menuSelected: color.secondary.dark,
    menuSelectedBack: color.secondary.light,
    divider: color.grey._200,
    customization,
  };

  const themeOptions = {
    direction: "ltr",
    palette: themePalette(themeOption),
    mixins: {
      toolbar: {
        minHeight: "48px",
        padding: "16px",
        "@media (min-width: 600px)": {
          minHeight: "48px",
        },
      },
    },
    typography: themeTypography(themeOption),
    shape: {
      borderRadius: 4,
    },
  };

  const themes = createTheme(themeOptions);
  themes.components = componentStyleOverrides(themeOption);

  return themes;
};
