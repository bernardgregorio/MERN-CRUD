/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";

import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import useLocalStorage from "../../hooks/useLocalStorage";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [auth] = useLocalStorage("auth", "");
  const [username, setUsername] = useLocalStorage("username", "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (auth) navigate("/");
  }, []);

  useEffect(() => {
    setError(false);
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login({ username, password }).unwrap();
      dispatch(setCredentials({ ...data, username }));
      setPassword("");
      navigate("/");
    } catch (error) {
      let msg = error?.data?.message[0].msg
        ? error?.data?.message[0].msg
        : error?.data?.message
        ? error?.data?.message
        : "Unable to update. Please try again.";
      setError(msg);
    }
  };

  return (
    <Box
      component="main"
      className="w-full min-h-screen flex flex-col items-center justify-center font-roboto bg-[#fafbfc]"
    >
      <Paper elevation={3}>
        <Box
          component="section"
          className="w-100 min-h-96 px-6 pt-2 pb-12  bg-white"
        >
          <Box display="flex" justifyContent="center">
            <img src="/images/iskript.png" alt="" className="m-2" />
          </Box>

          <h1 className="text-2xl font-medium text-center mb-6">Login</h1>
          {error && (
            <Alert severity="error" className="my-4">
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="off"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                {...(isLoading && { disabled: true })}
              >
                Login
              </Button>

              <p>
                <span className="mr-2">Don&apos;t have an account?</span>
                <Link to="/register" className="text-blue-500">
                  Create an account.
                </Link>
              </p>
            </Stack>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
