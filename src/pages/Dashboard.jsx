import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
} from '@mui/material';

const Dashboard = () => {
  const [userName, setUserName] = useState('');
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    setLoading(true);
    setError(null);

    // Get current user from Supabase Auth v2+
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setError('User not logged in.');
      setLoading(false);
      return;
    }

    setUserName(user.user_metadata?.name || user.email || 'User');

    // Fetch enrollments joined with courses
    const { data, error: fetchError } = await supabase
      .from('enrollments')
      .select(`
        progress,
        courses (
          id,
          title,
          video_url
        )
      `)
      .eq('user_id', user.id);

    if (fetchError) {
      setError('Failed to load enrollments.');
      setEnrolledCourses([]);
    } else if (data) {
      // Filter out any enrollments with null courses (just in case)
      const filtered = data.filter((e) => e.courses !== null);
      const courses = filtered.map((e) => ({
        id: e.courses.id,
        title: e.courses.title,
        videoUrl: e.courses.video_url,
        progress: e.progress,
      }));
      setEnrolledCourses(courses);
    }

    setLoading(false);
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
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>
        Welcome back, {userName}!
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Here are your courses in progress:
      </Typography>

      {enrolledCourses.length === 0 ? (
        <Typography variant="body1" sx={{ m: 2 }}>
          You are not enrolled in any courses yet.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {enrolledCourses.map((course) => (
            <Grid item key={course.id} xs={12} sm={6} md={4}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Progress: {course.progress}%
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: '#e0e0e0',
                      borderRadius: 1,
                      overflow: 'hidden',
                      height: 10,
                      width: '100%',
                      mb: 1,
                    }}
                  >
                    <Box
                      sx={{
                        height: '100%',
                        width: `${course.progress}%`,
                        backgroundColor: '#1976d2',
                      }}
                    />
                  </Box>
                </CardContent>
                <CardActions>
                  <Button size="small" href={course.videoUrl}>
                    Continue Watching
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Dashboard;
