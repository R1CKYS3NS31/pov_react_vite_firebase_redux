import {
  AuthCardWrapper,
  AuthWrapper,
} from "../../../components/auth/AuthWrapper";
import { AuthFooter } from "../../../components/ui/cards/AuthFooter";
import {
  Divider,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import { AuthRegister } from "../../../components/auth/auth-forms/AuthRegister";
import { Logo } from "../../../components/ui/Logo";
import { useTheme } from "@emotion/react";

export const Register = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AuthWrapper>
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: "calc(100vh - 68px)" }}
          >
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
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
                  <Grid item>
                    <Grid
                      container
                      direction={matchDownSM ? "column-reverse" : "row"}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          spacing={1}
                        >
                          <Typography
                            color={theme.palette.secondary.main}
                            gutterBottom
                            variant={matchDownSM ? "h3" : "h2"}
                          >
                            Sign up
                          </Typography>
                          <Typography
                            variant="caption"
                            fontSize="16px"
                            textAlign={matchDownSM ? "center" : "inherit"}
                          >
                            Enter your credentials to continue
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item >
                    <AuthRegister />
                  </Grid>
                  <Grid item >
                    <Divider />
                  </Grid>
                  <Grid item >
                    <Grid
                      item
                      container
                      direction="column"
                      alignItems="center"
                                          >
                      <Typography
                        component={Link}
                        to="/signin"
                        variant="subtitle1"
                        sx={{ textDecoration: "none" }}
                      >
                        Already have an account?
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item  sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};
