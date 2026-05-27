import { useState, useEffect, SyntheticEvent } from 'react';
import axiosInstance from '../api/axiosInstance';
import NavBar from '../components/Nav/NavBar';
import Footer from '../components/Footer';
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Grid,
    CircularProgress,
    ThemeProvider,
    createTheme,
    ImageList,
    ImageListItem,
    useMediaQuery,
    Container,
    Tabs,
    Tab,
    Stack,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from "@mui/system";

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

// Styled Component for the Gallery Item (Matching About Page Logic)
const StyledImageListItem = styled(ImageListItem)(({ theme }) => ({
    borderRadius: "16px",
    overflow: "hidden",
    cursor: "pointer",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    "& img": {
        width: "100%",
        height: "100%",
        display: "block",
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
    // Using the same blue gradient from the About Page
    background: "linear-gradient(to top, rgba(26, 35, 126, 0.9) 0%, rgba(26, 35, 126, 0.2) 60%, transparent 100%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: "20px",
    opacity: 0,
    transition: "opacity 0.4s ease",
    color: "white",
});

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
};

type Article = {
    id: number;
    title: string;
    content: string;
    published_date: string;
    image_url: string | null;
};

type GalleryItem = {
    id: number;
    caption: string;
    image_url: string | null;
};

const News = () => {
    const [news, setNews] = useState<Article[]>([]);
    const [gallery, setGallery] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [tabValue, setTabValue] = useState(0);

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTab = useMediaQuery(theme.breakpoints.down('md'));
    const cols = isMobile ? 1 : isTab ? 2 : 3;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (tabValue === 0) {
                    const response = await axiosInstance.get('news/');
                    setNews(response.data);
                } else {
                    const response = await axiosInstance.get('gallery/');
                    setGallery(response.data);
                }
            } catch (err) {
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [tabValue]);

    const handleTabChange = (_event: SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f8f9fa' }}>
            <ThemeProvider theme={theme}>
                <Box sx={{ position: 'sticky', top: 0, zIndex: 1200, bgcolor: 'white' }}>
                    <NavBar />
                    <Box sx={{ borderBottom: '1px solid #e0e0e0', pt: 2, pb: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                        <Typography variant="h4" sx={{ textAlign: "center", mb: 2, fontSize: { xs: '1.2rem', md: '1.8rem' } }}>
                            Media Center
                        </Typography>
                        <Container maxWidth="sm">
                            <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth" centered sx={{ minHeight: '40px', '& .MuiTabs-indicator': { display: 'none' }, '& .MuiTabs-flexContainer': { gap: 1 } }}>
                                <Tab label="Latest News" sx={tabStyle} />
                                <Tab label="Gallery" sx={tabStyle} />
                            </Tabs>
                        </Container>
                    </Box>
                </Box>

                <Container maxWidth="lg" sx={{ py: 4, flexGrow: 1 }}>
                    <AnimatePresence mode="wait">
                        {tabValue === 0 ? (
                            <motion.div key="news" variants={itemVariants} initial="hidden" animate="visible" exit="exit">
                                {loading ? (
                                    <Box sx={{ textAlign: 'center', mt: 10 }}><CircularProgress /></Box>
                                ) : (
                                    <Grid container spacing={3} justifyContent="center">
                                        {news.map((article) => (
                                            <Grid item xs={12} key={article.id}>
                                                <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, borderRadius: 3, overflow: 'hidden', transition: '0.3s', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 30px rgba(0,0,0,0.1)' } }}>
                                                    <CardMedia
                                                        component="img"
                                                        sx={{ width: { xs: '100%', sm: 280 }, height: { xs: 200, sm: 180 }, objectFit: 'cover', bgcolor: '#eee' }}
                                                        image={article.image_url || `https://placehold.co/240x200/2196F3/FFFFFF?text=NEWS`}
                                                    />
                                                    <CardContent sx={{ flex: 1, p: 3 }}>
                                                        <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>{article.title}</Typography>
                                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineClamp: 3, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                                            {article.content}
                                                        </Typography>
                                                        <Box sx={{ pt: 2, borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between' }}>
                                                            <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.main' }}>
                                                                {new Date(article.published_date).toLocaleDateString()}
                                                            </Typography>
                                                            <Typography variant="caption" sx={{ fontWeight: 600 }}>Read More →</Typography>
                                                        </Box>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div key="gallery" variants={itemVariants} initial="hidden" animate="visible" exit="exit">
                                {loading ? (
                                    <Box sx={{ textAlign: 'center', mt: 10 }}><CircularProgress /></Box>
                                ) : (
                                    <ImageList variant="masonry" cols={cols} gap={16}>
                                        {gallery.map((item) => (
                                            <StyledImageListItem key={item.id}>
                                                <img
                                                    src={item.image_url || `https://placehold.co/600x400/EEE/999?text=Gallery+Photo`}
                                                    alt={item.caption}
                                                    loading="lazy"
                                                />
                                                <ImageOverlay className="overlay">
                                                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>
                                                        {item.caption || "Mamba Archive"}
                                                    </Typography>
                                                    <Stack direction="row" spacing={1} alignItems="center">
                                                        <Box sx={{ width: 30, height: 2, bgcolor: '#FF5722' }} />
                                                        <Typography variant="caption" sx={{ textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600 }}>
                                                            Mamba Archives
                                                        </Typography>
                                                    </Stack>
                                                </ImageOverlay>
                                            </StyledImageListItem>
                                        ))}
                                    </ImageList>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Container>
            </ThemeProvider>
            <Footer />
        </Box>
    );
};

const tabStyle = {
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
};

export default News;