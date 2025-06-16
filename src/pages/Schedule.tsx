import  { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, CircularProgress, Alert } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { motion } from 'framer-motion';
import NavBar from '../components/Nav/NavBar';
import Footer from '../components/Footer';

// Define a custom theme with orange and blue palette
const theme = createTheme({
  palette: {
    primary: {
      main: '#FF5722', 
    },
    secondary: {
      main: '#2196F3', 
    },
    background: {
      default: '#f1f2f6', 
      paper: '#ffffff', 
    },
    text: {
      primary: '#2c3e50', 
      secondary: '#607d8b', 
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h4: {
      fontWeight: 800,
      color: '#FF5722', 
      textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
      fontSize: '2.5rem', 
      '@media (min-width:600px)': {
        fontSize: '3rem',
      },
    },
    h6: {
      fontWeight: 700, 
      color: '#2196F3', 
      letterSpacing: '0.02em', 
      fontSize: '1.4rem', 
    },
    subtitle1: {
      fontWeight: 800, 
      color: '#FF5722', 
      fontSize: '1.8rem', 
    },
    body2: {
      color: '#455a64', 
      fontSize: '0.98rem', 
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16, 
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)', 
          border: '1px solid #e0e0e0',
          height: '100%', 
          maxWidth: 300, 
          minWidth: 260, // 
          margin: '0 auto', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between', 
          padding: '24px', 
        },
      },
    },
  },
});

// Simulated API data - this would typically come from a backend
const mockScheduleData = [
  {
    id: 1,
    opponent: 'Phoenix Suns',
    time: '7:00 PM EST',
    venue: 'Arena 1',
    date: 'July 20, 2025',
    isHome: true,
    league: 'SIEL League',
  },
  {
    id: 2,
    opponent: 'Chicago Bulls',
    time: '8:30 PM EST',
    venue: 'Opponent Court',
    date: 'July 23, 2025',
    isHome: false,
    league: 'KBF League', 
  },
  {
    id: 3,
    opponent: 'Boston Celtics',
    time: '6:00 PM EST',
    venue: 'Arena 1',
    date: 'July 27, 2025',
    isHome: true,
    league: 'SIEL League', 
  },
  {
    id: 4,
    opponent: 'Los Angeles Lakers',
    time: '9:00 PM EST',
    venue: 'Opponent Court',
    date: 'July 30, 2025',
    isHome: false,
    league: 'KBF League', 
  },
  {
    id: 5,
    opponent: 'Golden State Warriors',
    time: '7:30 PM EST',
    venue: 'Arena 1',
    date: 'August 2, 2025',
    isHome: true,
    league: 'SIEL League', 
  },
  {
    id: 6,
    opponent: 'Milwaukee Bucks',
    time: '8:00 PM EST',
    venue: 'Opponent Court',
    date: 'August 5, 2025',
    isHome: false,
    league: 'KBF League', 
  },
];


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
    boxShadow: '0 16px 32px rgba(0, 0, 0, 0.3)',
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


type Game = {
  id: number;
  opponent: string;
  time: string;
  venue: string;
  date: string;
  isHome: boolean;
  league: string;
};

const Schedule = () => {
  const [schedule, setSchedule] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        // Simulate an API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        // In a real application, you would make a fetch call here:
        // const response = await fetch('/api/schedule');
        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }
        // const data = await response.json();
        setSchedule(mockScheduleData); // Using mock data for demonstration
      } catch (err) {
        console.error("Failed to fetch schedule:", err);
        setError("Failed to load schedule. Please try again later.");
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
          py: 8, 
          px: { xs: 2, sm: 4, md: 8 }, 
          backgroundColor: 'background.default', 
          minHeight: '100vh', 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
        }}
      >
        
        <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
          Upcoming Games
        </Typography>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <CircularProgress color="primary" />
            <Typography variant="h6" sx={{ ml: 2, color: 'text.secondary' }}>Loading schedule...</Typography>
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ width: '100%', maxWidth: '500px', mx: 'auto' }}>
            {error}
          </Alert>
        )}

        {!loading && !error && schedule.length === 0 && (
          <Typography variant="h6" color="text.secondary">
            No upcoming games scheduled at the moment. Check back soon!
          </Typography>
        )}

        {!loading && !error && schedule.length > 0 && (
          <Grid
            container
            spacing={4}
            justifyContent="center"
            component={motion.div}
            variants={outerContainerVariants}
            initial="hidden" // Outer container starts hidden
            animate="visible" // Outer container animates to visible, triggering staggered children
          >
            {schedule.map((game) => (
              <Grid
                item
                key={game.id}
                xs={12} // Full width on extra small screens
                sm={6}  // Half width on small screens
                md={4}  // One-third width on medium screens
                lg={3}  // One-fourth width on large screens
                sx={{ display: 'flex', justifyContent: 'center' }}
                component={motion.div}
                variants={cardWrapperVariants} // Apply card specific variants
                whileHover="hover"
              >
                <Card
                  sx={{
                    borderTop: `5px solid ${game.isHome ? theme.palette.primary.main : theme.palette.secondary.main}`,
                    background: game.isHome ? 'linear-gradient(145deg, #fff3e0, #ffeddb)' : 'linear-gradient(145deg, #e3f2fd, #d0efff)',
                  }}
                >
                  <CardContent
                    sx={{ textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}
                    component={motion.div} // Make CardContent a motion component
                    variants={cardContentStaggerVariants} // Apply stagger variants to CardContent
                    initial="hidden" // CardContent children start hidden
                    animate="visible" // CardContent children animate to visible
                  >
                    <motion.div variants={textDetailVariants}>
                      <Typography variant="h6" component="div" sx={{ mb: 0.5, color: theme.palette.text.primary }}>
                        <Box component="span" sx={{ fontWeight: 'bold' }}>vs.</Box> {game.opponent}
                      </Typography>
                    </motion.div>
                    <motion.div variants={textDetailVariants}>
                      <Typography variant="body2" color="text.secondary">
                        <Box component="span" sx={{ fontWeight: 'bold' }}>League:</Box> {game.league}
                      </Typography>
                    </motion.div>
                    <motion.div variants={textDetailVariants}>
                      <Typography variant="body2" color="text.secondary">
                        <Box component="span" sx={{ fontWeight: 'bold' }}>Date:</Box> {game.date}
                      </Typography>
                    </motion.div>
                    <motion.div variants={textDetailVariants}>
                      <Typography variant="body2" color="text.secondary">
                        <Box component="span" sx={{ fontWeight: 'bold' }}>Time:</Box> {game.time}
                      </Typography>
                    </motion.div>
                    <motion.div variants={textDetailVariants}>
                      <Typography variant="body2" color="text.secondary">
                        <Box component="span" sx={{ fontWeight: 'bold' }}>Venue:</Box> {game.venue}
                      </Typography>
                    </motion.div>
                    <motion.div variants={textDetailVariants}>
                      <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{
                          mt: 1,
                          color: game.isHome ? theme.palette.primary.main : theme.palette.secondary.main
                        }}
                      >
                        {game.isHome ? 'HOME GAME' : 'AWAY GAME'}
                      </Typography>
                    </motion.div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </ThemeProvider>
    <Footer />
    </div>
    
  );
}

export default Schedule;
