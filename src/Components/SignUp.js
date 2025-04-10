import React, { useState } from 'react';
import { supabase } from '../SupaBase/Supabase';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper
} from '@mui/material';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) alert(error.message);
      else {
        alert('Signup successful! Check your email.');
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Signup Error:', err);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 6 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: 'center' }}>
          Sign Up
        </Typography>

        <Box component="form" onSubmit={handleSignup} noValidate autoComplete="off">
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, backgroundColor: '#1976d2' }}
          >
            Sign Up
          </Button>
        </Box>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?{' '}
          <Link to="/Login" style={{ color: '#1976d2', textDecoration: 'none' }}>
            Login
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default Signup;
