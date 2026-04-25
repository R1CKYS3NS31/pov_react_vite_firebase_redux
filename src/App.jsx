import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Suspense } from "react";
import ThemeToggleFab from "./ui/components/fab/ThemeToggleFab";
import { useUiSettings } from "./hooks/useUiSettings";
import AppLoadingScreen from "./ui/components/layout/AppLoadingScreen";
import { AppRoutes } from "./ui/routes/AppRoutes";
import { PoVNotification } from "./ui/components/notification/PoVNotification";

const App = () => {

  const { activeTheme } = useUiSettings();

  return (
    <ThemeProvider theme={activeTheme}>
      <CssBaseline />
      {/* <ThemeToggleFab /> */}
      <Suspense fallback={<AppLoadingScreen />}>
        <AppRoutes />
      </Suspense>
      <PoVNotification />
    </ThemeProvider>
  );
};

export default App;
