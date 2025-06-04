import React, { useRef, useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  Slider,
  Typography,
  Button,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  VolumeUp,
  VolumeOff,
  Fullscreen,
  ArrowBack,
  Speed,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const VideoPlayer = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const location = useLocation();
  const videoUrl = location.state?.videoUrl || '';
  const courseId = location.state?.courseId || null;

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (videoRef.current && userId && courseId) {
        const current = videoRef.current.currentTime;
        const total = videoRef.current.duration;
        if (total > 0) {
          const currentProgress = Math.floor((current / total) * 100);
          await supabase
            .from('enrollments')
            .update({ progress: currentProgress })
            .eq('user_id', userId)
            .eq('course_id', courseId);
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [userId, courseId]);

  const togglePlay = () => {
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  const toggleMute = () => {
    setMuted(!muted);
    videoRef.current.muted = !muted;
  };

  const handleVolumeChange = (e, newValue) => {
    setVolume(newValue);
    videoRef.current.volume = newValue;
    setMuted(newValue === 0);
  };

  const handleProgressChange = (e, newValue) => {
    const duration = videoRef.current.duration;
    const time = (newValue / 100) * duration;
    videoRef.current.currentTime = time;
    setProgress(newValue);
  };

  const updateProgress = () => {
    const duration = videoRef.current.duration;
    const current = videoRef.current.currentTime;
    setProgress((current / duration) * 100);
  };

  const handleRateClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRateClose = (rate) => {
    if (rate) {
      setPlaybackRate(rate);
      videoRef.current.playbackRate = rate;
    }
    setAnchorEl(null);
  };

  const handleFullscreen = () => {
    const elem = videoRef.current;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  };

  const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

  return (
    <Box p={2}>
      {/* Back Button */}
      <Button
        startIcon={<ArrowBack />}
        variant="outlined"
        onClick={() => navigate('/dashboard')}
        sx={{ mb: 2 }}
      >
        Back to Dashboard
      </Button>

      {/* Video Container */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: '900px',
          mx: 'auto',
        }}
      >
        <video
          ref={videoRef}
          src={videoUrl}
          style={{
            width: '100%',
            maxHeight: isMobile ? '250px' : '500px',
            borderRadius: '8px',
          }}
          autoPlay
          onTimeUpdate={updateProgress}
          onEnded={() => setPlaying(false)}
          controls={false}
        />

        {/* Custom Controls */}
<Box
  sx={{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    gap: 1,
    mt: 2,
    px: 1,
    overflowX: isMobile ? 'auto' : 'unset',
  }}
>
  {/* Left Controls */}
  <Box display="flex" alignItems="center" gap={1}>
    <IconButton onClick={togglePlay}>
      {playing ? <Pause /> : <PlayArrow />}
    </IconButton>

    <IconButton onClick={toggleMute}>
      {muted || volume === 0 ? <VolumeOff /> : <VolumeUp />}
    </IconButton>

    <Slider
      value={volume}
      onChange={handleVolumeChange}
      min={0}
      max={1}
      step={0.01}
      sx={{ width: isMobile ? 100 : 150 }}
    />
  </Box>

  {/* Right Controls */}
  <Box display="flex" alignItems="center" gap={1}>
    <IconButton onClick={handleRateClick}>
      <Speed />
    </IconButton>

    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={() => setAnchorEl(null)}
    >
      {[0.5, 1, 1.5, 2].map((rate) => (
        <MenuItem key={rate} onClick={() => handleRateClose(rate)}>
          {rate}x
        </MenuItem>
      ))}
    </Menu>

    <IconButton onClick={handleFullscreen}>
      <Fullscreen />
    </IconButton>
  </Box>
</Box>



        {/* Seek Slider */}
        <Slider
          value={progress}
          onChange={handleProgressChange}
          sx={{ mt: 2 }}
        />

        <Typography
          variant="caption"
          display="block"
          textAlign="right"
          color="text.secondary"
          mt={-1}
        >
          {videoRef.current
    ? `${formatTime(videoRef.current.currentTime)} / ${formatTime(videoRef.current.duration || 0)}`
    : ''}
        </Typography>
      </Box>
    </Box>
  );
};

export default VideoPlayer;
