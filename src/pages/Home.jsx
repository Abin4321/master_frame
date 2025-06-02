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
import { supabase } from '../lib/supabaseClient'; // ✅ Ensure this import is correct

const Home = () => {
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [popularCourses, setPopularCourses] = useState([]);

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
        .limit(3); // Optional: limit to 3 popular courses

      if (error) {
        console.error('Error fetching popular courses:', error);
      } else {
        setPopularCourses(data);
      }
    };

    fetchPopularCourses();
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: '1 0 auto' }}>
        <Container sx={{ mt: 4 }}>
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

          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom textAlign="center">
              Popular Courses
            </Typography>
            {popularCourses.length > 0 ? (
              <Grid container spacing={4}>
                {popularCourses.map((course, index) => (
                  <Grid item xs={12} md={4} key={course.id || index}>
                    <Card>
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
            ) : (
              <Typography variant="body1" textAlign="center" sx={{ mt: 2 }}>
                No popular courses available at the moment.
              </Typography>
            )}
          </Box>

          {showScrollTop && (
            <Box sx={{ textAlign: 'right', mb: 4 }}>
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
          Contact us: support@masterframe.com
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
