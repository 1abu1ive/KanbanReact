import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Box,
} from "@mui/material";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <Container maxWidth="md">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <Grid item xs={12} sm={8} md={6}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>
              Sign Up
            </Typography>
          </Box>
          <form onSubmit={signUp}>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <Typography
                variant="body2"
                color="error"
                align="center"
                gutterBottom
              >
                {error}
              </Typography>
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Sign Up
            </Button>
            <Box sx={{ textAlign: "center", marginTop: "1rem" }}>
              <Typography variant="body1">
                Already have an account? <Link to="/">Sign In</Link>
              </Typography>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignUp;
