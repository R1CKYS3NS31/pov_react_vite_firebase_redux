// mui
import { useTheme } from "@emotion/react";
import { Divider, Grid, Stack, Typography, useMediaQuery } from "@mui/material";

// project mports
import {
  AuthCardWrapper,
  AuthWrapper,
} from "../../../components/auth/AuthWrapper";
import { Link } from "react-router-dom";
import { Logo } from "../../../components/ui/Logo";
import { AuthLogin } from "../../../components/auth/auth-forms/AuthLogin";
import { AuthFooter } from "../../../components/ui/cards/AuthFooter";

export const Login = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AuthWrapper>
      <Grid
        container
        direction={"column"}
        justifyContent={"flex-end"}
        sx={{ minheight: "100vh" }}
      >
        <Grid item xs={12}>
          <Grid
            container
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ minHeight: "calc(100vh-60px)" }}
          >
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid
                  container
                  spacing={2}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Grid item sx={{ mb: 0 }}>
                    <Typography
                      component={Link}
                      to="/"
                      variant="subtitle1"
                      sx={{ textDecoration: "none" }}
                    >
                      <Logo />
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid
                      container
                      direction={matchDownSM ? "column-reverse" : "row"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Grid item>
                        <Stack
                          alignItems={"center"}
                          justifyContent={"center"}
                          spacing={1}
                        >
                          <Typography
                            color={theme.palette.secondary.main}
                            gutterBottom
                            variant={matchDownSM ? "h3" : "h2"}
                          >
                            Hi, Welcome Back
                          </Typography>
                          <Typography
                            variant="caption"
                            fontSize={"16px"}
                            textAlign={matchDownSM ? "center" : "inherit"}
                          >
                            Enter your credentials to continue
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    {/* auth form - login */}
                    <AuthLogin />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid
                      item
                      container
                      direction={"column"}
                      alignItems={"center"}
                      xs={12}
                    >
                      <Typography
                        component={Link}
                        to={"/signup"}
                        variant="subtitle1"
                        sx={{ textDecoration: "none" }}
                      >
                        Don&apos;t have an account?
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};
