import * as yup from "yup";

const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,15}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const usernameSchema = yup
  .string()
  .required("Please enter your username.")
  .min(3, "Username must be at least 3 characters.")
  .max(15, "Username must be at most 15 characters.")
  .matches(
    USERNAME_REGEX,
    "Invalid username. Must start with a letter and be 3-15 characters long. " +
      "Can contain letters, numbers, hyphens, and underscores."
  );

const passwordSchema = yup
  .string()
  .nullable()
  .transform((value) => (value.trim() === "" ? null : value))
  .min(8, "Password must be at least 8 characters.")
  .max(24, "Password must be at most 24 characters.")
  .matches(
    PASSWORD_REGEX,
    "Password must be between 8 and 24 characters. Must contain at " +
      "least one uppercase letter, one lowercase letter, one digit, and " +
      "one special character: ! @ # $ %."
  );

const requiredPasswordSchema = passwordSchema.required(
  "Please enter your password."
);

const confirmPasswordSchema = yup
  .string()
  .transform((value) => (value?.trim() === "" ? null : value))
  .when("password", {
    is: (password) => password && password.length > 0,
    then: (schema) =>
      schema
        .required("Passwords must match")
        .oneOf([yup.ref("password")], "Passwords must match"),
    otherwise: (schema) => schema.notRequired().nullable(),
  });

const emailSchema = yup
  .string()
  .required("Please enter your email.")
  .email("Please enter a valid email.");

const expirationDateSchema = yup
  .date()
  .required("Please select an expiration date.")
  .min(new Date(), "Expiration date must be in the future.");

const statusSchema = yup.string().required("Please select a status.");

export const updateUser = yup.object({
  username: usernameSchema,
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema,
  email: emailSchema,
  expirationDate: expirationDateSchema,
  status: statusSchema,
});

export const createUser = yup.object({
  username: usernameSchema,
  password: requiredPasswordSchema,
  confirmPassword: confirmPasswordSchema,
  email: emailSchema,
});
