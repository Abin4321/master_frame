// src/components/Navbar.jsx
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import logo from '../assets/logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Fetch current session
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: 'linear-gradient(0deg, #000000 20%, #6a0dad 100%)',
        px: 3,
        zIndex: 1200, // ensure it stays above everything
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo + Name */}
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <img src={logo} alt="Loop & Co." style={{ height: 40, marginRight: 10 }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#fff' }}>
            Loop & Co.
          </Typography>
        </Box>

        {/* Desktop Links */}
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button component={Link} to="/" sx={{ color: '#fff', fontWeight: 'bold', mx: 1 }}>
            Home
          </Button>
          <Button component={Link} to="/courses" sx={{ color: '#fff', fontWeight: 'bold', mx: 1 }}>
            Courses
          </Button>
          <Button component={Link} to="/dashboard" sx={{ color: '#fff', fontWeight: 'bold', mx: 1 }}>
            Dashboard
          </Button>

          {session ? (
            <Button onClick={handleLogout} sx={{ color: '#fff', fontWeight: 'bold', mx: 1 }}>
              Logout <LogoutIcon sx={{ ml: 0.8, fontSize: 18 }} />
            </Button>
          ) : (
            <Button component={Link} to="/login" sx={{ color: '#fff', fontWeight: 'bold', mx: 1 }}>
              Login
            </Button>
          )}
        </Box>

        {/* Mobile View */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
          {/* Always show Login (if not logged in) */}
          {!session ? (
            <Button component={Link} to="/login" sx={{ color: '#fff', fontWeight: 'bold', mr: 1 }}>
              Login
            </Button>
          ) : (
            <Button onClick={handleLogout} sx={{ color: '#fff', fontWeight: 'bold', mr: 1 }}>
              <LogoutIcon sx={{ fontSize: 20 }} />
            </Button>
          )}

          <IconButton size="large" edge="end" color="inherit" onClick={handleMenu}>
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              sx: {
                backgroundColor: '#1a1a1a',
                color: '#fff',
                borderRadius: 2,
                minWidth: 150,
              },
            }}
          >
            <MenuItem component={Link} to="/" onClick={handleClose}>
              Home
            </MenuItem>
            <MenuItem component={Link} to="/courses" onClick={handleClose}>
              Courses
            </MenuItem>
            <MenuItem component={Link} to="/dashboard" onClick={handleClose}>
              Dashboard
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
