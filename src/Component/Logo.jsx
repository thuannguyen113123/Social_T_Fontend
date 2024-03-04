import { Typography, useTheme } from "@mui/material";
import { tokens } from "./../theme.js";
const Logo = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Typography fontWeight="700" fontSize="1.7rem">
      <span style={{ color: colors.redAccent[500] }}>TSocial</span>
    </Typography>
  );
};

export default Logo;
