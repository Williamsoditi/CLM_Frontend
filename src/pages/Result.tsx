import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Chip,
} from '@mui/material';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import NavBar from '../components/Nav/NavBar';
import Footer from '../components/Footer';
import axiosInstance from '../api/axiosInstance';

// Define a custom theme with orange and blue palette
let theme = createTheme({
  palette: {
    primary: {
      main: '#FF5722',
      light: '#FF7C4D',
      dark: '#E04C1C',
    },
    secondary: {
      main: '#2196F3',
      light: '#64B5F6',
      dark: '#1976D2',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#34495e',
      secondary: '#7f8c8d',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h3: {
      fontFamily: 'Raleway, sans-serif',
      fontWeight: 800,
      color: '#FF5722',
      textShadow: '3px 3px 6px rgba(0,0,0,0.15)',
      marginBottom: '1rem',
    },
    h5: {
      fontFamily: 'Raleway, sans-serif',
      fontWeight: 700,
      color: '#2196F3',
      letterSpacing: '0.03em',
      marginBottom: '0.5rem',
      fontSize: '1.75rem',
    },
    subtitle1: {
      fontWeight: 700,
      color: '#555555',
      fontSize: '2.5rem',
      textAlign: 'right',
      width: 'auto',
    },
    body1: {
      color: '#555555',
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      color: '#555555',
      fontSize: '1.2rem',
      fontWeight: 600,
    },
    caption: {
      color: '#7f8c8d',
      fontSize: '1rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
          background: '#ffffff',
          border: '1px solid #e0e0e0',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '0',
          transition: 'none',
          '&:hover': {
            boxShadow: 'none',
            transform: 'none',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          width: '100%',
          padding: '16px',
          '&:last-child': {
            paddingBottom: '16px',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: '0.9rem',
          padding: '0 10px',
          height: '28px',
        },
        colorPrimary: {
          backgroundColor: 'transparent',
          color: '#34495e',
        },
        colorSecondary: {
          backgroundColor: 'transparent',
          color: '#34495e',
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 12,
      duration: 0.5,
    },
  },
};

type Result = {
  league_name: string;
  id: number;
  home_team_name: string;
  home_score: number;
  away_team_name: string;
  away_score: number;
  status: string;
  recorded_at: string;
  last_updated: string;
};

const Result = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axiosInstance.get("results/");
        
        
        setResults(response.data);
      } catch (err) {
        console.error("Failed to fetch results:", err);
        setError(
          "Failed to load past results. Please check your network connection or try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <NavBar />
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 120px)',
          backgroundColor: theme.palette.background.default,
          p: 3,
        }}>
          <CircularProgress size={60} thickness={4} color="primary" />
          <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
            Loading Match Results...
          </Typography>
        </Box>
        <Footer />
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <NavBar />
        <Box sx={{
          textAlign: 'center',
          py: 8,
          px: 2,
          minHeight: 'calc(100vh - 120px)',
          backgroundColor: theme.palette.background.default,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Typography variant="h5" color="error" sx={{ mb: 2 }}>
            Failed to load match results.
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {error}
          </Typography>
        </Box>
        <Footer />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          minHeight: 'calc(100vh - 120px)',
          py: 6,
          px: { xs: 2, sm: 4, md: 6 },
        }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Typography
            variant="h3"
            component="h1"
            align="center"
            gutterBottom
            sx={{ mb: 6 }}
          >
            Latest Match Results
          </Typography>

          {results.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                No match results available at the moment.
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                justifyContent: 'center',
                alignItems: 'stretch',
              }}
            >
              {results.map((result) => (
                <motion.div
                  key={result.id}
                  variants={itemVariants}
                  style={{
                    flex: '1 1 calc(33.33% - 20px)',
                    minWidth: '250px',
                  }}
                >
                  <Card sx={{ width: '100%', height: '100%' }}>
                    <CardContent sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '100%',
                      py: '10px',
                    }}>
                      {/* Top section: League name and FINAL chip */}
                      <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        px: '16px',
                        pt: '10px',
                        pb: '10px',
                        borderBottom: '1px solid #e0e0e0',
                      }}>
                        <Typography
                          variant="body1"
                          sx={{
                            flexGrow: 1,
                            textAlign: 'left',
                            fontWeight: 800,
                            color: theme.palette.text.primary,
                          }}
                        >
                          {result.league_name}
                        </Typography>
                        <Chip
                          label={result.status.toUpperCase()}
                          color={result.status === 'Final' ? 'primary' : 'secondary'}
                          sx={{
                            color: theme.palette.text.secondary,
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            height: '24px',
                          }}
                        />
                      </Box>

                      {/* Team 1 */}
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        mt: 2,
                        px: '16px',
                      }}>
                        <Typography variant="body1" sx={{ flexGrow: 1, textAlign: 'left', fontWeight: 600 }}>
                          {result.home_team_name}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ ml: 2 }}>
                          {result.home_score}
                        </Typography>
                      </Box>

                      {/* Team 2 */}
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        mt: 1,
                        px: '16px',
                      }}>
                        <Typography variant="body1" sx={{ flexGrow: 1, textAlign: 'left', fontWeight: 600 }}>
                          {result.away_team_name}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ ml: 2 }}>
                          {result.away_score}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </Box>
          )}
        </motion.div>
      </Box>
      <Footer />
    </ThemeProvider>
  );
};

export default Result;