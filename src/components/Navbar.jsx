import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [session, setSession] = useState(null);
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);

      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });
    };

    checkSession();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    navigate('/login');
  };

  const navItems = [
    { label: 'Home', path: '/' },
    ...(session ? [
      { label: 'Courses', path: '/courses' },
      { label: 'Dashboard', path: '/dashboard' },
    ] : []),
    ...(session
      ? [{ label: 'Logout', action: handleLogout }]
      : [{ label: 'Login', path: '/login' }]),
  ];

  const drawer = (
    <Box onClick={toggleDrawer} sx={{ width: 250 }}>
      <List>
        {navItems.map((item) =>
          item.path ? (
            <ListItem button key={item.label} component={Link} to={item.path}>
              <ListItemText primary={item.label} />
            </ListItem>
          ) : (
            <ListItem button key={item.label} onClick={item.action}>
              <ListItemText primary={item.label} />
            </ListItem>
          )
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Master Frame
          </Typography>

          {isMobile ? (
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleDrawer}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          ) : (
            navItems.map((item) =>
              item.path ? (
                <Button
                  key={item.label}
                  color="inherit"
                  component={Link}
                  to={item.path}
                  sx={{ ml: 2 }}
                >
                  {item.label}
                </Button>
              ) : (
                <Button
                  key={item.label}
                  color="inherit"
                  onClick={item.action}
                  sx={{ ml: 2 }}
                >
                  {item.label}
                </Button>
              )
            )
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
