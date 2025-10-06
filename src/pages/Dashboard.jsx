// src/pages/Dashboard.jsx
import React, { useEffect, useState, useContext } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  CircularProgress,
  Avatar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchEnrollments();
  }, [user]);

  const fetchEnrollments = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          progress,
          courses (
            id,
            title,
            video_url,
            thumbnail
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;

      const filtered = data.filter((e) => e.courses !== null);
      const courses = filtered.map((e) => ({
  id: e.courses.id,
  title: e.courses.title,
  videoUrl: e.courses.video_url, // <-- keep as is if this is already a signed/full URL
  thumbnail: e.courses.thumbnail,
  progress: e.progress,
}));


      setEnrolledCourses(courses);
    } catch (err) {
      setError('Failed to load enrollments.');
      setEnrolledCourses([]);
      console.error(err);
    }

    setLoading(false);
  };

  const averageProgress = enrolledCourses.length
    ? Math.floor(enrolledCourses.reduce((acc, c) => acc + c.progress, 0) / enrolledCourses.length)
    : 0;

  const getCompletedCount = () => enrolledCourses.filter((c) => c.progress === 100).length;

  if (loading)
    return (
      <Container sx={{ py: 6, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );

  if (error)
    return (
      <Container sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );

  return (
    <Container sx={{ py: 6 }}>
      {/* Greeting */}
      <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} alignItems={isMobile ? 'flex-start' : 'center'} gap={2} mb={4}>
        <Avatar sx={{ width: 56, height: 56 }}>{user?.user_metadata?.name?.[0] || user?.email?.[0]}</Avatar>
        <Box>
          <Typography variant="h5" fontWeight={600}>
            Welcome back, {user?.user_metadata?.name || user?.email}!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Continue learning and explore your progress.
          </Typography>
        </Box>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} mb={5} justifyContent={isMobile ? 'center' : 'flex-start'}>
        <Grid item xs={12} sm={4} md={4}>
          <Card sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="subtitle2">Total Enrolled</Typography>
            <Typography variant="h6">{enrolledCourses.length}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Card sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="subtitle2">Avg Progress</Typography>
            <Typography variant="h6">{averageProgress}%</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Card sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="subtitle2">Completed</Typography>
            <Typography variant="h6">{getCompletedCount()}</Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Course Cards */}
      <Typography variant="h6" gutterBottom>
        Your Learning Progress
      </Typography>
      {enrolledCourses.length === 0 ? (
        <Typography variant="body1">You are not enrolled in any courses yet!</Typography>
      ) : (
        <Grid container spacing={4}>
          {enrolledCourses.map((course) => (
            <Grid item key={course.id} xs={12} sm={6} md={4}>
              <Box display="flex" justifyContent="center">
                <Card sx={{ width: 360, display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="160"
                    image={course.thumbnail || 'https://via.placeholder.com/300x160'}
                    alt={course.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">{course.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Progress: {course.progress}%
                    </Typography>
                    <Box
                      sx={{
                        backgroundColor: '#e0e0e0',
                        borderRadius: 1,
                        overflow: 'hidden',
                        height: 10,
                        mt: 1,
                      }}
                    >
                      <Box sx={{ height: '100%', width: `${course.progress}%`, backgroundColor: '#1976d2' }} />
                    </Box>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        navigate('/video-player', { state: { videoUrl: course.videoUrl, courseId: course.id } })
                      }
                      startIcon={<PlayCircleOutlineIcon />}
                    >
                      {course.progress === 0 ? 'Start Now' : 'Continue Watching'}
                    </Button>
                  </CardActions>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Dashboard;
