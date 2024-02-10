import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Box,
} from "@mui/material";
import { LoginContext } from "./App";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const { setLogin } = useContext(LoginContext);

  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    const savedPassword = localStorage.getItem("userPassword");
    if (savedEmail && savedPassword) {
      signIn(savedEmail, savedPassword);
    }
  }, []);

  const signIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", password);
        setLoggedIn(true);
        setLogin(true);
        navigate("/task");
      })
      .catch((error) => {
        console.log(error);
        alert("Login failed. Please try again.");
      });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    signIn(email, password);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Clean up local storage on sign out
        clearLocalStorage();
        setLoggedIn(false);
      })
      .catch((error) => {
        console.log(error);
        alert("Sign out failed. Please try again.");
      });
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPassword");
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
            <Typography variant="h5" gutterBottom>
              Log In
            </Typography>
          </Box>
          <form onSubmit={handleSignIn}>
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
            {loggedIn ? (
              <Button
                onClick={handleSignOut}
                variant="contained"
                color="primary"
                fullWidth
              >
                Sign Out
              </Button>
            ) : (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Sign In
              </Button>
            )}

            <Box sx={{ textAlign: "center", marginTop: "1rem" }}>
              <Typography variant="body2">
                {loggedIn ? (
                  <Link to="/task">Go to Task Page</Link>
                ) : (
                  <Link to="/signup">Sign Up</Link>
                )}
              </Typography>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
