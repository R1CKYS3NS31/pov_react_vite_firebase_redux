import Fab from "@mui/material/Fab";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useUiSettings } from "../../../hooks/useUiSettings";
import { Tooltip } from "@mui/material";

const ThemeToggleFab = () => {
  const { themeType, toggleTheme } = useUiSettings();

  return (
    <Tooltip
      arrow
      title={`Switch to ${themeType === "dark" ? "light" : "dark"} mode`}
      placement="left"
    >
      <Fab
        color="primary"
        aria-label="toggle theme"
        onClick={() => toggleTheme()}
        style={{ position: "fixed", bottom: 16, right: 16, zIndex: 1000 }}
      >
        {themeType === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
      </Fab>
    </Tooltip>
  );
};

export default ThemeToggleFab;
