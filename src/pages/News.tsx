import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import NavBar from '../components/Nav/NavBar';
import Footer from '../components/Footer';
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardMedia, // Import CardMedia for images
    Grid,
    CircularProgress,
    ThemeProvider,
    createTheme,
} from '@mui/material';
import { motion } from 'framer-motion';

// Define a custom theme with orange and blue palette
const theme = createTheme({
    palette: {
        primary: {
            main: '#FF5722', // Orange
        },
        secondary: {
            main: '#2196F3', // Blue
        },
        background: {
            default: '#f1f2f6',
        },
        text: {
            primary: '#2c3e50',
            secondary: '#7f8c8d',
        },
    },
    typography: {
        fontFamily: 'Poppins, sans-serif',
        h4: {
            fontFamily: 'Raleway, sans-serif',
            fontWeight: 800,
            color: '#FF5722',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
        },
        h6: {
            fontFamily: 'Raleway, sans-serif',
            fontWeight: 700,
            color: '#2196F3',
            letterSpacing: '0.02em',
        },
        subtitle1: {
            fontWeight: 600,
            color: '#FF5722',
            fontSize: '1.8rem',
        },
        body2: {
            color: '#555555',
            fontSize: '0.95rem',
        },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
                    background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
                    border: '1px solid #e0e0e0',
                    height: '100%',
                    // Adjustments for horizontal layout:
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' }, // Stack on small, row on medium+
                    maxWidth: 'none', // Remove fixed max-width to let it expand
                    width: '100%', // Ensure it takes full width of its grid item
                    // Remove `alignItems: 'center'` from previous roster card styles
                    // Remove `justifyContent: 'space-between'` if not needed for content alignment
                    padding: 0, // CardMedia and CardContent will manage their own padding
                },
            },
        },
    },
});

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 10,
        },
    },
    hover: {
        y: -8,
        scale: 1.02,
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.25)',
        transition: {
            duration: 0.3,
        },
    },
};

const CLOUDINARY_CLOUD_NAME = "doairargz"; // Re-using your Cloudinary name

type Article = {
    id: number;
    title: string;
    content: string;
    published_date: string;
    image?: string; // Add optional image property for Cloudinary path
};

const News = () => {
    const [news, setNews] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                // 2. USE axiosInstance and REMOVE 'http://localhost:8000/api/'
                // The instance already has the base URL, so we just need 'news/'
                const response = await axiosInstance.get('news/');
                setNews(response.data);
            } catch (err) {
                setError('Failed to fetch news. Please try again later.');
                console.error('Error fetching news:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
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
                        // minHeight: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center', // Keep center for the main content block
                        gap: 6,
                        flexGrow: 1, // Allow the box to grow and fill available space
                    }}
                >
                    <Typography
                        variant="h4"
                        component="h1"
                        gutterBottom
                        sx={{ textAlign: 'center' }}
                    >
                        Stay on the Loop with Us...
                    </Typography>

                    {loading ? (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                minHeight: '300px',
                            }}
                        >
                            <CircularProgress color="primary" />
                            <Typography variant="h6" sx={{ ml: 2, color: 'text.secondary' }}>
                                Loading News...
                            </Typography>
                        </Box>
                    ) : error ? (
                        <Typography variant="h6" color="error" sx={{ textAlign: 'center' }}>
                            {error}
                        </Typography>
                    ) : news.length === 0 ? (
                        <Typography
                            variant="h6"
                            sx={{ textAlign: 'center', color: 'text.secondary' }}
                        >
                            No news articles available.
                        </Typography>
                    ) : (
                        <Grid
                            container
                            spacing={4}
                            justifyContent="center"
                            component={motion.div}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            sx={{ width: '100%' }} // Ensure the grid takes full width
                        >
                            {news.map((article) => {
                                // Construct the full Cloudinary URL
                                const fullCloudinaryUrl = article.image
                                    ? `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/${article.image}`
                                    : null; // Set to null if no image path

                                return (
                                    <Grid
                                        item
                                        key={article.id}
                                        xs={12} // Full width on small screens
                                        md={10} // Wider on medium screens
                                        lg={8}  // Even wider on large screens for horizontal cards
                                        sx={{ display: 'flex' }}
                                    >
                                        <motion.div
                                            variants={itemVariants}
                                            whileHover="hover"
                                            style={{ width: '100%', display: 'flex' }}
                                        >
                                            <Card sx={{ width: '100%' }}>
                                                {/* Card Media for Image */}
                                                <CardMedia
                                                    component="img"
                                                    sx={{
                                                        width: { xs: '100%', sm: 180 }, // Full width on small, fixed width on larger
                                                        height: { xs: 200, sm: 'auto' }, // Fixed height on small, auto on larger
                                                        flexShrink: 0, // Prevent image from shrinking
                                                        objectFit: 'cover', // Cover the area without distorting
                                                    }}
                                                    image={fullCloudinaryUrl || `https://placehold.co/180x200/2196F3/FFFFFF?text=NEWS`}
                                                    alt={article.title}
                                                    onError={(e) => {
                                                        // Fallback to a placeholder if image fails to load
                                                        e.currentTarget.src = `https://placehold.co/180x200/2196F3/FFFFFF?text=NEWS`;
                                                    }}
                                                />
                                                <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}> {/* Content takes remaining space */}
                                                    <Typography variant="h6" component="h3" gutterBottom>
                                                        {article.title}
                                                    </Typography>
                                                    <Typography variant="body2" paragraph>
                                                        {article.content}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="textSecondary"
                                                        sx={{ mt: 'auto', pt: 1, borderTop: '1px solid #eee' }} // Push to bottom, add a top border
                                                    >
                                                        Published on:{' '}
                                                        {new Date(
                                                            article.published_date
                                                        ).toLocaleDateString('en-US', {
                                                            weekday: 'short',
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric',
                                                        })}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    )}
                </Box>
            </ThemeProvider>
            <Footer />
        </div>
    );
};

export default News;