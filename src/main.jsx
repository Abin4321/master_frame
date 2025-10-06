import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from "./context/AuthContext.jsx";

const theme = createTheme({
  palette: {
    mode: 'dark', // dark theme
    primary: {
      main: '#6a0dad', // purple accent
    },
    secondary: {
      main: '#000000', // black
    },
    background: {
      default: '#0d0d0d', // deep black
      paper: '#1a1a1a',   // slightly lighter black
    },
    text: {
      primary: '#ffffff',
      secondary: '#cccccc',
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
)
