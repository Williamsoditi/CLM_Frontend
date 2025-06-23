import NavBar from "../components/Nav/NavBar"
import { Box, Typography, Card, CardContent, Avatar, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { motion } from 'framer-motion'; 
import Footer from "../components/Footer";
import axios from 'axios';
import { useState, useEffect } from 'react';

// Define a custom theme with orange and blue palette
const theme = createTheme({
  palette: {
    primary: {
      main: '#FF5722', // Orange
    },
    secondary: {
      main: '#2196F3', // Blue
    },
    background: {
      default: '#f1f2f6',
    },
    text: {
      primary: '#2c3e50', 
      secondary: '#7f8c8d', 
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h4: {
      fontWeight: 800, 
      color: '#FF5722', 
      textShadow: '2px 2px 4px rgba(0,0,0,0.1)', 
    },
    h6: {
      fontWeight: 700, 
      color: '#2196F3', 
      letterSpacing: '0.02em', 
    },
    subtitle1: {
        fontWeight: 600,
        color: '#FF5722', 
        fontSize: '1.8rem', 
    },
    body2: {
      color: '#555555', 
      fontSize: '0.95rem',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16, 
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)', 
          background: 'linear-gradient(145deg, #ffffff, #f0f0f0)', 
          border: '1px solid #e0e0e0', 
          height: '100%',
          maxWidth: 300, 
          minWidth: 260,  
          margin: '0 auto', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px', 
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 90, 
          height: 90,
          border: '4px solid #2196F3', 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
          transition: 'transform 0.3s ease-in-out', 
          '&:hover': {
            transform: 'scale(1.1)', 
          },
        },
      },
    },
  },
});

// const teamRoster = [
//   {
//     id: 1,
//     name: 'LeBron James',
//     number: 23,
//     position: 'SF',
//     height: "6'9\"",
//     weight: '250 lbs',
//     avatar: 'https://placehold.co/150x150/FF5722/FFFFFF?text=LJ', // Orange avatar placeholder
//   },
//   {
//     id: 2,
//     name: 'Stephen Curry',
//     number: 30,
//     position: 'PG',
//     height: "6'2\"",
//     weight: '185 lbs',
//     avatar: 'https://placehold.co/150x150/2196F3/FFFFFF?text=SC', // Blue avatar placeholder
//   },
//   {
//     id: 3,
//     name: 'Kevin Durant',
//     number: 7,
//     position: 'PF',
//     height: "6'10\"",
//     weight: '240 lbs',
//     avatar: 'https://placehold.co/150x150/FF5722/FFFFFF?text=KD',
//   },
//   {
//     id: 4,
//     name: 'Nikola Jokic',
//     number: 15,
//     position: 'C',
//     height: "6'11\"",
//     weight: '284 lbs',
//     avatar: 'https://placehold.co/150x150/2196F3/FFFFFF?text=NJ',
//   },
//   {
//     id: 5,
//     name: 'Giannis Antetokounmpo',
//     number: 34,
//     position: 'PF',
//     height: "6'11\"",
//     weight: '243 lbs',
//     avatar: 'https://placehold.co/150x150/FF5722/FFFFFF?text=GA',
//   },
//   {
//     id: 6,
//     name: 'Luka Doncic',
//     number: 77,
//     position: 'SG',
//     height: "6'7\"",
//     weight: '230 lbs',
//     avatar: 'https://placehold.co/150x150/2196F3/FFFFFF?text=LD',
//   },
// ];

// Framer Motion variants for staggered animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, 
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring", 
      stiffness: 100, 
      damping: 10,  
    },
  },
  hover: {
    y: -8, 
    scale: 1.02, 
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.25)', 
    transition: {
      duration: 0.3,
    },
  },
};

const CLOUDINARY_CLOUD_NAME = "doairargz";

type Player = {
  id: number;
  name: string;
  jersey_number: number;
  position: string;
  height: string;
  weight: string;
  image?: string;
};

const Roster = () => {
  const [teamRoster, setTeamRoster] = useState<Player[]>([]); // State to hold fetched player data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchRoster = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/roster/'); 
        setTeamRoster(response.data);
      } catch (err) {
        console.error("Error fetching roster:", err);
        setError('Failed to load roster. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRoster();
  }, []);

  return (
    <div>
      <NavBar />
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            py: 8,
            px: { xs: 2, sm: 4, md: 8 },
            backgroundColor: "background.default",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ textAlign: "center" }}
          >
            Our Elite Roster
          </Typography>

          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "300px",
              }}
            >
              <CircularProgress color="primary" />
              <Typography variant="h6" sx={{ ml: 2, color: "text.secondary" }}>
                Loading Players...
              </Typography>
            </Box>
          ) : error ? (
            <Typography variant="h6" color="error" sx={{ textAlign: "center" }}>
              {error}
            </Typography>
          ) : teamRoster.length === 0 ? (
            <Typography
              variant="h6"
              sx={{ textAlign: "center", color: "text.secondary" }}
            >
              No players found on the roster.
            </Typography>
          ) : (
            <Grid
              container
              spacing={4}
              justifyContent="center"
              component={motion.div}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {teamRoster.map((player) => {
                // Construct the full Cloudinary URL
                const fullCloudinaryUrl = player.image
                  ? `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/${player.image}`
                  : null; // Set to null if no image path

                return (
                  <Grid size= {{ xs: 12, sm: 6, md: 4, lg: 3 }}
                    key={player.id}
                    sx={{ display: "flex" }}
                  >
                    <motion.div
                      variants={itemVariants}
                      whileHover="hover"
                      style={{ width: "100%", display: "flex" }}
                    >
                      <Card
                        sx={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          p: 3,
                        }}
                      >
                        <Avatar
                          alt={player.name}
                          // Use the constructed fullCloudinaryUrl
                          src={
                            fullCloudinaryUrl ||
                            `https://placehold.co/150x150/${
                              player.jersey_number % 2 === 0
                                ? "2196F3"
                                : "FF5722"
                            }/FFFFFF?text=${
                              player.name.charAt(0) +
                              (player.name.split(" ").length > 1
                                ? player.name.split(" ")[1].charAt(0)
                                : "")
                            }`
                          }
                          imgProps={{
                            onError: (e) => {
                              (e.target as HTMLImageElement).src = `https://placehold.co/150x150/${
                                player.jersey_number % 2 === 0
                                  ? "2196F3"
                                  : "FF5722"
                              }/FFFFFF?text=${
                                player.name.charAt(0) +
                                (player.name.split(" ").length > 1
                                  ? player.name.split(" ")[1].charAt(0)
                                  : "")
                              }`;
                            },
                          }}
                          sx={{ mb: 2 }}
                        />
                        <CardContent
                          sx={{ textAlign: "center", width: "100%", pt: 0 }}
                        >
                          {/* ... rest of your player details ... */}
                          <Typography
                            variant="subtitle1"
                            component="div"
                            sx={{ mb: 1 }}
                          >
                            #{player.jersey_number}
                          </Typography>
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{ mb: 1.5 }}
                          >
                            {player.name}
                          </Typography>
                          <Box
                            sx={{
                              mt: 2,
                              pt: 2,
                              borderTop: "1px solid #e0e0e0",
                              display: "flex",
                              flexDirection: "column",
                              gap: "8px",
                              alignItems: "center",
                            }}
                          >
                            <Typography variant="body2">
                              <Box
                                component="span"
                                sx={{
                                  fontWeight: "bold",
                                  color: theme.palette.text.secondary,
                                }}
                              >
                                Position:
                              </Box>{" "}
                              {player.position}
                            </Typography>
                            <Typography variant="body2">
                              <Box
                                component="span"
                                sx={{
                                  fontWeight: "bold",
                                  color: theme.palette.text.secondary,
                                }}
                              >
                                Height:
                              </Box>{" "}
                              {player.height}
                            </Typography>
                            <Typography variant="body2">
                              <Box
                                component="span"
                                sx={{
                                  fontWeight: "bold",
                                  color: theme.palette.text.secondary,
                                }}
                              >
                                Weight:
                              </Box>{" "}
                              {player.weight}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
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
}

export default Roster
