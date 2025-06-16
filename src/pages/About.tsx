import NavBar from "../components/Nav/NavBar"
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Paper,
  IconButton,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { styled } from '@mui/system'; // Import styled utility
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'; 
import Footer from "../components/Footer";

// Define a custom theme for a basketball aesthetic
const theme = createTheme({
  palette: {
    primary: {
      main: '#FF5722', // Orange (like a basketball)
    },
    secondary: {
      main: '#1976D2', // Blue (like a court or team color)
    },
    background: {
      default: '#f0f2f5', // Light grey for subtle background
      paper: '#ffffff', // White for cards/papers
    },
    text: {
      primary: '#212121', // Dark grey for main text
      secondary: '#757575', // Lighter grey for secondary text
    },
  },
  typography: {
    h3: {
      fontWeight: 700,
      color: '#FF5722',
      marginBottom: '1rem',
      textAlign: 'center',
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h4: {
      fontWeight: 600,
      color: '#1976D2',
      marginBottom: '0.75rem',
      borderBottom: '2px solid #FF5722', // Orange underline
      paddingBottom: '0.5rem',
      display: 'inline-block', // Make underline only as wide as text
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    h5: {
      fontWeight: 600,
      color: '#212121',
      marginBottom: '0.5rem',
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
      },
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#212121',
    },
    body2: {
      fontSize: '0.9rem',
      lineHeight: 1.5,
      color: '#757575',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          padding: '2rem',
          marginBottom: '2rem',
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          '@media (max-width:600px)': {
            padding: '1rem',
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 80,
          height: 80,
          border: '3px solid #FF5722', 
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});


const StyledIconListItem = styled('li')(({ theme }) => ({
  marginBottom: theme.spacing(1.5),
  display: 'flex', 
  alignItems: 'flex-start', 
  gap: theme.spacing(1.5), 
  listStyle: 'none', 
  paddingLeft: 0, 
}));

const ListIcon = styled(FiberManualRecordIcon)(({ theme }) => ({
  fontSize: '1rem', 
  color: theme.palette.primary.main, 
  marginTop: '0.5rem', 
  flexShrink: 0, 
}));

// Dummy data for team members
interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Joan Njoki',
    role: 'Team Manager',
    imageUrl: 'https://via.placeholder.com/150/1976D2/FFFFFF?text=Maya', // Placeholder for demo
  },
  {
    name: 'Duke Mairura',
    role: 'Team Captain',
    imageUrl: 'https://via.placeholder.com/150/1976D2/FFFFFF?text=Maya', // Placeholder for demo
  },
  {
    name: 'Mshilla Rose',
    role: 'Head Coach',
    imageUrl: 'https://via.placeholder.com/150/FF5722/FFFFFF?text=Dr.+Ben', // Placeholder for demo
  },
  {
    name: 'Berine Okoth',
    role: 'General Manager',
    imageUrl: 'https://via.placeholder.com/150/1976D2/FFFFFF?text=Sarah', // Placeholder for demo
  },
];

// Images for the carousel
const carouselImages: string[] = [
  'src/assets/2.jpg',
  'src/assets/3.jpg',
  'src/assets/4.jpg',
  'src/assets/1.jpg',
];

// Images for Team Members


// Motion variants for fade-in effect
const fadeInVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};


const About = () => {
  // Carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Section refs and in-view states
  const storyRef = React.useRef(null);
  const missionRef = React.useRef(null);
  const teamRef = React.useRef(null);
  const achievementsRef = React.useRef(null);

  const storyInView = useInView(storyRef, { once: true, margin: '-100px' });
  const missionInView = useInView(missionRef, { once: true, margin: '-100px' });
  const teamInView = useInView(teamRef, { once: true, margin: '-100px' });
  const achievementsInView = useInView(achievementsRef, { once: true, margin: '-100px' });

  // Carousel navigation handlers
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? carouselImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === carouselImages.length - 1 ? 0 : prev + 1
    );
  };

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === carouselImages.length - 1 ? 0 : prev + 1
      );
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  return (
    <div>
      <NavBar />
      <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
          py: 4, // Vertical padding
        }}
      >
        <Container maxWidth="lg">
          {/* Carousel Section */}
          <Box
            sx={{
              position: 'relative',
              height: { xs: 200, sm: 300, md: 400 }, 
              borderRadius: '16px',
              overflow: 'hidden',
              mb: 4,
            }}
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.img
                key={currentImageIndex} // Key changes to trigger re-animation
                src={carouselImages[currentImageIndex]}
                alt="Basketball Team"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  position: 'absolute', // Position absolute for overlay
                }}
              />
            </AnimatePresence>

            {/* Overlay Text */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                color: '#fff',
                p: 2,
                zIndex: 1, // Ensure overlay is above image
              }}
            >
              <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#fff' }}>
                About Clique Mambas
              </Typography>
              <Typography variant="h5" component="p" sx={{ color: '#fff', opacity: 0.9 }}>
                Dunking Dreams, Building Champions!
              </Typography>
            </Box>

            {/* Navigation Arrows */}
            <IconButton
              onClick={handlePrevImage}
              sx={{
                position: 'absolute',
                left: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#fff',
                bgcolor: 'rgba(0,0,0,0.5)',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                zIndex: 2, // Ensure arrows are above overlay
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton
              onClick={handleNextImage}
              sx={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#fff',
                bgcolor: 'rgba(0,0,0,0.5)',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                zIndex: 2, // Ensure arrows are above overlay
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>

            {/* Navigation Dots */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 16,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                gap: 1,
                zIndex: 2, // Ensure dots are above overlay
              }}
            >
              {carouselImages.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    bgcolor: index === currentImageIndex ? theme.palette.primary.main : 'rgba(255,255,255,0.5)',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                  }}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </Box>
          </Box>

          {/* Our Story Section */}
          <motion.div
            ref={storyRef}
            initial="hidden"
            animate={storyInView ? "visible" : "hidden"}
            variants={fadeInVariants}
          >
            <Paper elevation={3}>
              <Typography variant="h4" component="h2" gutterBottom>
                Our Story
              </Typography>
              <Typography variant="body1" paragraph>
                Clique Mambas men's basketball team was founded in 2017 by a group of passionate local enthusiasts who envisioned a community-driven sports organization. Starting from humble beginnings in local leagues, our dedication to hard work, teamwork, and continuous improvement quickly propelled us to regional recognition. Over the years, we've grown into a formidable force, known not just for our on-court prowess but also for our commitment to fostering young talent and giving back to the community.
              </Typography>
              <Typography variant="body1">
                We believe in the power of basketball to unite, inspire, and transform lives. Our journey has been filled with memorable victories, challenging defeats, and countless moments of growth, all of which have shaped us into the resilient and spirited team we are today.
              </Typography>
            </Paper>
          </motion.div>

          {/* Mission & Values Section */}
          <motion.div
            ref={missionRef}
            initial="hidden"
            animate={missionInView ? "visible" : "hidden"}
            variants={fadeInVariants}
          >
            <Paper elevation={3}>
              <Typography variant="h4" component="h2" gutterBottom>
                Mission & Values
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5" gutterBottom>
                    Our Mission
                  </Typography>
                  <Typography variant="body1">
                    To achieve excellence in basketball through disciplined training, strategic play, and unwavering team spirit, while inspiring our fans and positively impacting our community.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5" gutterBottom>
                    Our Core Values
                  </Typography>
                  <Box component="ul" sx={{ pl: 0 }}> 
                    <StyledIconListItem>
                      <ListIcon />
                      <Typography component="span" variant="body1">
                        Teamwork: We believe in collaboration, mutual support, and collective success.
                      </Typography>
                    </StyledIconListItem>
                    <StyledIconListItem>
                      <ListIcon />
                      <Typography component="span" variant="body1">
                        Integrity: We uphold fairness, honesty, and respect in all our endeavors.
                      </Typography>
                    </StyledIconListItem>
                    <StyledIconListItem>
                      <ListIcon />
                      <Typography component="span" variant="body1">
                        Perseverance: We embrace challenges, learn from setbacks, and never give up.
                      </Typography>
                    </StyledIconListItem>
                    <StyledIconListItem>
                      <ListIcon />
                      <Typography component="span" variant="body1">
                        Community: We are committed to being positive role models and contributing to local well-being.
                      </Typography>
                    </StyledIconListItem>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>

          {/* Our Team Members Section */}
          <motion.div
            ref={teamRef}
            initial="hidden"
            animate={teamInView ? "visible" : "hidden"}
            variants={fadeInVariants}
          >
            <Paper elevation={3}>
              <Typography variant="h4" component="h2" gutterBottom>
                Meet Our Team
              </Typography>
              <Grid container spacing={4} justifyContent="center">
                {teamMembers.map((member, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        p: 2,
                        height: '100%', 
                      }}
                    >
                      <Avatar alt={member.name} src={member.imageUrl} sx={{ mb: 2 }} />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h5" component="div" gutterBottom>
                          {member.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {member.role}
                        </Typography>
                        <Typography variant="body2">
                          {member.bio}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </motion.div>

          {/* Achievements Section */}
          <motion.div
            ref={achievementsRef}
            initial="hidden"
            animate={achievementsInView ? "visible" : "hidden"}
            variants={fadeInVariants}
          >
            <Paper elevation={3}>
              <Typography variant="h4" component="h2" gutterBottom>
                Our Achievements
              </Typography>
              <Typography variant="body1" paragraph>
                Since our inception, Clique Mambas has celebrated numerous milestones. We are proud to have:
              </Typography>
              <Box component="ul" sx={{ pl: 0 }}> 
                <StyledIconListItem>
                  <ListIcon />
                  <Typography component="span" variant="body1">
                    Won the Regional Championship in 2010, 2015, and 2022.
                  </Typography>
                </StyledIconListItem>
                <StyledIconListItem>
                  <ListIcon />
                  <Typography component="span" variant="body1">
                    Reached the National Finals in 2016 and 2023.
                  </Typography>
                </StyledIconListItem>
                <StyledIconListItem>
                  <ListIcon />
                  <Typography component="span" variant="body1">
                    Developed 5 players who went on to play professionally.
                  </Typography>
                </StyledIconListItem>
                <StyledIconListItem>
                  <ListIcon />
                  <Typography component="span" variant="body1">
                    Hosted over 50 community basketball clinics for youth.
                  </Typography>
                </StyledIconListItem>
                <StyledIconListItem>
                  <ListIcon />
                  <Typography component="span" variant="body1">
                    Recognized with the "Sportsmanship Award" for three consecutive seasons.
                  </Typography>
                </StyledIconListItem>
              </Box>
              <Typography variant="body1">
                These achievements are a testament to the dedication of our players, coaching staff, and the unwavering support of our incredible fans. We look forward to many more years of success!
              </Typography>
            </Paper>
          </motion.div>

        </Container>
      </Box>
    </ThemeProvider>
    <Footer />
    </div>
  )
}

export default About;