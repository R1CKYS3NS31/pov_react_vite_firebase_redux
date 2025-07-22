import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  strengthColor,
  strengthIndicator,
} from "../../../../utils/password-strength";

export const PasswordForm = ({
  handleSubmitPassword,
  loading,
  errorPassword,
  setErrorPassword,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (newPassword && newPassword) {
      setErrorPassword("");
    } else {
      setErrorPassword("*please fill required fields");
    }
  }, [newPassword, setErrorPassword]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changeNewPassword = (value) => {
    setNewPassword(value);
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };
  const changeConfirmPassword = (value) => {
    setConfirmPassword(value);
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };
  return (
    <form onSubmit={handleSubmitPassword}>
      <Grid container spacing={2}>
        <Grid item size={{ xs: 12, sm: 6 }}></Grid>
        <Grid item size={{ sm: 6 }}>
          <TextField
            required
            fullWidth
            variant="standard"
            name="newPassword"
            placeholder="new password"
            label="New Password"
            // type="password"
            type={showPassword ? "text" : "password"}
            id="newPassword"
            value={newPassword}
            onChange={(e) => {
              // handleChange(e);
              changeNewPassword(e.target.value);
            }}
            autoComplete="new-password"
            endadornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  size="large"
                >
                  {showPassword ? (
                    <VisibilityOutlined />
                  ) : (
                    <VisibilityOffOutlined />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />

          {strength !== 0 && (
            <FormControl>
              <Box sx={{ my: 1 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Box
                      style={{ backgroundColor: level?.color }}
                      sx={{
                        width: 85,
                        height: 8,
                        borderRadius: "7px",
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" fontSize="0.75rem">
                      {level?.label}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </FormControl>
          )}
        </Grid>
        <Grid item size={{ sm: 6 }}>
          <TextField
            required
            fullWidth
            variant="standard"
            name="confirmPassword"
            placeholder="confirm password"
            label="Confirm Password"
            // type="password"
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => {
              // handleChange(e);
              changeConfirmPassword(e.target.value);
            }}
            autoComplete="new-password"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? (
                        <VisibilityOutlined />
                      ) : (
                        <VisibilityOffOutlined />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          {strength !== 0 && (
            <FormControl>
              <Box sx={{ my: 1 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Box
                      style={{ backgroundColor: level?.color }}
                      sx={{
                        width: 85,
                        height: 8,
                        borderRadius: "7px",
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" fontSize="0.75rem">
                      {level?.label}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </FormControl>
          )}
        </Grid>
        <Grid item size={12}>
          <FormHelperText
            component={Typography}
            variant="subtitle1"
            sx={{
              color: "error.main",
            }}
          >
            {errorPassword}
          </FormHelperText>
        </Grid>
        <Grid item size={{sm:6}}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={errorPassword || loading ? true : false}
          >
            {loading ? (
              <CircularProgress variant="indeterminate" color="primary" />
            ) : (
              "Change Password"
            )}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
