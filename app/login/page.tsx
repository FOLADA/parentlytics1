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
  Grow
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff,
  Google,
  FamilyRestroom,
  ArrowForward,
  FavoriteBorder,
  Lock,
  ArrowRight
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';
import {FaGoogle} from 'react-icons/fa';


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
  const theme = useTheme();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Form submitted');
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
          <Paper
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: '100%',
              maxWidth: 'md',
              bgcolor: 'background.paper',
              p: 6,
              borderRadius: 4,
              boxShadow: 3,
            }}
            aria-labelledby="signin-heading"
          >
            <Typography
              id="signin-heading"
              variant="h4"
              component="h1"
              sx={{
              textAlign: 'center',
              mb: 4,
              color: 'text.primary',
              fontWeight: 'bold',
              }}
            >
              შესვლა
            </Typography>

            {/* Social Sign-in */}
            <Box sx={{ mb: 4 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FaGoogle />}
                sx={{
                  py: 1.5,
                  borderColor: 'divider',
                  '&:hover': {
                    borderColor: '#DB4437',
                    color: '#DB4437',
                  },
                }}
                aria-label="Continue with Google"
              >
                გააგრძელეთ Google-ით
              </Button>
            </Box>

            <Divider sx={{ my: 4 }}>ან შემოდით იმეილით</Divider>

            {/* Email & Password */}
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="იმეილი"
                type="email"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">@</InputAdornment>
                  ),
                }}
                placeholder="თქვენი იმეილი"
                sx={{ mb: 3 }}
              />
              
              <TextField
                fullWidth
                label="პაროლი"
                type={showPassword ? 'text' : 'password'}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePassword}
                        edge="end"
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                placeholder="••••••••"
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 4,
              }}
            >
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="დამიმახსოვრე"
              />
              <Button
                variant="text"
                size="small"
                sx={{ color: 'primary.main' }}
              >
                დაგავიწყდათ პაროლი?
              </Button>
            </Box>

            {/* Submit Button */}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              endIcon={<ArrowRight />}
              sx={{
                py: 2,
                mb: 3,
                background: `linear-gradient(to right, ${brandColors.primary}, ${brandColors.primaryDark})`,
                '&:hover': {
                  background: `linear-gradient(to right, ${brandColors.primaryDark}, ${brandColors.primary})`,
                },
              }}
            >
              შესვლა
            </Button>

            {/* Signup Link */}
            <Typography
              variant="body2"
              sx={{
                textAlign: 'center',
                color: 'text.secondary',
              }}
            >
              ახალი ხართ?{' '}
              <Button
                variant="text"
                size="small"
                sx={{ color: 'primary.main' }}
              >
                შექმენით ანგარიში
              </Button>
            </Typography>
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  );
}