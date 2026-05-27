import NavBar from "../components/Nav/NavBar"
import { Box, Typography, Card, CardContent, Avatar, CircularProgress, Grid, Tabs, Tab, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion'; 
import Footer from "../components/Footer";
import axiosInstance from "../api/axiosInstance";
import { useState, useEffect, SyntheticEvent } from 'react';

// Unified Theme
const theme = createTheme({
  palette: {
    primary: { main: '#FF5722' },
    secondary: { main: '#2196F3' },
    background: { default: '#f8f9fa' },
    text: { primary: '#2c3e50', secondary: '#7f8c8d' },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h4: { 
      fontFamily: 'Raleway, sans-serif', 
      fontWeight: 800, 
      color: '#FF5722',
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

const CLOUDINARY_CLOUD_NAME = "doairargz";

type Player = {
  height: number;
  weight: number;
  id: number;
  name: string;
  jersey_number: number;
  position: 'PG' | 'SG' | 'SF' | 'PF' | 'C'; 
  image?: string;
};

const Roster = () => {
  const [teamRoster, setTeamRoster] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);

  const categories = ["All", "Guards", "Forwards", "Centers"];

  useEffect(() => {
    const fetchRoster = async () => {
      try {
        const response = await axiosInstance.get('roster/');
        setTeamRoster(response.data);
      } catch (err) {
        setError('Failed to load roster.');
      } finally {
        setLoading(false);
      }
    };
    fetchRoster();
  }, []);

  const handleTabChange = (_event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const filteredPlayers = teamRoster.filter((player) => {
    switch (tabValue) {
      case 1: return ['PG', 'SG'].includes(player.position);
      case 2: return ['SF', 'PF'].includes(player.position);
      case 3: return player.position === 'C';
      default: return true;
    }
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
              Our Elite Roster
            </Typography>
            
            <Container maxWidth="sm">
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                variant="scrollable"
                scrollButtons={false}
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
                      px: 2,
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

        {/* --- MAIN CONTENT: Players list --- */}
        <Container maxWidth="lg" sx={{ py: 4, flexGrow: 1 }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}><CircularProgress color="primary" /></Box>
          ) : (
            <Grid container spacing={2} justifyContent="center">
              <AnimatePresence mode="popLayout">
                {filteredPlayers.map((player) => {
                  const initials = player.name.split(" ").map(n => n[0]).join("");
                  const placeholder = `https://placehold.co/150x150/FF5722/FFFFFF?text=${initials}`;
                  const photo = player.image ? `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/${player.image}` : placeholder;

                  return (
                    <Grid item xs={12} sm={6} lg={4} key={player.id} sx={{ display: 'flex', justifyContent: 'center' }}>
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
                          transition: 'transform 0.2s',
                          '&:hover': { transform: 'translateY(-4px)' }
                        }}>
                          <Avatar
                            src={photo}
                            sx={{ width: 70, height: 70, border: '2px solid #2196F3' }}
                          />
                          <CardContent sx={{ flex: 1, p: '0 !important' }}>
                            <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: '#2c3e50', lineHeight: 1.1 }}>
                                {player.name}
                            </Typography>
                            <Typography sx={{ fontSize: '0.9rem', color: 'primary.main', fontWeight: 700, mt: 0.2 }}>
                                #{player.jersey_number}
                            </Typography>
                            
                            <Box sx={{ display: 'flex', gap: 2, mt: 1, pt: 0.5, borderTop: '1px solid #f5f5f5' }}>
                              <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
                                <strong>POS:</strong> {player.position}
                              </Typography>
                              <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
                                <strong>H:</strong> {player.height}ft
                              </Typography>
                            </Box>
                          </CardContent>
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
}

export default Roster;