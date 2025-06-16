import { Box, Typography, Grid, IconButton, Link } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { motion } from 'framer-motion';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import logo from "../assets/logo.png";


const theme = createTheme({
  palette: {
    primary: {
      main: '#FF5722', // Orange
    },
    secondary: {
      main: '#2196F3', // Blue
    },
    background: {
      default: '#1a202c', 
      paper: '#2d3748', 
    },
    text: {
      primary: '#edf2f7', 
      secondary: '#a0aec0', 
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h6: {
      fontWeight: 700,
      color: '#FF5722', 
      marginBottom: '1rem',
    },
    body2: {
      color: '#cbd5e0', 
      fontSize: '0.95rem',
      lineHeight: 1.6,
    },
    subtitle1: {
        color: '#a0aec0', 
        fontSize: '1rem',
        '&:hover': {
            color: '#FF5722', 
            textDecoration: 'underline',
        },
    },
  },
});

const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};


const Footer = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
      <Box
        component={motion.footer}
        variants={footerVariants}
        initial="hidden"
        animate="visible"
        sx={{
          backgroundColor: 'background.default',
          color: 'text.primary',
          py: { xs: 6, md: 8 }, 
          px: { xs: 2, sm: 8, md: 12 }, 
          borderTop: `4px solid ${theme.palette.primary.main}`,
        }}
      >
        <Grid container spacing={{ xs: 4, md: 10 }} justifyContent="center">
          {/* Logo and Tagline Section */}
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <motion.div variants={sectionVariants}>
              <a href="/">
                <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, alignItems: 'center', mb: 2 }}>
                {/* Placeholder for Logo */}
                <img
                  src={logo}
                  alt="Company Logo"
                  style={{ height: '100px', width: 'auto', borderRadius: '8px', marginRight: '10px' }}
                />
                
              </Box>
              <Typography variant="body2" sx={{ maxWidth: { md: '300px' }, mx: { xs: 'auto', md: '0' } }}>
                Uniting passion and skill on the court. Join our journey to greatness!
              </Typography>
              </a>
              
            </motion.div>
          </Grid>

          {/* Quick Links Section */}
          <Grid item xs={6} md={2}>
            <motion.div variants={sectionVariants}>
              <Typography variant="h6" sx={{ color: 'primary.main' }}>
                Quick Links
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <Link href="/" color="inherit" underline="none" variant="subtitle1">
                    Home
                  </Link>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <Link href="/about" color="inherit" underline="none" variant="subtitle1">
                    About Us
                  </Link>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <Link href="/roster" color="inherit" underline="none" variant="subtitle1">
                    Team Roster
                  </Link>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <Link href="/schedule" color="inherit" underline="none" variant="subtitle1">
                    Schedule
                  </Link>
                </li>
                <li>
                  <Link href="/contact" color="inherit" underline="none" variant="subtitle1">
                    Contact Us
                  </Link>
                </li>
              </Box>
            </motion.div>
          </Grid>

          {/* Social Media Section */}
          <Grid item xs={6} md={2}>
            <motion.div variants={sectionVariants}>
              <Typography variant="h6" sx={{ color: 'primary.main' }}>
                Follow Us
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-start' }, mt: 1 }}> {/* Ensured responsive justifyContent */}
                <IconButton
                  aria-label="Instagram"
                  href="https://www.instagram.com/cliquemambas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: 'text.primary', '&:hover': { color: 'primary.main', transform: 'scale(1.1)' } }}
                >
                  <InstagramIcon />
                </IconButton>
                
                <IconButton
                  aria-label="Email"
                  href="mailto:Cliquemambas1960@gmail.com"
                  sx={{ color: 'text.primary', '&:hover': { color: 'primary.main', transform: 'scale(1.1)' } }}
                >
                  <MailOutlineIcon />
                </IconButton>
              </Box>
            </motion.div>
          </Grid>

          {/* Contact Info Section */}
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <motion.div variants={sectionVariants}>
              <Typography variant="h6" sx={{ color: 'primary.main' }}>
                Contact Info
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <Box component="span" sx={{ fontWeight: 'bold' }}>Email:</Box>{' '}
                <Link href="mailto:Cliquemambas1960@gmail.com" color="inherit" underline="hover">
                  Cliquemambas1960@gmail.com
                </Link>
              </Typography>
              <Typography variant="body2">
                <Box component="span" sx={{ fontWeight: 'bold' }}>Phone:</Box>{' '}
                <Link href="tel:+1234567890" color="inherit" underline="hover">
                  +1 (234) 567-890
                </Link>
              </Typography>
            </motion.div>
          </Grid>
        </Grid>

        {/* Copyright Section */}
        <motion.div variants={sectionVariants}>
            <Box sx={{ mt: { xs: 4, md: 8 }, pt: { xs: 2, md: 4 }, borderTop: '1px solid #4a5568', textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                    © {new Date().getFullYear()} Clique Mambas. All rights reserved.
                </Typography>
            </Box>
        </motion.div>
      </Box>
    </ThemeProvider>
    </div>
  )
}

export default Footer;
