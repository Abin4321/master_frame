import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';

const userName = "Albin"; // Simulated logged-in user

const enrolledCourses = [
  {
    id: 1,
    title: 'React for Beginners',
    progress: 45, // percent watched
    videoUrl: '#',
  },
  {
    id: 2,
    title: 'UI/UX Design Basics',
    progress: 80,
    videoUrl: '#',
  },
];

const Dashboard = () => {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>
        Welcome back, {userName}!
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Here are your courses in progress:
      </Typography>

      <Grid container spacing={4}>
        {enrolledCourses.length === 0 ? (
          <Typography variant="body1" sx={{ m: 2 }}>
            You are not enrolled in any courses yet.
          </Typography>
        ) : (
          enrolledCourses.map((course) => (
            <Grid item key={course.id} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
          ))
        )}
      </Grid>
    </Container>
  );
};

export default Dashboard;
