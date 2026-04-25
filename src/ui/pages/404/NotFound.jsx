import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: 3,
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
        {/* Large 404 display */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "6rem", sm: "10rem" },
            fontWeight: 950,
            lineHeight: 1,
            background: "linear-gradient(135deg, #f6c143 30%, #d6884a 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            mb: 2,
            userSelect: "none",
            animation: "float 3s ease-in-out infinite",
            "@keyframes float": {
              "0%, 100%": { transform: "translateY(0)" },
              "50%": { transform: "translateY(-15px)" },
            },
          }}
        >
          404
        </Typography>

        <Typography
          variant="h4"
          fontWeight={900}
          gutterBottom
          color="text.primary"
        >
          Page Not Found
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 5, lineHeight: 1.8, maxWidth: 400, mx: "auto" }}
        >
          Looks like this perspective doesn't exist. The page you're looking for
          may have been moved, deleted, or perhaps never existed.
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="contained"
            size="large"
            startIcon={<HomeIcon />}
            onClick={() => navigate("/")}
            sx={{ px: 4, borderRadius: 2, fontWeight: 700 }}
          >
            Go Home
          </Button>
          <Button
            variant="outlined"
            size="large"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ px: 4, borderRadius: 2, fontWeight: 700 }}
          >
            Go Back
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFound;
