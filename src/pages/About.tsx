import  { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // For the functional "See More" link
import axiosInstance from "../api/axiosInstance";
import {
  Container,
  Typography,
  Box,
  Grid,
  Avatar,
  Paper,
  Stack,
  Divider,
  Chip,
  useMediaQuery,
  CssBaseline,
  CircularProgress,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import { styled } from "@mui/system";

// Image Imports (Keeping leadership static as they change less often)
import dukeImg from "../assets/duke.jpeg";
import coachImg from "../assets/coach.jpeg";
import brianImg from "../assets/brian.jpeg";
import kmanImg from "../assets/kman.jpeg";
import act1 from "../assets/act1.jpeg";
import act2 from "../assets/act2.jpeg";
import act3 from "../assets/act3.jpeg";
import act4 from "../assets/act4.jpeg";
import sielteam from "../assets/sielteam.jpeg";

// Icons
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import VerifiedIcon from "@mui/icons-material/Verified";

import NavBar from "../components/Nav/NavBar";
import Footer from "../components/Footer";

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: "#FF5722", contrastText: "#fff" },
    secondary: { main: "#0D47A1" },
    background: { default: "#F4F7F9", paper: "#ffffff" },
  },
  typography: {
    fontFamily: "'Inter', 'Poppins', sans-serif",
    h2: { fontWeight: 900, letterSpacing: "-0.02em" },
    h4: { fontWeight: 800, color: "#1A237E" },
    h6: { fontWeight: 700 },
    body1: { lineHeight: 1.8, color: "#455A64", fontSize: "1.1rem" },
  },
});

// --- STYLED COMPONENTS ---
const GlassPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  borderRadius: "24px",
  backdropFilter: "blur(10px)",
  backgroundColor: "rgba(255, 255, 255, 0.9)", 
  border: "1px solid rgba(255, 255, 255, 0.3)",
  boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(3),
  },
}));

const GalleryItem = styled(motion.div)(({ theme }) => ({
  position: "relative",
  borderRadius: "16px",
  overflow: "hidden",
  height: "350px",
  cursor: "pointer",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.6s cubic-bezier(0.33, 1, 0.68, 1)",
  },
  "&:hover img": {
    transform: "scale(1.1)",
  },
  "&:hover .overlay": {
    opacity: 1,
  },
}));

const ImageOverlay = styled(Box)({
  position: "absolute",
  inset: 0,
  background: "linear-gradient(to top, rgba(26, 35, 126, 0.9) 0%, rgba(26, 35, 126, 0.2) 60%, transparent 100%)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  padding: "20px",
  opacity: 0,
  transition: "opacity 0.4s ease",
  color: "white",
});

// --- TYPES ---
type GalleryData = {
    id: number;
    caption: string;
    image_url: string;
};

const carouselImages = [act1, act2, act3, act4, sielteam];
const teamLeadership = [
  { name: "Duke Mairura", role: "Captain", img: dukeImg, tag: "Elite Guard" },
  { name: "Mshilla Rose", role: "Head Coach", img: coachImg, tag: "Pro Tactician" },
  { name: "Brian Wakho", role: "Operations", img: brianImg, tag: "Operations" },
  // { name: "Chris Kipkemoi", role: "Assistant Coach", img: kmanImg, tag: "Defensive Specialist" },
];

const About = () => {
  const [idx, setIdx] = useState(0);
  const [gallery, setGallery] = useState<GalleryData[]>([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('gallery/');
        // Only take the first 6 images from the API
        setGallery(response.data.slice(0, 6));
      } catch (err) {
        console.error('Error fetching gallery for about page:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    const timer = setInterval(() => setIdx((prev) => (prev + 1) % carouselImages.length), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />

      <Box sx={{ bgcolor: "background.default", pb: 8 }}>
        {/* HERO SECTION */}
        <Box sx={{ position: "relative", height: { xs: "50vh", md: "70vh" }, overflow: "hidden", mb: 8 }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={idx}
              src={carouselImages[idx]}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </AnimatePresence>
          <Box sx={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(13, 71, 161, 0.85), transparent)",
            display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", p: 3
          }}>
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              <Typography variant={isMobile ? "h4" : "h2"} sx={{ color: "white", textTransform: "uppercase", mb: 1 }}>
                Clique Mambas
              </Typography>
              <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.8)", fontWeight: 400, letterSpacing: 4 }}>
                EST. 2017 • MEN'S ELITE BASKETBALL
              </Typography>
            </motion.div>
          </Box>
        </Box>

        <Container maxWidth="lg">
          {/* SECTION 1: CORE STORY */}
          <Box sx={{ mb: 10 }}>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <GlassPaper>
                <Chip label="OUR MISSION" color="primary" sx={{ mb: 3, fontWeight: 700, px: 2 }} />
                <Typography variant="h4" gutterBottom>More Than A Club</Typography>
                <Typography variant="body1" paragraph>
                  The Clique Mambas represent the pinnacle of regional basketball excellence. 
                  Competing in the <strong>Kenya National Basketball League - Division 1</strong>, we are committed 
                  to professionalizing the local game.
                </Typography>
                <Typography variant="body1">
                  Our "Mamba Mentality" framework combines high-level tactical execution—specifically 
                  split-action offenses and aggressive defensive trapping—with a community-first 
                  approach to player development.
                </Typography>
              </GlassPaper>
            </motion.div>
          </Box>

          {/* SECTION 2: ACCOLADES */}
          <Box sx={{ width: '100%', mb: 12 }}>
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: { xs: 3, md: 6 }, 
                  borderRadius: '24px', 
                  bgcolor: 'white', 
                  borderTop: '10px solid #FF5722',
                  border: '1px solid #eee',
                  boxShadow: '0 25px 60px rgba(0,0,0,0.05)',
                }}
              >
                <Typography variant="h4" sx={{ mb: 5, display: 'flex', alignItems: 'center', gap: 2, color: '#1A237E' }}>
                  <MilitaryTechIcon sx={{ fontSize: 40, color: '#FF5722' }} />
                  Accolades History
                </Typography>

                <Stack spacing={0}>
                  {[
                    { year: '2023/2024', league: 'Street League', status: 'Runners Up', win: false },
                    { year: '2023', league: 'Division 2', status: 'Runners Up', win: false },
                    { year: '2022', league: 'NBA League', status: 'Runners Up', win: false },
                    { year: '2021', league: 'Peace Cup', status: 'CHAMPIONS', win: true },
                    { year: '2021/2022', league: 'Street League', status: 'CHAMPIONS', win: true },
                  ].map((item, i) => (
                    <Box key={i}>
                      <motion.div whileHover={{ x: 10 }} transition={{ type: "spring", stiffness: 300 }}>
                        <Box sx={{ 
                          display: 'flex', alignItems: 'center', py: 3, px: { xs: 1, md: 3 },
                          bgcolor: item.win ? 'rgba(255, 87, 34, 0.04)' : 'transparent',
                          '&:hover': { bgcolor: '#fbfbfb' }
                        }}>
                          <Typography variant="h5" sx={{ fontWeight: 900, color: item.win ? '#FF5722' : '#B0BEC5', minWidth: { xs: 100, md: 150 } }}>
                            {item.year}
                          </Typography>
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" sx={{ color: '#1A237E', mb: 0.5 }}>{item.league}</Typography>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, textTransform: 'uppercase', color: item.win ? '#FF5722' : '#78909C', letterSpacing: 1 }}>{item.status}</Typography>
                          </Box>
                          {item.win ? <MilitaryTechIcon sx={{ fontSize: 45, color: '#FFD700' }} /> : <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ECEFF1', mr: 2 }} />}
                        </Box>
                      </motion.div>
                      {i < 4 && <Divider />}
                    </Box>
                  ))}
                </Stack>
              </Paper>
            </motion.div>
          </Box>

          {/* SECTION 3: DYNAMIC GALLERY */}
          <Box sx={{ mb: 12 }}>
            <Typography variant="h4" align="center" sx={{ mb: 2 }}>Inside the Den</Typography>
            <Typography variant="body1" align="center" sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}>
              Capturing the grit and brotherhood that defines our culture.{" "}
              <Link 
                to="/news" 
                style={{ 
                    color: '#FF5722', 
                    textDecoration: 'none', 
                    fontWeight: 700, 
                    borderBottom: '2px solid rgba(255, 87, 34, 0.3)' 
                }}
              >
                <br />
                See more
              </Link>
            </Typography>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
                    <CircularProgress color="primary" />
                </Box>
            ) : (
                <Grid container spacing={3}>
                {gallery.map((item, i) => {
                    // Logic for alternating grid: Row 1 (7-5), Row 2 (5-7), Row 3 (7-5)
                    const isWide = (Math.floor(i / 2) % 2 === 0) 
                        ? (i % 2 === 0 ? 7 : 5) 
                        : (i % 2 === 0 ? 5 : 7);

                    return (
                        <Grid item xs={12} sm={isWide} key={item.id}>
                            <GalleryItem
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: (i % 3) * 0.1 }}
                            >
                                <img src={item.image_url || `https://placehold.co/800x400?text=Mamba+Archive`} alt={item.caption} />
                                <ImageOverlay className="overlay">
                                <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>{item.caption || "Mamba Mentality"}</Typography>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Box sx={{ width: 30, height: 2, bgcolor: '#FF5722' }} />
                                    <Typography variant="caption" sx={{ textTransform: 'uppercase', letterSpacing: 1.5 }}>Mambas' Archives</Typography>
                                </Stack>
                                </ImageOverlay>
                            </GalleryItem>
                        </Grid>
                    )
                })}
                </Grid>
            )}
          </Box>

          {/* SECTION 4: LEADERSHIP */}
          <Box sx={{ mb: 10 }}>
            <Typography variant="h4" align="center" sx={{ mb: 8 }}>Elite Leadership</Typography>
            <Grid container spacing={4} justifyContent="center">
              {teamLeadership.map((member, i) => (
                <Grid item xs={12} sm={6} md={3} key={i}>
                  <Paper elevation={0} sx={{ p: 4, textAlign: 'center', borderRadius: 4, bgcolor: 'white', height: '100%', border: '1px solid #f0f0f0' }}>
                    <Avatar 
                      src={member.img} 
                      sx={{ width: 120, height: 120, mx: 'auto', mb: 3, border: "4px solid #FF5722", boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }} 
                    />
                    <Typography variant="h6" sx={{ lineHeight: 1.2, mb: 1 }}>{member.name}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{member.role}</Typography>
                    <Chip label={member.tag} color="secondary" variant="outlined" size="small" />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* FINAL BANNER */}
          <motion.div whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 400 }}>
            <Stack 
              direction={isMobile ? "column" : "row"} 
              spacing={4} 
              alignItems="center" 
              sx={{ p: 5, bgcolor: "#1A237E", color: "white", borderRadius: 4, boxShadow: '0 20px 40px rgba(13, 71, 161, 0.2)' }}
            >
              <VerifiedIcon sx={{ fontSize: 80, color: "#FF5722" }} />
              <Box>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 800 }}>Professional Standards</Typography>
                <Typography variant="body1" sx={{ opacity: 0.9, color: "white" }}>
                  Our system is built on professional rigor. From our tactical split-action offenses 
                  to our community outreach, we set the standard for regional basketball.
                </Typography>
              </Box>
            </Stack>
          </motion.div>
        </Container>
      </Box>

      <Footer />
    </ThemeProvider>
  );
};

export default About;