// src/pages/Courses.jsx
import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Snackbar,
  Alert,
  Stack,
  Divider,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext.jsx';
import ReactStarsRating from 'react-awesome-stars-rating';
import { useNavigate } from 'react-router-dom';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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

    const { error } = await supabase
      .from('enrollments')
      .insert([{ user_id: user.id, course_id: courseId }]);
    if (!error) setEnrolledCourses([...enrolledCourses, courseId]);
  };

  return (
    <Container sx={{ mt: 5, mb: 8 }}>
      <Typography
        variant="h4"
        gutterBottom
        textAlign="center"
        sx={{ fontWeight: 700, mb: 4 }}
      >
        <SchoolIcon sx={{ mr: 1, fontSize: 30, color: '#6a0dad' }} />
        Explore Our Courses
      </Typography>

      <Grid container spacing={5}>
        {courses.map((course, index) => (
          <Grid item xs={12} md={12} key={course.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                sx={{
                  display: { xs: 'block', md: 'flex' },
                  alignItems: 'center',
                  borderRadius: 4,
                  overflow: 'hidden',
                  bgcolor: 'background.paper',
                  border: '1px solid #6a0dad33',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 10px 24px rgba(106, 13, 173, 0.2)',
                  },
                }}
              >
                {/* Thumbnail */}
                <CardMedia
                  component="img"
                  sx={{
                    width: { xs: '100%', md: 300 },
                    height: { xs: 180, md: 240 },
                    objectFit: 'cover',
                  }}
                  image={course.thumbnail || 'https://via.placeholder.com/300x160'}
                  alt={course.title}
                />

                {/* Course Info */}
                <CardContent sx={{ flex: 1 }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <PlayCircleOutlineIcon sx={{ color: '#6a0dad' }} />
                    <Typography variant="h6" fontWeight={600}>
                      {course.title}
                    </Typography>
                  </Stack>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1, mb: 2 }}
                  >
                    {course.description || 'No description provided.'}
                  </Typography>

                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <PersonIcon sx={{ fontSize: 20, color: '#6a0dad' }} />
                    <Typography variant="body2" color="text.secondary">
                      Instructor: {course.instructor || 'Loop Academy'}
                    </Typography>
                  </Stack>

                  <ReactStarsRating
                    value={course.rating || 0}
                    isEdit={false}
                    primaryColor="#ffb400"
                    secondaryColor="#555"
                  />

                  <Divider sx={{ my: 2 }} />

                  <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                    <Chip
                      label={enrolledCourses.includes(course.id) ? 'Enrolled' : 'Available'}
                      color={enrolledCourses.includes(course.id) ? 'success' : 'default'}
                      icon={enrolledCourses.includes(course.id) ? <CheckCircleIcon /> : null}
                      sx={{ fontWeight: 600 }}
                    />
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        bgcolor: enrolledCourses.includes(course.id) ? '#4caf50' : '#6a0dad',
                        '&:hover': {
                          bgcolor: enrolledCourses.includes(course.id)
                            ? '#43a047'
                            : '#8a2be2',
                        },
                      }}
                      onClick={() => handleEnroll(course.id)}
                      disabled={enrolledCourses.includes(course.id)}
                    >
                      {enrolledCourses.includes(course.id)
                        ? 'Enrolled'
                        : 'Enroll Now'}
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Snackbar for login alert */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={2000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity="info"
          sx={{ width: '100%' }}
          onClose={() => setToastOpen(false)}
        >
          Please Log in First!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Courses;
