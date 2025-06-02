// src/pages/Login.jsx
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient'; // ✅ Import Supabase

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null); // ✅ Track errors

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password
    });

    if (error) {
      setError(error.message); // ✅ Display Supabase error
    } else {
      setError(null);
      navigate('/dashboard');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #2193b0,rgb(255, 255, 255))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ width: '100%', maxWidth: 450 }}
      >
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" textAlign="center" gutterBottom>
            Welcome Back!
          </Typography>
          <Typography variant="subtitle1" textAlign="center" color="text.secondary" mb={2}>
            Login to <strong>Master Frame</strong>
          </Typography>
          <Box component="form" onSubmit={handleLogin}>
            <TextField
              label="Email"
              name="email"
              fullWidth
              margin="normal"
              required
              value={form.email}
              onChange={handleChange}
            />
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
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {error && (
              <Typography color="error" mt={1}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, py: 1.5, fontWeight: 'bold' }}
            >
              Login
            </Button>
            <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
              Don’t have an account?{' '}
              <span
                style={{ color: '#1976d2', cursor: 'pointer', fontWeight: 500 }}
                onClick={() => navigate('/register')}
              >
                Register here
              </span>
            </Typography>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default Login;
