import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const sampleCourses = [
  {
    id: 1,
    title: 'React for Beginners',
    description: 'Learn React fundamentals and build dynamic web apps.',
    thumbnail:
      'https://img.youtube.com/vi/dGcsHMXbSOA/maxresdefault.jpg',
    videoUrl: 'https://youtu.be/SqcY0GlETPk?si=PvK6O6Up617sUKEW',
  },
  {
    id: 2,
    title: 'Advanced Python',
    description: 'Master Python programming with advanced concepts.',
    thumbnail:
      'https://img.youtube.com/vi/H1elmMBnykA/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/live/Yrtm7d3TJbs?si=JNn7xPI72VPdtBVe',
  },
  {
    id: 3,
    title: 'UI/UX Design Basics',
    description: 'Introduction to design principles and user experience.',
    thumbnail:
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://youtu.be/ODpB9-MCa5s?si=DfP4vaNQ5IvzZcDC',
  },
];

const Courses = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ py: 6 }}>
      <Typography
        variant="h4"
        gutterBottom
        textAlign="center"
        sx={{ fontWeight: 'bold' }}
      >
        Master Frame Courses
      </Typography>

      <Grid container spacing={4}>
        {sampleCourses.map((course) => (
          <Grid item key={course.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="180"
                image={course.thumbnail}
                alt={course.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2">
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() =>
                    navigate('/video', {
                      state: {
                        video: {
                          title: course.title,
                          description: course.description,
                          url: course.videoUrl,  // pass url here
                        },
                      },
                    })
                  }
                >
                  Watch
                </Button>
                <Button size="small" color="primary" href="#">
                  Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Courses;
