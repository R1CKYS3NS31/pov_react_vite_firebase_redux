import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  AccountCircleOutlined,
  LockOutlined,
  SupportAgentOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const SettingTab = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState("account/setting");
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    navigate(index);
  };

  return (
    <List
      component="nav"
      sx={{
        p: 0,
        "& .MuiListItemIcon-root": {
          minWidth: 32,
          color: theme.palette.grey[500],
        },
      }}
    >
      <ListItemButton
        selected={selectedIndex === "account/setting"}
        onClick={(event) => handleListItemClick(event, "account/setting")}
      >
        <ListItemIcon>
          <AccountCircleOutlined />
        </ListItemIcon>
        <ListItemText primary="Account Settings" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === "/"}
        onClick={(event) => handleListItemClick(event, "/")}
      >
        <ListItemIcon>
          <LockOutlined />
        </ListItemIcon>
        <ListItemText primary="Privacy Center" />
      </ListItemButton>{" "}
      <ListItemButton
        selected={selectedIndex === "support"}
        onClick={(event) => handleListItemClick(event, "support")}
      >
        <ListItemIcon>
          <SupportAgentOutlined />
        </ListItemIcon>
        <ListItemText primary="Support" />
      </ListItemButton>
    </List>
  );
};
