import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSignUp } from "@clerk/clerk-react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  CircularProgress
} from '@mui/material';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { signUp, setActive } = useSignUp();
  const [loading,setLoading]=useState(false)

const [error,setError]=useState("")

  const handleSignup = async (e) => {
    e.preventDefault();
        setError("");
setLoading(true)
    try {
    const result = await signUp.create({
        emailAddress: email,
        password,
        
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });

        navigate("/dashboard");
    }} catch (err) {
      setError(err.errors[0]?.message || "Signup failed");
    }
    finally {
      setLoading(false); 
    }
  };
  

  return (
    <Container maxWidth="xs"  sx={{
    mx: "auto",                   
    px: { xs: 2, sm: 3, md: 4 },  
  }}>
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
           {error && <Typography color="error">{error}</Typography>}
          <Button
            type="submit"
            variant="contained"
            fullWidth 
            sx={{ mt: 2, backgroundColor: '#1976d2' }} disabled={loading}
          >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
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
