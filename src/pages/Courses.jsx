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

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);

    // Get current logged in user
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

    // Fetch all courses
    const { data, error: fetchError } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) {
      setError('Failed to load courses.');
      setCourses([]);
    } else {
      setCourses(data);
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
        Available Courses
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Explore the courses available on Master Frame, {userName}!
      </Typography>

      {courses.length === 0 ? (
        <Typography variant="body1" sx={{ m: 2 }}>
          No courses available at the moment.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {courses.map((course) => (
            <Grid item key={course.id} xs={12} sm={6} md={4}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {course.description || 'No description available.'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" href={course.video_url}>
                    Start Learning
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

export default Courses;
