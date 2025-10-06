import { useEffect, useState, useContext } from 'react';
import { Box, Typography, Container, Card, CardMedia, CardContent, Button, Divider, Fab, Grid, useTheme, useMediaQuery, Snackbar, Alert } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { motion } from 'framer-motion';
import ReactStarsRating from 'react-awesome-stars-rating';
import { useAuth } from '../context/AuthContext.jsx';

const Home = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [popularCourses, setPopularCourses] = useState([]);
  const [toastOpen, setToastOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const purple = theme.palette.primary.main;

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  useEffect(() => {
    const fetchPopularCourses = async () => {
      const { data, error } = await supabase.from('courses').select('*').limit(5);
      if (!error) setPopularCourses(data ?? []);
      else console.error('Error fetching popular courses:', error);
    };
    fetchPopularCourses();
  }, []);

  const handleNavigate = (link) => {
    if (!user) {
      setToastOpen(true);
      setTimeout(() => navigate('/login'), 1000);
    } else navigate(link);
  };

  const features = [
    { title: 'Expert Tutors', desc: 'Learn from industry professionals.' },
    { title: 'Flexible Learning', desc: 'Study at your own pace anytime.' },
    { title: 'Mobile Friendly', desc: 'Access contents on any device.' },
    { title: 'Community Support', desc: 'Join vibrant learning community.' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <Box sx={{ flex: '1 0 auto' }}>
        <Container sx={{ mt: 4 }}>
          {/* HERO */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Box sx={{
              textAlign: 'center',
              py: { xs: 5, md: 8 },
              px: { xs: 2, md: 4 },
              color: 'text.primary',
              background: `linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.8) 55%, ${purple}1F 100%)`,
              borderRadius: 3,
              mb: 4,
              border: `1px solid ${purple}40`,
              boxShadow: `0 0 24px ${purple}22`,
            }}>
              <Typography variant="h3" fontWeight={700} gutterBottom>Welcome to Loop &amp; Co.</Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>Learn anytime, anywhere — level up your skills with curated online courses.</Typography>
              <Button variant="contained" color="primary" size="large" onClick={() => handleNavigate('/courses')} sx={{ mt: 2, fontWeight: 700 }}>
                Explore Courses
              </Button>
            </Box>
          </motion.div>

          {/* FEATURES SECTION */}
<Box sx={{ mb: 8, textAlign: 'center' }}>
  <Typography
    variant="h4"
    gutterBottom
    sx={{ fontWeight: 600, mb: 4 }}
  >
    Why Choose Loop & Co.?
  </Typography>

  <Grid
    container
    spacing={3}
    justifyContent="center"
    alignItems="stretch"
  >
    {features.map((item, index) => (
      <Grid
        item
        xs={12}
        sm={6}
        md={3}
        key={item.title}
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.12 }}
          style={{ width: '100%' }}
        >
          <Card
            sx={{
              p: 2,
              height: '100%',
              textAlign: 'center',
              bgcolor: 'background.paper',
              borderRadius: 3,
              border: `1px solid ${purple}33`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              transition:
                'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s',
              '&:hover': {
                transform: 'translateY(-6px)',
                borderColor: `${purple}88`,
                boxShadow: `0 10px 24px ${purple}26`,
              },
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ mb: 1 }}
              >
                {item.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                {item.desc}
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      </Grid>
    ))}
  </Grid>
</Box>


          <Divider sx={{ my: 5, borderColor: `${purple}44` }} />

          {/* POPULAR COURSES */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h4" gutterBottom textAlign="center">Popular Courses</Typography>
            {popularCourses.length > 0 ? (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3 }}>
                {popularCourses.map((course, index) => (
                  <motion.div key={course.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.12 }} style={{ width: 320, flexShrink: 0 }}>
                    <Card sx={{ maxWidth: 320, bgcolor: 'background.paper', borderRadius: 3, overflow: 'hidden', border: `1px solid ${purple}33`, '&:hover': { borderColor: `${purple}88`, boxShadow: `0 10px 24px ${purple}26` } }}>
                      <CardMedia component="img" height="160" image={course.thumbnail || 'https://via.placeholder.com/300x160'} alt={course.title} />
                      <CardContent>
                        <Typography variant="h6" fontWeight={600}>{course.title}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{course.description || 'No description provided.'}</Typography>
                        <Box sx={{ mt: 1 }}>
                          <ReactStarsRating value={course.rating || 0} isEdit={false} primaryColor="#ffb400" secondaryColor="#555" />
                        </Box>
                        <Button variant="text" size="small" onClick={() => handleNavigate(`/courses`)} sx={{ mt: 1, color: purple }}>Learn More</Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </Box>
            ) : <Typography variant="body1" textAlign="center" sx={{ mt: 2 }} color="text.secondary">No popular courses available at the moment.</Typography>}
          </Box>

          <Divider sx={{ my: 5, borderColor: `${purple}44` }} />

          {/* SOCIAL */}
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>Connect With Us</Typography>
            <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
              {[
                { icon: <FacebookIcon />, label: 'Facebook', url: 'https://facebook.com' },
                { icon: <InstagramIcon />, label: 'Instagram', url: 'https://instagram.com' },
                { icon: <YouTubeIcon />, label: 'YouTube', url: 'https://youtube.com' },
              ].map((item, index) => (
                <Grid item key={index}>
                  <Button href={item.url} target="_blank" rel="noopener noreferrer" startIcon={!isMobile && item.icon} variant={isMobile ? 'text' : 'outlined'}
                    sx={{ minWidth: isMobile ? 'auto' : 140, p: isMobile ? 1 : 1.5, borderRadius: 2, color: 'text.primary', borderColor: `${purple}55`, '&:hover': { borderColor: purple, backgroundColor: `${purple}14` } }}>
                    {isMobile ? item.icon : item.label}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>

          {showScrollTop && (
            <Box sx={{ position: 'fixed', bottom: 150, right: 16, zIndex: 1000 }}>
              <Fab color="primary" onClick={scrollToTop}><ArrowUpwardIcon /></Fab>
            </Box>
          )}
        </Container>
      </Box>

      <Box component="footer" sx={{ bgcolor: 'background.default', color: 'text.secondary', py: 4, px: 2, mt: 5, textAlign: 'center', flexShrink: 0, borderTop: `1px solid ${purple}55` }}>
        <Typography variant="body1" color="text.primary">© {new Date().getFullYear()} Loop &amp; Co. All rights reserved.</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>Contact: support@loopandco.com</Typography>
      </Box>

      <Snackbar open={toastOpen} autoHideDuration={2000} onClose={() => setToastOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="info" sx={{ width: '100%' }} onClose={() => setToastOpen(false)}>Please Log in First!</Alert>
      </Snackbar>
    </Box>
  );
};

export default Home;
