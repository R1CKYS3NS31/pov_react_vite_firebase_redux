export const componentStyleOverrides = (theme) => {
  const isDark = theme.customization?.themeType === "dark";

  return {
    MuiButton: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: {
          fontWeight: 700,
          borderRadius: `${theme?.customization?.borderRadius}px`,
          padding: "6px 16px",
          transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1)",
          textTransform: "none",
          boxShadow: "none",
          "&:hover": { boxShadow: "none" },
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${theme.colors?.primary?.main}, ${theme.colors?.primary?.dark})`,
          color: theme.colors?.primary?.contrastText,
          "&:hover": {
            transform: "translateY(-1.5px)",
            filter: "brightness(1.06)",
          },
        },
        containedSecondary: {
          background: `linear-gradient(135deg, ${theme.colors?.secondary?.main}, ${theme.colors?.secondary?.dark})`,
          color: theme.colors?.secondary?.contrastText,
          "&:hover": {
            transform: "translateY(-1.5px)",
            filter: "brightness(1.06)",
          },
        },
        // Outlined buttons use the border as part of design — keep them
        outlinedPrimary: {
          borderColor: theme.colors?.primary?.main,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: "smooth",
        },
        body: {
          "& ::selection": {
            background: theme.colors?.primary?.main ? `${theme.colors.primary.main}40` : "rgba(246, 193, 67, 0.3)",
            color: "inherit",
          },
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(0, 0, 0, 0.02)",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)",
            borderRadius: "4px",
            "&:hover": {
              background: isDark ? "rgba(255, 255, 255, 0.25)" : "rgba(0, 0, 0, 0.25)",
            },
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: theme.paper,
          borderRadius: `${theme?.customization?.borderRadius}px`,
        },
        elevation1: {
          boxShadow: isDark
            ? "0 2px 12px rgba(0,0,0,0.5)"
            : "0 2px 12px rgba(0,0,0,0.06)",
        },
        elevation2: {
          boxShadow: isDark
            ? "0 4px 24px rgba(0,0,0,0.55)"
            : "0 4px 24px rgba(0,0,0,0.08)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: `${(theme?.customization?.borderRadius || 8) + 4}px`,
          boxShadow: isDark
            ? "0 2px 20px rgba(0,0,0,0.5)"
            : "0 2px 20px rgba(0,0,0,0.06)",
          border: "none",
          overflow: "hidden",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: `${theme?.customization?.borderRadius}px`,
          transition: "all 200ms ease",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          backgroundColor: isDark
            ? "rgba(255,255,255,0.05)"
            : theme.colors?.grey?.[100] || "rgba(0,0,0,0.04)",
          "&.Mui-focused": {
            backgroundColor: isDark
              ? "rgba(255,255,255,0.08)"
              : theme.colors?.grey?.[50] || "rgba(0,0,0,0.02)",
            boxShadow: `0 0 0 3px ${theme.colors?.primary?.main}25`,
          },
          "&:hover": {
            backgroundColor: isDark
              ? "rgba(255,255,255,0.07)"
              : theme.colors?.grey?.[200] || "rgba(0,0,0,0.06)",
          },
        },
        input: {
          fontWeight: 500,
          padding: "10px 12px",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: `${theme?.customization?.borderRadius}px`,
          margin: "2px 8px",
          transition: "all 200ms ease",
          "&.Mui-selected": {
            color: theme.menuSelected,
            backgroundColor: theme.menuSelectedBack,
            fontWeight: 600,
            "&:hover": {
              backgroundColor: theme.menuSelectedBack,
            },
            "& .MuiListItemIcon-root": {
              color: theme.menuSelected,
            },
          },
          "&:hover": {
            backgroundColor: isDark
              ? "rgba(255,255,255,0.03)"
              : theme.menuSelectedBack,
            transform: "translateX(4px)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: "8px",
          "&.MuiChip-clickable:hover": {
            transform: "scale(1.02)",
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: isDark
            ? theme.colors?.grey?.[900]
            : theme.colors?.grey?.[800],
          fontSize: "0.75rem",
          padding: "8px 12px",
          borderRadius: "6px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          display: "none", // Borderless design — hide all dividers globally
        },
      },
    },

    MuiAvatar: {
      defaultProps: {
        sx: { width: 32, height: 32 },
      },
      styleOverrides: {
        root: {
          // Use optional chaining to prevent crash during hot-reload
          color: theme.colors?.primary?.dark || "#8B5A12",
          background: theme.colors?.primary?.[200] || "#FFF3CC",
          boxShadow: "0 6px 18px rgba(16,24,32,0.08)",
          fontWeight: 600,
          fontSize: "0.8125rem",
        },
      },
    },
    MuiList: {
      defaultProps: {
        dense: true,
      },
    },
    MuiMenuItem: {
      defaultProps: {
        dense: true,
      },
    },
    MuiTable: {
      defaultProps: {
        size: "small",
      },
    },
    MuiButtonGroup: {
      defaultProps: {
        size: "small",
      },
    },
    MuiCheckbox: {
      defaultProps: {
        size: "small",
      },
    },
    MuiFab: {
      defaultProps: {
        size: "small",
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: {
          padding: "6px",
        },
      },
    },
    MuiFormControl: {
      defaultProps: {
        margin: "dense",
        size: "small",
      },
    },
    MuiFormHelperText: {
      defaultProps: {
        margin: "dense",
      },
    },
    MuiInputLabel: {
      defaultProps: {
        margin: "dense",
      },
    },
    MuiRadio: {
      defaultProps: {
        size: "small",
      },
    },
    MuiSwitch: {
      defaultProps: {
        size: "small",
      },
    },
    MuiTextField: {
      defaultProps: {
        margin: "dense",
        size: "small",
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: `${(theme?.customization?.borderRadius || 8) + 4}px`,
          boxShadow: isDark
            ? "0 24px 60px rgba(0,0,0,0.7)"
            : "0 24px 60px rgba(0,0,0,0.15)",
          border: "none",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          fontWeight: 800,
          padding: "16px 20px 8px",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: "16px 20px",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "16px",
          "&:last-child": {
            paddingBottom: "16px",
          },
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          fontWeight: 600,
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          fontWeight: 700,
          fontSize: "0.65rem",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          fontWeight: 600,
          "&:hover": { textDecoration: "underline" },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textTransform: "none",
          fontSize: "0.875rem",
          letterSpacing: "0.01em",
          "&.Mui-selected": { fontWeight: 800 },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          fontWeight: 600,
          fontSize: "0.875rem",
          border: "none",
        },
        filledSuccess: {
          background: `linear-gradient(135deg, ${theme.colors?.success?.main}, ${theme.colors?.success?.dark})`,
        },
        filledError: {
          background: `linear-gradient(135deg, ${theme.colors?.error?.main}, ${theme.colors?.error?.dark})`,
        },
      },
    },
  };
};
