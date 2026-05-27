import { useState, useEffect, SyntheticEvent } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Container,
  Tabs,
  Tab,
  Avatar,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "../components/Nav/NavBar";
import Footer from "../components/Footer";
import axiosInstance from "../api/axiosInstance";

// Icons
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const theme = createTheme({
  palette: {
    primary: { main: "#FF5722" },
    secondary: { main: "#2196F3" },
    background: { default: "#f8f9fa" },
    text: { primary: "#2c3e50", secondary: "#7f8c8d" },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    h4: { 
        fontFamily: "Raleway, sans-serif", 
        fontWeight: 800, 
        color: "#FF5722",
        textTransform: 'uppercase',
        letterSpacing: '1px'
    },
  },
});

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
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

const ScheduleComponent = () => {
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);

  const categories = ["All Games", "Home", "Away"];

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axiosInstance.get('schedule/');
        setSchedule(response.data);
      } catch (err) {
        setError("Oops! Failed to load schedule. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchSchedule();
  }, []);

  const handleTabChange = (_event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const filteredGames = schedule.filter((game) => {
    if (tabValue === 1) return game.game_type === "HOME";
    if (tabValue === 2) return game.game_type === "AWAY";
    return true;
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      <ThemeProvider theme={theme}>
        
        {/* --- FIXED HEADER BLOCK: NavBar and Tabs move together --- */}
        <Box sx={{ position: 'sticky', top: 0, zIndex: 1200, bgcolor: 'white' }}>
          <NavBar />
          <Box sx={{ 
            borderBottom: '1px solid #e0e0e0', 
            pt: 2, 
            pb: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
          }}>
            <Typography variant="h4" sx={{ textAlign: "center", mb: 2, fontSize: {xs: '1.2rem', md: '1.8rem'} }}>
              Upcoming Games
            </Typography>
            
            <Container maxWidth="sm">
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                variant="fullWidth"
                centered
                sx={{ 
                  minHeight: '40px',
                  '& .MuiTabs-indicator': { display: 'none' },
                  '& .MuiTabs-flexContainer': { gap: 1 }
                }}
              >
                {categories.map((cat) => (
                  <Tab 
                    key={cat} 
                    label={cat} 
                    sx={{ 
                      textTransform: 'none',
                      fontWeight: 700,
                      minHeight: '34px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      color: 'text.secondary',
                      border: '1px solid #eee',
                      transition: 'all 0.2s ease',
                      '&.Mui-selected': { 
                        color: 'white', 
                        bgcolor: 'primary.main',
                        borderColor: 'primary.main',
                        boxShadow: '0 4px 8px rgba(255, 87, 34, 0.3)'
                      }
                    }} 
                  />
                ))}
              </Tabs>
            </Container>
          </Box>
        </Box>

        {/* --- MAIN CONTENT --- */}
        <Container maxWidth="lg" sx={{ py: 4, flexGrow: 1 }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}><CircularProgress color="primary" /></Box>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <Grid container spacing={2} justifyContent="center">
              <AnimatePresence mode="popLayout">
                {filteredGames.map((game) => {
                  const gameDate = new Date(game.game_date);
                  const isHome = game.game_type === "HOME";

                  return (
                    <Grid item xs={12} sm={6} lg={4} key={game.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                      <motion.div 
                        variants={itemVariants} 
                        initial="hidden" 
                        animate="visible" 
                        exit="exit" 
                        layout
                        style={{ width: '100%' }}
                      >
                        <Card sx={{ 
                          display: 'flex',
                          flexDirection: 'row', 
                          alignItems: 'center', 
                          p: 2, 
                          gap: 2, 
                          borderRadius: 3,
                          borderLeft: `6px solid ${isHome ? '#FF5722' : '#2196F3'}`,
                          transition: 'transform 0.2s',
                          '&:hover': { transform: 'translateY(-4px)' }
                        }}>
                          {/* Visual Date Badge */}
                          <Box sx={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            minWidth: '60px',
                            bgcolor: '#f1f2f6',
                            borderRadius: 2,
                            p: 1
                          }}>
                            <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: 'text.secondary' }}>
                                {gameDate.toLocaleString('default', { month: 'short' }).toUpperCase()}
                            </Typography>
                            <Typography sx={{ fontSize: '1.2rem', fontWeight: 900, color: 'text.primary', lineHeight: 1 }}>
                                {gameDate.getDate()}
                            </Typography>
                          </Box>

                          <CardContent sx={{ flex: 1, p: '0 !important' }}>
                            <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: '#2c3e50', lineHeight: 1.1 }}>
                                vs. {game.opponent}
                            </Typography>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5, gap: 0.5 }}>
                                <EmojiEventsIcon sx={{ fontSize: '0.9rem', color: 'primary.main' }} />
                                <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'text.secondary' }}>
                                    {game.league_name}
                                </Typography>
                            </Box>
                            
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1, pt: 1, borderTop: '1px solid #f5f5f5' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <AccessTimeIcon sx={{ fontSize: '0.9rem', color: '#95a5a6' }} />
                                <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>{game.game_time}</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LocationOnIcon sx={{ fontSize: '0.9rem', color: '#95a5a6' }} />
                                <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {game.location}
                                </Typography>
                              </Box>
                            </Box>
                          </CardContent>

                          {/* Home/Away Label */}
                          <Typography sx={{ 
                            writingMode: 'vertical-rl', 
                            textTransform: 'uppercase', 
                            fontSize: '0.65rem', 
                            fontWeight: 900, 
                            color: isHome ? '#FF5722' : '#2196F3',
                            opacity: 0.6,
                            pl: 1,
                            borderLeft: '1px solid #eee'
                          }}>
                            {game.game_type}
                          </Typography>
                        </Card>
                      </motion.div>
                    </Grid>
                  );
                })}
              </AnimatePresence>
            </Grid>
          )}
        </Container>
      </ThemeProvider>
      <Footer />
    </Box>
  );
};

export default ScheduleComponent;