import { ThemeProvider } from '@emotion/react'
import { createTheme, CssBaseline } from '@mui/material'
import React from 'react'
import NavBar from '../components/Nav/NavBar'
import Footer from '../components/Footer';

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

const Community = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <div>
          <h2 style={{ textAlign: 'center', margin: '40px 0' }}>Join Our Vibrant Community</h2>
      </div>
      <Footer />
    </ThemeProvider>

  )
}

export default Community