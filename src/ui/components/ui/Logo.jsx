import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";
// import PoV from "../../../ui/assets/icons/ic_launcher-playstore.png";

export const Logo = () => {
  const theme = useTheme();
  return (
    <Typography variant='h1' color={theme.palette.grey[900]}>PoV</Typography>
//     <img
//     src={PoV}
//     alt="PoV"
//     width={50}
//     height={50}
//     // style={{ marginRight: matchDownSM ? 8 : 16 }}
//   />
  );
};
