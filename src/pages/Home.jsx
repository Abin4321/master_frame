// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
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

const Home = () => {
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ flex: '1 0 auto' }}>
        <Container sx={{ mt: 4 }}>
          {/* Hero Section */}
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

          {/* Features Section */}
          <Box sx={{ mb: 8 }}>
            <Typography variant="h4" gutterBottom textAlign="center">
              Why Choose Master Frame?
            </Typography>
            <Grid container spacing={4} sx={{ mt: 2 }}>
              {[
                { title: 'Expert Tutors', desc: 'Learn from industry professionals.' },
                { title: 'Flexible Learning', desc: 'Study at your own pace.' },
                { title: 'Mobile Friendly', desc: 'Access content on any device.' },
              ].map((item) => (
                <Grid item xs={12} md={4} key={item.title}>
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
                </Grid>
              ))}
            </Grid>
          </Box>

          <Divider sx={{ my: 5 }} />

          {/* Popular Courses Section */}
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom textAlign="center">
              Popular Courses
            </Typography>
            <Grid container spacing={4}>
              {[
                {
                  title: 'React for Beginners',
                  desc: 'Build interactive UIs with React.',
                  image: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*cPh7ujRIfcHAy4kW2ADGOw.png',
                },
                {
                  title: 'JavaScript Essentials',
                  desc: 'Master JavaScript fundamentals.',
                  image: 'https://www.patterns.dev/img/reactjs/react-logo@3x.svg',
                },
                {
                  title: 'Web Design Basics',
                  desc: 'Design clean and responsive websites.',
                  image: 'https://www.techjockey.com/blog/wp-content/uploads/2021/09/Free-Online-Web-Design-Courses.jpg',
                },
              ].map((course, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="160"
                      image={course.image}
                      alt={course.title}
                    />
                    <CardContent>
                      <Typography variant="h6">{course.title}</Typography>
                      <Typography variant="body2">{course.desc}</Typography>
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
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Scroll-to-top Button (before footer) */}
          {showScrollTop && (
            <Box sx={{ textAlign: 'right', mb: 4 }}>
              <Fab color="primary" onClick={scrollToTop}>
                <ArrowUpwardIcon />
              </Fab>
            </Box>
          )}
        </Container>
      </Box>

      {/* Footer Section */}
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
          Contact us: support@masterframe.com
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
