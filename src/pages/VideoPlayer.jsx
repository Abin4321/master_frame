import React from 'react';
import ReactPlayer from 'react-player';
import { Box, Typography, Container, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

//const defaultVideo = {
  //title: 'Master Frame Learning',
  //url: 'https://www.youtube.com/watch?v=dGcsHMXbSOA',
  //description: 'Learn React fundamentals with this beginner tutorial.',
//};

const VideoPlayer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get video data from route state or fallback to default
  const video = location.state?.video || defaultVideo;

  // Log to confirm video URL received
  console.log('Playing video:', video);

  if (!video.url || !ReactPlayer.canPlay(video.url)) {
    return (
      <Container sx={{ py: 6 }}>
        <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
          ← Back
        </Button>
        <Typography variant="h5" color="error">
          Invalid or unsupported video URL.
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 6 }}>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        ← Back
      </Button>

      <Typography variant="h4" gutterBottom>
        {video.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom color="text.secondary">
        {video.description}
      </Typography>

      <Box sx={{ position: 'relative', paddingTop: '56.25%', mb: 4 }}>
        <ReactPlayer
          url={video.url}
          controls
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      </Box>
    </Container>
  );
};

export default VideoPlayer;
