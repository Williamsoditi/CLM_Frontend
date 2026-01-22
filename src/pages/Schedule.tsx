import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Container,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { motion } from "framer-motion";
import NavBar from "../components/Nav/NavBar";
import Footer from "../components/Footer";
import { styled } from "@mui/material/styles";

// 💡 NEW ICON IMPORTS
import SportsBasketballIcon from '@mui/icons-material/SportsSoccer'; // For League
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; // For Date
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // For Time
import LocationOnIcon from '@mui/icons-material/LocationOn'; // For Location/Venue
import axiosInstance from "../api/axiosInstance";
// ... (HeaderBox, theme, and Framer Motion variants remain the same) ...
/* // ... Your existing HeaderBox, theme, and Framer Motion variants here ... 
*/

const HeaderBox = styled(Box)(({ theme }) => ({
  borderRadius: 18,
  padding: theme.spacing(4, 2),
  marginBottom: theme.spacing(4),
  textAlign: "center",
  color: "black",
}));

// Define a custom theme with orange and blue palette
const theme = createTheme({
  palette: {
    primary: {
      main: "#FF5722",
    },
    secondary: {
      main: "#000080",
    },
    background: {
      default: "#f1f2f6",
      paper: "#ffffff",
    },
    text: {
      primary: "#2c3e50",
      secondary: "#607d8b",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    h4: {
      fontFamily: "Raleway, sans-serif",
      fontWeight: 800,
      color: "#FF5722",
      textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
      fontSize: "2.5rem",
      "@media (min-width:600px)": {
        fontSize: "3rem",
      },
    },
    h6: {
      fontFamily: "Raleway, sans-serif",
      fontWeight: 700,
      color: "#2196F3",
      letterSpacing: "0.02em",
      fontSize: "1.4rem",
    },
    subtitle1: {
      fontWeight: 800,
      color: "#FF5722",
      fontSize: "1.8rem",
    },
    body2: {
      color: "#455a64",
      fontSize: "0.98rem",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.18)",
          border: "1px solid #e0e0e0",
          height: "100%",
          maxWidth: 320,
          minWidth: 260, //
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "24px",
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        },
      },
    },
  },
});

// Framer Motion variants for the overall Grid container (staggers cards)
const outerContainerVariants = {
  hidden: { opacity: 0 }, // Parent starts hidden
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger each card (Grid item)
    },
  },
};

// Framer Motion variants for each individual card wrapper (Grid item)
const cardWrapperVariants = {
  hidden: { y: 50, opacity: 0 }, // Cards start below and invisible
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 10,
      when: "beforeChildren", // Animate the card first, then its content
    },
  },
  hover: {
    y: -10,
    scale: 1.03,
    boxShadow: "0 16px 32px rgba(0, 0, 0, 0.35)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

// Framer Motion variants for the CardContent to stagger its children (text details)
const cardContentStaggerVariants = {
  hidden: { opacity: 0 }, // CardContent starts hidden for its children
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // Stagger each text detail
      delayChildren: 0.2, // Delay before text details start animating after card appears
    },
  },
};

// Framer Motion variants for individual text details inside the card
const textDetailVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

type Schedule = {
  id: number;
  opponent: string;
  game_time: string;
  location: string;
  game_date: string;
  game_type: "HOME" | "AWAY";
  league_name: string;
};

const ScheduleComponent = () => { // Renamed from Schedule to ScheduleComponent to avoid conflict with the type
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axiosInstance.get('schedule/');
        // IMPORTANT: Replace with your actual Django API endpoint
        setSchedule(response.data);
      } catch (err) {
        console.error("Failed to fetch schedule:", err);
        setError(
          "Failed to load schedule. Please check your network connection or try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <div>
      <NavBar />
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            py: { xs: 3, sm: 2, md: 4 },
            px: { xs: 2, sm: 4, md: 8 },
            backgroundColor: "background.default",
            // minHeight: "calc(100vh - 64px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            flexGrow: 1,
          }}
        >
          <Container maxWidth="md">
            <HeaderBox>
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{ color: "#FF5722" }}
              >
                Upcoming Games
              </Typography>
              <Typography variant="h6" sx={{ color: "#FF5721" }}>
                Don't miss any action!
              </Typography>
            </HeaderBox>
          </Container>

          {loading && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "200px",
              }}
            >
              <CircularProgress color="primary" size={60} thickness={4} />
              <Typography variant="h6" sx={{ mt: 2, color: "text.secondary" }}>
                Fetching game schedule...
              </Typography>
            </Box>
          )}

          {error && (
            <Alert
              severity="error"
              sx={{
                width: "100%",
                maxWidth: "600px",
                mx: "auto",
                mb: 4,
                p: 2,
                fontSize: "1.1rem",
              }}
            >
              {error}
            </Alert>
          )}

          {!loading && !error && schedule.length === 0 && (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                No upcoming games scheduled at the moment.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Please check back soon for updates!
              </Typography>
            </Box>
          )}

          {!loading && !error && schedule.length > 0 && (
            <Grid
              container
              spacing={6}
              justifyContent="center"
              component={motion.div}
              variants={outerContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {schedule.map((game) => {
                // Parse date and time for better formatting
                const gameDateTime = new Date(
                  `${game.game_date}T${game.game_time}`
                );
                const formattedDate = gameDateTime.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });
                const formattedTime = gameDateTime.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                });

                const isHomeGame = game.game_type === "HOME";

                return (
                  <Grid
                    item // Changed 'size' to 'item' and added responsive props
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={game.id}
                    sx={{ display: "flex", justifyContent: "center" }}
                    component={motion.div}
                    variants={cardWrapperVariants}
                    whileHover="hover"
                  >
                    <Card
                      sx={{
                        borderTop: `5px solid ${
                          isHomeGame
                            ? theme.palette.primary.main
                            : "ffffff"
                        }`,
                        background: isHomeGame
                          ? "linear-gradient(145deg, #fff3e0, #ffeddb)"
                          : "linear-gradient(145deg, #000080, #000066)",
                        color: isHomeGame ? "inherit" : "#ffffff",
                      }}
                    >
                      <CardContent
                        sx={{
                          textAlign: "center",
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                        }}
                        component={motion.div}
                        variants={cardContentStaggerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {/* Opponent (vs. [Opponent Name]) */}
                        <motion.div variants={textDetailVariants}>
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{ mb: 0.5, color: isHomeGame ? "text.primary" : "#ffffff" }}
                          >
                            <Box component="span" sx={{ fontWeight: "bold" }}>
                              vs.
                            </Box>{" "}
                            {game.opponent}
                          </Typography>
                        </motion.div>
                        
                        {/* League */}
                        <motion.div variants={textDetailVariants}>
                          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: isHomeGame ? 'text.secondary' : '#dddddd' }}>
                            <SportsBasketballIcon sx={{ mr: 1, fontSize: '1.1em', color: "ffffff" }} />
                            <Box component="span" sx={{ fontWeight: "bold" }}>
                              {game.league_name}
                            </Box>
                          </Typography>
                        </motion.div>
                        
                        {/* Date */}
                        <motion.div variants={textDetailVariants}>
                          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: isHomeGame ? 'text.secondary' : '#dddddd' }}>
                            <CalendarTodayIcon sx={{ mr: 1, fontSize: '1.1em', color: "ffffff" }} />
                            <Box component="span" sx={{ fontWeight: "bold" }}>
                              {formattedDate}
                            </Box>
                          </Typography>
                        </motion.div>
                        
                        {/* Time */}
                        <motion.div variants={textDetailVariants}>
                          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: isHomeGame ? 'text.secondary' : '#ffffff' }}>
                            <AccessTimeIcon sx={{ mr: 1, fontSize: '1.1em', color: "ffffff" }} />
                            <Box component="span" sx={{ fontWeight: "bold" }}>
                              {formattedTime}
                            </Box>
                          </Typography>
                        </motion.div>

                        {/* Venue/Location */}
                        <motion.div variants={textDetailVariants}>
                          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: isHomeGame ? 'text.secondary' : '#ffffff' }}>
                            <LocationOnIcon sx={{ mr: 1, fontSize: '1.1em', color: "ffffff" }} />
                            <Box component="span" sx={{ fontWeight: "bold" }}>
                              {game.location}
                            </Box>
                          </Typography>
                        </motion.div>
                        
                        {/* HOME/AWAY Status */}
                        <motion.div variants={textDetailVariants}>
                          <Typography
                            variant="subtitle1"
                            component="div"
                            sx={{
                              mt: 1,
                              color: isHomeGame ? "text.primary" : "#ffffff"
                            }}
                          >
                            {isHomeGame ? "HOME GAME" : "AWAY GAME"}
                          </Typography>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Box>
      </ThemeProvider>
      <Footer />
    </div>
  );
};

export default ScheduleComponent;