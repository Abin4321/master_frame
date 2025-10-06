// src/pages/AdminPanel.jsx
import React from 'react';
import { Typography, Box } from '@mui/material';

const AdminPanel = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={3}>Admin Panel</Typography>
      <Typography>Here you can manage courses, users, and videos.</Typography>
    </Box>
  );
};

export default AdminPanel;
