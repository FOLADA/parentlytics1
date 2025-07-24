'use client';
import * as React from 'react';
import { 
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
  useTheme,
  Paper,
  Fade,
  Grow,
  CircularProgress
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff,
  Google,
  FamilyRestroom,
  ArrowForward,
  FavoriteBorder,
  Lock,
  ArrowRight,
  Close
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';
import {FaGoogle} from 'react-icons/fa';
import Link from 'next/link';
import { supabase } from '../supabaseClient';
import { useRouter } from 'next/navigation';


// Custom color definitions with family-friendly palette
const brandColors = {
  primary: '#5D9CEC', // Softer blue
  primaryLight: '#E3F2FD',
  primaryDark: '#3F72AF',
  secondary: '#FF9E80', // Warm accent color
  white: '#FFFFFF',
  black: '#1A237E',
  gray100: '#F5F7FA',
  gray200: '#E8EAF6',
  gray300: '#C5CAE9',
  gray500: '#9E9E9E',
  gray700: '#616161',
  gray900: '#263238',
  success: '#4CAF50',
  error: '#EF5350',
  warning: '#FFC107',
};

// Illustration assets (would be imported in a real project)
const familyIllustration = '/family-illustration.svg'; // Replace with actual path

const providers = [
  { id: 'google', name: 'Google', icon: <Google />, color: '#DB4437' },
];

const theme = createTheme({
  palette: {
    primary: {
      main: brandColors.primary,
      light: brandColors.primaryLight,
      dark: brandColors.primaryDark,
      contrastText: brandColors.white,
    },
    secondary: {
      main: brandColors.secondary,
      contrastText: brandColors.white,
    },
    text: {
      primary: brandColors.black,
      secondary: brandColors.gray700,
    },
    background: {
      default: brandColors.gray100,
      paper: brandColors.white,
    },
    divider: brandColors.gray200,
  },
  typography: {
    fontFamily: [
      '"Open Sans"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
    h4: {
      fontWeight: 600,
      letterSpacing: -0.5,
    },
    body1: {
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    }
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          boxShadow: 'none',
          padding: '12px 24px',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(93, 156, 236, 0.3)',
          },
        },
        outlined: {
          borderWidth: 2,
          padding: '10px 24px',
          '&:hover': {
            borderWidth: 2,
          },
        },
        text: {
          '&:hover': {
            backgroundColor: 'transparent',
            color: brandColors.primary,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: brandColors.gray300,
            },
            '&:hover fieldset': {
              borderColor: brandColors.primaryLight,
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: brandColors.white,
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: brandColors.primaryLight,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: brandColors.primary,
            borderWidth: 2,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.1)',
        },
      },
    },
  },
});

export default function SignInPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [showError, setShowError] = React.useState(true);
  const theme = useTheme();
  const router = useRouter();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setShowError(true);
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setEmail('');
      setPassword('');
      router.replace('/ai');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          bgcolor: 'background.default',
        }}
      >
        {/* Illustration Section */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            flex: 1,
            bgcolor: 'primary.light',
            alignItems: 'center',
            justifyContent: 'center',
            p: 8,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Fade in={true} timeout={1000}>
            <Box sx={{ zIndex: 1, textAlign: 'center' }}>
              <FamilyRestroom sx={{ 
                fontSize: 120, 
                color: 'primary.main',
                mb: 3 
              }} />
              <Typography 
                variant="h3" 
                component="h2" 
                gutterBottom 
                sx={{ 
                  color: 'primary.dark',
                  fontWeight: 700,
                  mb: 2
                }}
              >
                გამარტივებული მშობლობა
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'primary.dark',
                  maxWidth: 500,
                  mx: 'auto',
                  fontSize: '1.1rem'
                }}
              >
                შემოუერთდით ათასობით მშობლებს, რომლებიც მარტივად ართმევენ თავს ბავშვის აზრდის ქაოსს.
              </Typography>
            </Box>
          </Fade>
          
          {/* Decorative elements */}
          <Box
            sx={{
              position: 'absolute',
              top: -100,
              right: -100,
              width: 400,
              height: 400,
              borderRadius: '50%',
              bgcolor: 'rgba(255, 255, 255, 0.2)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -50,
              left: -50,
              width: 300,
              height: 300,
              borderRadius: '50%',
              bgcolor: 'rgba(255, 255, 255, 0.15)',
            }}
          />
        </Box>

        {/* Form Section */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
          }}
        >
          <Fade in={true} timeout={900}>
            <Paper
              component="form"
              onSubmit={handleSubmit}
              sx={{
                width: '100%',
                maxWidth: 700,
                bgcolor: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(18px)',
                p: { xs: 4, sm: 7 },
                borderRadius: 7,
                boxShadow: '0 12px 40px rgba(31, 38, 135, 0.20)',
                border: '2px solid rgba(93,156,236,0.13)',
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                position: 'relative',
                overflow: 'hidden',
                animation: 'slideUpFadeIn 0.7s cubic-bezier(.4,2,.6,1)'
              }}
              aria-labelledby="signin-heading"
              elevation={0}
            >
              <Typography
                id="signin-heading"
                variant="h4"
                component="h1"
                sx={{
                  textAlign: 'center',
                  mb: 3,
                  color: 'text.primary',
                  fontWeight: 'bold',
                  letterSpacing: -1.5,
                  fontSize: { xs: '2.2rem', sm: '2.7rem' },
                }}
              >
                შესვლა
              </Typography>

              {/* Social Sign-in */}
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FaGoogle size={20} style={{ color: '#DB4437' }} />}
                sx={{
                  py: 2.2,
                  mb: 1.5,
                  borderColor: '#DB4437',
                  color: '#DB4437',
                  background: brandColors.primaryLight,
                  fontWeight: 700,
                  fontSize: '1.15rem',
                  borderRadius: 4,
                  boxShadow: '0 3px 12px rgba(219,68,55,0.09)',
                  '&:hover': {
                    borderColor: '#DB4437',
                    background: "fff",
                  },
                }}
                aria-label="Continue with Google"
              >
                Google-ით შესვლა
              </Button>

              <Divider sx={{ my: 2, fontWeight: 500, color: 'text.secondary' }}>ან იმეილით</Divider>

              {/* Error Alert */}
              {error && showError && (
                <Fade in={!!error} timeout={400}>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: 'error.light',
                    color: 'error.dark',
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    mb: 1,
                    boxShadow: 1,
                    fontSize: '0.97rem',
                    position: 'relative',
                  }}>
                    <span style={{ flex: 1 }}>{error}</span>
                    <IconButton size="small" onClick={() => setShowError(false)} sx={{ ml: 1 }}>
                      <Close fontSize="small" />
                    </IconButton>
                  </Box>
                </Fade>
              )}

              {/* Email & Password */}
              <TextField
                fullWidth
                label="იმეილი"
                type="email"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <span style={{ color: brandColors.primary }}>@</span>
                    </InputAdornment>
                  ),
                }}
                placeholder="თქვენი იმეილი"
                sx={{
                  mb: 2.5,
                  borderRadius: 4,
                  background: 'rgba(255,255,255,0.93)',
                  boxShadow: '0 2px 8px rgba(93,156,236,0.06)',
                  fontSize: '1.13rem',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 4,
                    fontSize: '1.13rem',
                    minHeight: 56,
                  },
                }}
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
              />
              <TextField
                fullWidth
                label="პაროლი"
                type={showPassword ? 'text' : 'password'}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: brandColors.primary }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePassword}
                        edge="end"
                        sx={{ color: brandColors.primary }}
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                placeholder="••••••••"
                sx={{
                  mb: 2.5,
                  borderRadius: 4,
                  background: 'rgba(255,255,255,0.93)',
                  boxShadow: '0 2px 8px rgba(93,156,236,0.06)',
                  fontSize: '1.13rem',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 4,
                    fontSize: '1.13rem',
                    minHeight: 56,
                  },
                }}
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />

              {/* Submit Button */}
              <Button
                fullWidth
                type="submit"
                variant="contained"
                endIcon={loading ? <CircularProgress size={22} color="inherit" /> : <ArrowRight />}
                sx={{
                  py: 2.3,
                  mb: 1.5,
                  fontWeight: 800,
                  fontSize: '1.18rem',
                  borderRadius: 4,
                  background: `linear-gradient(90deg, ${brandColors.primary} 0%, ${brandColors.primaryDark} 100%)`,
                  boxShadow: '0 6px 24px rgba(93,156,236,0.13)',
                  letterSpacing: 0.7,
                  transition: 'background 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    background: `linear-gradient(90deg, ${brandColors.primaryDark} 0%, ${brandColors.primary} 100%)`,
                    boxShadow: '0 10px 32px rgba(93,156,236,0.16)',
                  },
                }}
                disabled={loading}
              >
                {loading ? 'იტვირთება...' : 'შესვლა'}
              </Button>

              {/* Signup Link */}
              <Typography
                variant="body2"
                sx={{
                  textAlign: 'center',
                  color: 'text.secondary',
                  mt: 1,
                }}
              >
                ახალი ხართ?{' '}
                <Link href="/signup">
                  <Button
                    variant="text"
                    size="small"
                    sx={{ color: 'primary.main', fontWeight: 600 }}
                  >
                    შექმენით ანგარიში
                  </Button>
                </Link>
              </Typography>
            </Paper>
          </Fade>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

// Add keyframes for slideUpFadeIn