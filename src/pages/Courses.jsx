import { useEffect, useState, useContext } from 'react';
import { Box, Typography, Container, Card, CardContent, CardMedia, Button, Grid, Snackbar, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext.jsx';
import ReactStarsRating from 'react-awesome-stars-rating';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await supabase.from('courses').select('*');
      if (!error) setCourses(data ?? []);
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchEnrolled = async () => {
        const { data, error } = await supabase
          .from('enrollments')
          .select('course_id')
          .eq('user_id', user.id);
        if (!error) setEnrolledCourses(data.map(c => c.course_id));
      };
      fetchEnrolled();
    }
  }, [user]);

  const handleEnroll = async (courseId) => {
    if (!user) {
      setToastOpen(true);
      setTimeout(() => navigate('/login'), 1000);
      return;
    }

    if (enrolledCourses.includes(courseId)) return;

    const { error } = await supabase.from('enrollments').insert([{ user_id: user.id, course_id: courseId }]);
    if (!error) setEnrolledCourses([...enrolledCourses, courseId]);
  };

  return (
    <Container sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h4" gutterBottom textAlign="center">All Courses</Typography>
      <Grid container spacing={3}>
        {courses.map((course, index) => (
          <Grid item xs={12} md={4} key={course.id}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
              <Card sx={{ borderRadius: 3, overflow: 'hidden', bgcolor: 'background.paper', border: '1px solid #6a0dad33', '&:hover': { borderColor: '#6a0dad88', boxShadow: '0 10px 24px #6a0dad26' } }}>
                <CardMedia component="img" height="160" image={course.thumbnail || 'https://via.placeholder.com/300x160'} alt={course.title} />
                <CardContent>
                  <Typography variant="h6" fontWeight={600}>{course.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{course.description || 'No description provided.'}</Typography>
                  <Box sx={{ mt: 1 }}>
                    <ReactStarsRating value={course.rating || 0} isEdit={false} primaryColor="#ffb400" secondaryColor="#555" />
                  </Box>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ mt: 1 }}
                    onClick={() => handleEnroll(course.id)}
                    disabled={enrolledCourses.includes(course.id)}
                  >
                    {enrolledCourses.includes(course.id) ? 'Enrolled' : 'Enroll Now'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Snackbar open={toastOpen} autoHideDuration={2000} onClose={() => setToastOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="info" sx={{ width: '100%' }} onClose={() => setToastOpen(false)}>Please Log in First!</Alert>
      </Snackbar>
    </Container>
  );
};

export default Courses;
