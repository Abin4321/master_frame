// src/pages/Register.jsx
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    const { error } = await register(form.email, form.password, form.name);
    if (error) setError(error.message);
    else {
      setError(null);
      navigate('/dashboard');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2 }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ width: '100%', maxWidth: 450 }}>
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3, bgcolor: 'background.paper' }}>
          <Typography variant="h4" textAlign="center" gutterBottom>Create Account</Typography>
          <Typography variant="subtitle1" textAlign="center" color="text.secondary" mb={2}>
            Join <strong>Loop & Co.</strong>
          </Typography>
          <Box component="form" onSubmit={handleRegister}>
            <TextField label="Full Name" name="name" fullWidth margin="normal" required value={form.name} onChange={handleChange} />
            <TextField label="Email" name="email" type="email" fullWidth margin="normal" required value={form.email} onChange={handleChange} />
            <TextField
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              required
              value={form.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(prev => !prev)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {error && <Typography color="error" mt={1}>{error}</Typography>}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, py: 1.5, fontWeight: 'bold' }}>Register</Button>
            <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
              Already have an account?{' '}
              <span style={{ color: '#1976d2', cursor: 'pointer', fontWeight: 500 }} onClick={() => navigate('/login')}>Login here</span>
            </Typography>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default Register;
