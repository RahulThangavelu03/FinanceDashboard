import React, { useState ,useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from "@clerk/clerk-react";


import { useSignIn } from "@clerk/clerk-react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from '@mui/material';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
   const { signIn, setActive } = useSignIn();

   const [error,setError]= useState("")
     const { isSignedIn } = useAuth();



     useEffect(()=>{

      if (isSignedIn) {
      navigate("/dashboard");

     }},[isSignedIn,navigate])


  const handleLogin = async (e) => {
    e.preventDefault();

    setError("")

    try {
  

       const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        
        navigate("/dashboard");
      } else {
        console.log(result, "needs more steps");
      }

    } catch (err) {
    

      setError(err.errors[0]?.message || "Login failed");
    }
  };

  return (
    <Container maxWidth="xs"  sx={{
    mx: "auto",                   
    px: { xs: 2, sm: 3, md: 4 },  
  }} >
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h5" component="h1"  gutterBottom sx={{ textAlign: 'center' }}>
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
               {error && <Typography color="error">{error}</Typography>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don't have an account? <Link to="/">Signup</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
