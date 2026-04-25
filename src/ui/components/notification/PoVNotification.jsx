import { Snackbar, Alert, Slide, useTheme, alpha } from "@mui/material";
import { useNotificationHandler } from "../../../hooks/useNotificationHandler";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutlineRounded";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import WarningAmberIcon from "@mui/icons-material/WarningAmberRounded";

export const PoVNotification = () => {
  const theme = useTheme();
  const { notification, closeNotification } = useNotificationHandler();
  const { open, message, severity, duration = 6000 } = notification;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    closeNotification();
  };


  const getIcon = () => {
    switch (severity) {
      case "success": return <CheckCircleOutlineIcon fontSize="small" />;
      case "error": return <ErrorOutlineIcon fontSize="small" />;
      case "warning": return <WarningAmberIcon fontSize="small" />;
      default: return <InfoIcon fontSize="small" />;
    }
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      slots={{ transition: Slide }}
      slotProps={{ transition: { direction: "up" } }}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      sx={{
        bottom: { xs: 32, sm: 24 },
        left: { xs: 16, sm: 24 },
      }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="outlined"
        icon={getIcon()}
        sx={{
          borderRadius: 3,
          fontWeight: 600,
          boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.15)}`,
          minWidth: { xs: 'calc(100vw - 32px)', sm: 320 },
          backdropFilter: "blur(10px)",
          border: '1px solid',
          borderColor: (theme) => alpha(theme.palette.common.white, 0.1),
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
