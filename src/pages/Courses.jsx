import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Card,
  CardMedia,
  CardContent,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import ReactStarsRating from 'react-awesome-stars-rating';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [enrolledCourse, setEnrolledCourse] = useState(null);
  const [justEnrolledCourseId, setJustEnrolledCourseId] = useState(null);

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchCoursesAndEnrollments();
  }, []);

  const fetchCoursesAndEnrollments = async () => {
    setLoading(true);
    setError(null);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setError('User not logged in.');
      setLoading(false);
      return;
    }

    setUser(user);

    const { data: coursesData, error: courseError } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });

    const { data: enrollmentData, error: enrollError } = await supabase
      .from('enrollments')
      .select('course_id')
      .eq('user_id', user.id);

    if (courseError || enrollError) {
      setError('Failed to load data.');
    } else {
      setCourses(coursesData || []);
      setEnrollments(enrollmentData?.map((e) => e.course_id) || []);
    }

    setLoading(false);
  };

  const handleEnroll = async (course) => {
    if (enrollments.includes(course.id)) return;

    const { error } = await supabase.from('enrollments').insert([
      {
        user_id: user.id,
        course_id: course.id,
      },
    ]);

    if (!error) {
      setEnrollments((prev) => [...prev, course.id]);
      setEnrolledCourse(course);
      setJustEnrolledCourseId(course.id); // set enrolled during this session
      setSnackbarOpen(true);
      setTimeout(() => navigate('/dashboard'), 2000);
    } else {
      console.error('Enrollment failed:', error.message);
    }
  };

  if (loading) {
    return (
      <Container sx={{ py: 6, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>
        Available Courses
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Explore the courses available on Master Frame.
      </Typography>

      {courses.length === 0 ? (
        <Typography variant="body1" sx={{ m: 2 }}>
          No courses available at the moment.
        </Typography>
      ) : (
        <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {courses.map((course) => {
            const isEnrolled = enrollments.includes(course.id);
            const showWatchButton =
              isEnrolled && course.id !== justEnrolledCourseId;

            return (
              <Card
                key={course.id}
                sx={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  alignItems: isMobile ? 'flex-start' : 'center',
                  justifyContent: 'space-between',
                  width: '80%',
                  p: 2,
                  gap: 3,
                  borderRadius: 3,
                  boxShadow: 3,
                  mx: 'auto',
                }}
              >
                <CardMedia
                  component="img"
                  image={course.thumbnail || 'https://via.placeholder.com/180'}
                  alt={course.title}
                  sx={{
                    width: isMobile ? '100%' : 200,
                    height: 140,
                    borderRadius: 2,
                    objectFit: 'cover',
                  }}
                />

                <Box sx={{ flex: 1 }}>
                  <CardContent sx={{ p: 0 }}>
                    <Typography variant="h6">{course.title}</Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      {course.description || 'No description available.'}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <strong>Instructor:</strong> {course.instructor || 'N/A'}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <ReactStarsRating
                        value={course.rating || 0}
                        isEdit={false}
                        primaryColor="#ffb400"
                        secondaryColor="#ccc"
                      />
                    </Box>
                  </CardContent>
                </Box>

                <Box
                  sx={{
                    mt: isMobile ? 2 : 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                  }}
                >
                  <Button
                    variant={isEnrolled ? 'outlined' : 'contained'}
                    color={isEnrolled ? 'success' : 'primary'}
                    disabled={isEnrolled}
                    onClick={() => handleEnroll(course)}
                  >
                    {isEnrolled ? 'Enrolled' : 'Enroll Now'}
                  </Button>

                  {showWatchButton && (
  <Button
    variant="contained"
    color="secondary"
    onClick={() => navigate('/dashboard')}
  >
    My Learnings
  </Button>
)}
                </Box>
              </Card>
            );
          })}
        </Box>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          You have joined "{enrolledCourse?.title}" successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Courses;
