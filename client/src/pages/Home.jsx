import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import { AccountCircle, Agriculture } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FarmerDataForm from "../components/inputForm";
import { Link } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2e7d32", // Dark green
    },
    secondary: {
      main: "#4caf50", // Light green
    },
  },
});

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
  backgroundImage: "url(https://source.unsplash.com/random/?farm,agriculture)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "70vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  textAlign: "center",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  padding: theme.spacing(3),
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  borderRadius: theme.shape.borderRadius,
  maxWidth: "600px",
}));

const HomePage = () => {
  const [showForm, setShowForm] = useState(false); // Manage form visibility state
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleGetStarted = () => {
    setShowForm(true); // Show the form when button is clicked
  };

  const handleBack = () => {
    setShowForm(false); // Hide the form and go back to the hero section
  };

  return (
    <ThemeProvider theme={theme}>
      <HeroSection>
        <ContentBox>
          <Typography
            variant={isMobile ? "h4" : "h3"}
            component="h1"
            color="primary.main"
            gutterBottom
          >
            Empowering Farmers with Smart Technology
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Farmer's Friend provides real-time, data-driven advisory services to
            optimize crop yields and manage resources efficiently.
          </Typography>
          <Link to="/getdata">
            <Button>Get Started</Button>
          </Link>
        </ContentBox>
      </HeroSection>

      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom color="primary">
          Key Features
        </Typography>
        <Box
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          justifyContent="space-between"
        >
          <Box flex={1} p={2}>
            <Typography variant="h6" gutterBottom color="secondary">
              Predictive Analytics
            </Typography>
            <Typography variant="body2">
              Optimize crop performance with AI-driven recommendations for
              planting, fertilization, and irrigation.
            </Typography>
          </Box>
          <Box flex={1} p={2}>
            <Typography variant="h6" gutterBottom color="secondary">
              Remote Accessibility
            </Typography>
            <Typography variant="body2">
              Access vital information and insights regardless of your location
              or connectivity challenges.
            </Typography>
          </Box>
          <Box flex={1} p={2}>
            <Typography variant="h6" gutterBottom color="secondary">
              Community Forum
            </Typography>
            <Typography variant="body2">
              Connect with other farmers to share experiences, strategies, and
              foster collaborative knowledge exchange.
            </Typography>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default HomePage;
