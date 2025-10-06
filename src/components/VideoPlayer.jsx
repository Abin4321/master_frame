// src/components/VideoPlayer.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button } from '@mui/material';

const VideoPlayer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { videoUrl } = location.state || {};

  if (!videoUrl) {
    return (
      <Container sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          No video selected!
        </Typography>
        <Button sx={{ mt: 2 }} variant="contained" onClick={() => navigate('/dashboard')}>
          Go Back
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h5" fontWeight={600}>
          Video Player
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <video
          src={videoUrl}
          controls
          style={{ width: '100%', maxWidth: 800, borderRadius: 8, backgroundColor: '#000' }}
        />
      </Box>
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Button variant="contained" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </Box>
    </Container>
  );
};

export default VideoPlayer;
