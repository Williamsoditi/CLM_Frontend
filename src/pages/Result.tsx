import { useState, useEffect, SyntheticEvent } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Tabs,
  Tab,
  Chip,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "../components/Nav/NavBar";
import Footer from "../components/Footer";
import axiosInstance from "../api/axiosInstance";

// Unified Theme
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
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
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

const ResultPage = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);

  // Generate dynamic categories based on available leagues
  const leagues = ["All Leagues", ...new Set(results.map(r => r.league_name))];

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axiosInstance.get("results/");
        setResults(response.data);
      } catch (err) {
        setError("Failed to load match results.");
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  const handleTabChange = (_event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const filteredResults = tabValue === 0 
    ? results 
    : results.filter(r => r.league_name === leagues[tabValue]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      <ThemeProvider theme={theme}>
        
        {/* --- FIXED HEADER BLOCK --- */}
        <Box sx={{ position: 'sticky', top: 0, zIndex: 1200, bgcolor: 'white' }}>
          <NavBar />
          <Box sx={{ 
            borderBottom: '1px solid #e0e0e0', 
            pt: 2, 
            pb: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
          }}>
            <Typography variant="h4" sx={{ textAlign: "center", mb: 2, fontSize: {xs: '1.2rem', md: '1.8rem'} }}>
              Latest Match Results
            </Typography>
            
            <Container maxWidth="md">
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                sx={{ 
                  minHeight: '40px',
                  '& .MuiTabs-indicator': { display: 'none' },
                  '& .MuiTabs-flexContainer': { gap: 1 }
                }}
              >
                {leagues.map((league) => (
                  <Tab 
                    key={league} 
                    label={league} 
                    sx={{ 
                      textTransform: 'none',
                      fontWeight: 700,
                      minHeight: '34px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      color: 'text.secondary',
                      border: '1px solid #eee',
                      px: 2,
                      '&.Mui-selected': { 
                        color: 'white', 
                        bgcolor: 'primary.main',
                        borderColor: 'primary.main',
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
            <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}><CircularProgress /></Box>
          ) : (
            <Grid container spacing={2} justifyContent="center">
              <AnimatePresence mode="popLayout">
                {filteredResults.map((result) => (
                  <Grid item xs={12} sm={6} lg={4} key={result.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <motion.div 
                      variants={itemVariants} 
                      initial="hidden" 
                      animate="visible" 
                      exit="exit" 
                      layout
                      style={{ width: '100%' }}
                    >
                      <Card sx={{ 
                        borderRadius: 3,
                        overflow: 'hidden',
                        border: '1px solid #eee',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                      }}>
                        {/* League & Status Header */}
                        <Box sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center', 
                          px: 2, 
                          py: 1, 
                          bgcolor: '#f1f2f6',
                          borderBottom: '1px solid #eee'
                        }}>
                          <Typography sx={{ fontSize: '0.7rem', fontWeight: 800, color: 'text.secondary', mr: 4 }}>
                            {result.league_name}
                          </Typography>
                          <Chip 
                            label={result.status} 
                            size="small"
                            sx={{ 
                              height: '20px', 
                              fontSize: '0.65rem', 
                              fontWeight: 900, 
                              bgcolor: result.status.toLowerCase() === 'final' ? 'primary.main' : 'secondary.main',
                              color: 'white'
                            }} 
                          />
                        </Box>

                        <CardContent sx={{ p: 2 }}>
                          {/* Home Team */}
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography sx={{ fontWeight: 700, color: '#2c3e50' }}>{result.home_team_name}</Typography>
                            <Typography sx={{ fontSize: '1.4rem', fontWeight: 900, color: result.home_score > result.away_score ? 'primary.main' : 'text.primary' }}>
                              {result.home_score}
                            </Typography>
                          </Box>

                          {/* Away Team */}
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={{ fontWeight: 700, color: '#2c3e50' }}>{result.away_team_name}</Typography>
                            <Typography sx={{ fontSize: '1.4rem', fontWeight: 900, color: result.away_score > result.home_score ? 'primary.main' : 'text.primary' }}>
                              {result.away_score}
                            </Typography>
                          </Box>
                        </CardContent>

                        {/* Footer info */}
                        {/* <Box sx={{ px: 2, pb: 1.5, textAlign: 'right' }}>
                          <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>
                            Updated: {new Date(result.last_updated).toLocaleDateString()}
                          </Typography>
                        </Box> */}
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </AnimatePresence>
            </Grid>
          )}
        </Container>
      </ThemeProvider>
      <Footer />
    </Box>
  );
};

export default ResultPage;