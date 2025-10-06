// src/components/VideoPlayer.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button, CircularProgress } from '@mui/material';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

const VideoPlayer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { videoUrl, courseId, progress: savedProgress = 0 } = location.state || {};
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true);

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

  const handleTimeUpdate = async () => {
    if (!user || !courseId || !videoRef.current) return;
    const video = videoRef.current;
    if (!video.duration) return;

    const progressPercent = Math.floor((video.currentTime / video.duration) * 100);

    try {
      await supabase
        .from('enrollments')
        .update({ progress: progressPercent })
        .eq('user_id', user.id)
        .eq('course_id', courseId);
    } catch (err) {
      console.error('Failed to update progress', err);
    }
  };

  const handleWaiting = () => setLoading(true);
  const handlePlaying = () => setLoading(false);

  // Set video to last saved progress after metadata is loaded
  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video && savedProgress > 0 && video.duration) {
      video.currentTime = (savedProgress / 100) * video.duration;
    }
  };

  return (
    <Container sx={{ py: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h5" fontWeight={600}>
          Video Player
        </Typography>
      </Box>

      <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
        {loading && (
          <CircularProgress
            sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}
          />
        )}
        <video
          ref={videoRef}
          src={videoUrl}
          controls
          autoPlay
          controlsList="nodownload"
          disablePictureInPicture
          style={{ width: '100%', maxWidth: 800, borderRadius: 8, backgroundColor: '#000' }}
          onTimeUpdate={handleTimeUpdate}
          onWaiting={handleWaiting}
          onPlaying={handlePlaying}
          onLoadedMetadata={handleLoadedMetadata}
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
