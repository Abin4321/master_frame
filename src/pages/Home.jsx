import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Fab,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { motion } from 'framer-motion';
import ReactStarsRating from 'react-awesome-stars-rating';
import { useTheme, useMediaQuery } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';


const Home = () => {
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [popularCourses, setPopularCourses] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // ✅ Fetch popular courses from Supabase
  useEffect(() => {
    const fetchPopularCourses = async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .limit(5);

      if (error) {
        console.error('Error fetching popular courses:', error);
      } else {
        setPopularCourses(data);
      }
    };

    fetchPopularCourses();
  }, []);

const features = [
    { title: 'Expert Tutors', desc: 'Learn from industry professionals.' },
    { title: 'Flexible Learning', desc: 'Study at your own learning pace.' },
    { title: 'Mobile Friendly', desc: 'Access contents on any devices.' },
    { title: 'Community Support', desc: 'Join a vibrant learning community.' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: '1 0 auto' }}>
        <Container sx={{ mt: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{
                textAlign: 'center',
                py: 6,
                backgroundColor: '#e3f2fd',
                borderRadius: 2,
                mb: 4,
              }}
            >
              <Typography variant="h3" gutterBottom>
                Welcome to Master Frame
              </Typography>
              <Typography variant="h6" gutterBottom>
                Learn Anytime, Anywhere — Enhance Your Skills with Online Courses
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => navigate('/courses')}
                sx={{ mt: 2 }}
              >
                Explore Courses
              </Button>
            </Box>
          </motion.div>

          <Box sx={{ mb: 8 }}>
            <Typography variant="h4" gutterBottom textAlign="center">
              Why Choose Master Frame?
            </Typography>
            <Grid container spacing={1} sx={{ mt: 2 }}>
              {features.map((item, index) => (
                <Grid item xs={12} md={3} key={item.title}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <Card
                      sx={{
                        p: 2,
                        height: '100%',
                        textAlign: 'center',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.05) translateY(-5px)',
                          boxShadow: 6,
                          zIndex: 1,
                        },
                      }}
                    >
                      <CardContent>
                        <Typography variant="h6">{item.title}</Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          {item.desc}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Divider sx={{ my: 5 }} />

          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom textAlign="center">
              Popular Courses
            </Typography>
            {popularCourses.length > 0 ? (
  <Box
  sx={{
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 3,
  }}
>
  {popularCourses.map((course, index) => (
    <motion.div
      key={course.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      style={{ width: 320, flexShrink: 0 }} // fixed width + prevent shrinking
    >
      <Card sx={{ maxWidth: 320 }}>
        <CardMedia
          component="img"
          height="160"
          image={course.thumbnail || 'https://via.placeholder.com/300x160'}
          alt={course.title}
        />
        <CardContent>
          <Typography variant="h6">{course.title}</Typography>
          <Typography variant="body2">
            {course.description || 'No description provided.'}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <ReactStarsRating
              value={course.rating}
              isEdit={false}
              primaryColor="#ffb400"
              secondaryColor="#e0e0e0"
            />
          </Box>
          <Button
            variant="text"
            size="small"
            onClick={() => navigate('/courses')}
            sx={{ mt: 1 }}
          >
            Learn More
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  ))}
</Box>

) : (
  <Typography variant="body1" textAlign="center" sx={{ mt: 2 }}>
    No popular courses available at the moment.
  </Typography>
)}
          </Box>

<Divider sx={{ my: 5 }} />

<Box sx={{ mt: 5, textAlign: 'center' }}>
  <Typography variant="h5" gutterBottom>
    Connect With Us
  </Typography>

  <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
    {/* Facebook */}
    <Grid item>
      <Button
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        startIcon={!isMobile && <FacebookIcon sx={{ color: '#3b5998' }} />}
        sx={{
          minWidth: isMobile ? 'auto' : 120,
          p: isMobile ? 1 : 2,
          border: isMobile ? 'none' : '1px solid #ccc',
          borderRadius: 2,
          backgroundColor: isMobile ? 'transparent' : '#fff',
        }}
      >
        {isMobile ? <FacebookIcon sx={{ color: '#3b5998' }} fontSize="large" /> : 'Facebook'}
      </Button>
    </Grid>

    {/* Instagram */}
    <Grid item>
      <Button
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        startIcon={!isMobile && <InstagramIcon sx={{ color: '#E1306C' }} />}
        sx={{
          minWidth: isMobile ? 'auto' : 120,
          p: isMobile ? 1 : 2,
          border: isMobile ? 'none' : '1px solid #ccc',
          borderRadius: 2,
          backgroundColor: isMobile ? 'transparent' : '#fff',
        }}
      >
        {isMobile ? <InstagramIcon sx={{ color: '#E1306C' }} fontSize="large" /> : 'Instagram'}
      </Button>
    </Grid>

    {/* YouTube */}
    <Grid item>
      <Button
        href="https://youtube.com"
        target="_blank"
        rel="noopener noreferrer"
        startIcon={!isMobile && <YouTubeIcon sx={{ color: '#FF0000' }} />}
        sx={{
          minWidth: isMobile ? 'auto' : 120,
          p: isMobile ? 1 : 2,
          border: isMobile ? 'none' : '1px solid #ccc',
          borderRadius: 2,
          backgroundColor: isMobile ? 'transparent' : '#fff',
        }}
      >
        {isMobile ? <YouTubeIcon sx={{ color: '#FF0000' }} fontSize="large" /> : 'YouTube'}
      </Button>
    </Grid>
  </Grid>
</Box>

<Divider sx={{ my: 2 }} />


          {showScrollTop && (
            <Box sx={{
      position: 'fixed',
      bottom: 150,
      right: 15,
      zIndex: 1000,
    }}>
              <Fab color="primary" onClick={scrollToTop}>
                <ArrowUpwardIcon />
              </Fab>
            </Box>
          )}
        </Container>
      </Box>

      <Box
        component="footer"
        sx={{
          backgroundColor: '#1976d2',
          color: 'white',
          py: 4,
          px: 2,
          textAlign: 'center',
          flexShrink: 0,
        }}
      >
        <Typography variant="body1">
          © {new Date().getFullYear()} Master Frame. All rights reserved.
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Contact Us : support@masterframe.com
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;