import { useState } from "react";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { createUser } from "../validations/user";
import { useRegisterMutation } from "./authApiSlice";

const Register = () => {
  const [createNewUser] = useRegisterMutation();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createUser),
  });

  const onSubmit = async (data) => {
    try {
      await createNewUser({
        username: data.username,
        email: data.email,
        password: data.password,
      }).unwrap();

      setSuccess(true);
      setError(false);
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
      <Box className="mb-10">
        <img src="/images/bernardev.png" alt="" className="m-2" />
      </Box>

      <Paper elevation={3}>
        <Box
          component="section"
          className="w-120 min-h-100 px-6 pt-2 pb-12  bg-white"
        >
          <Box
            display="flex"
            justifyContent="center"
            className="text-2xl font-bold mb-4 mt-4"
          ></Box>

          {!success ? (
            <>
              <h1 className="text-xl font-medium text-center">
                Create an account
              </h1>
              <p className="text-md text-center mb-8 mt-4 text-sm">
                Enter your details below to create your account
              </p>
              {Object.keys(errors).length > 0 && (
                <Alert severity="error" className="my-4">
                  {Object.values(errors).map((error, index) => (
                    <div key={index}>{error.message}</div>
                  ))}
                </Alert>
              )}
              {error && (
                <Alert severity="error" className="my-4">
                  {error}
                </Alert>
              )}

              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    label="Username"
                    {...register("username")}
                    error={errors.username}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    {...register("email")}
                    error={errors.email}
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    {...register("password")}
                    error={errors.password}
                  />
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    {...register("confirmPassword")}
                    error={errors.confirmPassword}
                  />
                  <Button type="submit" variant="contained">
                    Create Account
                  </Button>

                  <p>
                    Already have an account?
                    <Link to="/login" className="text-blue-500 ml-2">
                      Login
                    </Link>
                  </p>
                </Stack>
              </form>
            </>
          ) : (
            <>
              <h1 className="text-xl  mb-6 mt-10">
                Your account has been created successfully. Please login to
                continue.
                <Link to="/" className="text-blue-500 inline-block">
                  Login
                </Link>
              </h1>
            </>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
