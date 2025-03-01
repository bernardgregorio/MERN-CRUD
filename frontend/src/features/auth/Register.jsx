import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import InfoIcon from "@mui/icons-material/Info";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import { useRegisterMutation } from "./authApiSlice";

// Regular expression to validate a username: starts with a letter,
// followed by 3 to 23 characters which can be
// letters, numbers, hyphens, or underscores.
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;

// Regular expression to validate an email address: standard email
// format with alphanumeric characters, dots, underscores,
// percent signs, plus signs, and hyphens.
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Is between 8 and 24 characters long.
// Contains at least one lowercase letter.
// Contains at least one uppercase letter.
// Contains at least one digit.
// Contains at least one special character from the set !@#$%.
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [register] = useRegisterMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPassword(result);
    const match = password === confirmPassword;
    setValidConfirmPassword(match);
  }, [password, confirmPassword]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    setErrMsg("");
  }, [user, password, confirmPassword, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");

    const chkUser = USER_REGEX.test(user);
    const chkEmail = EMAIL_REGEX.test(email);
    const chkPassword = PASSWORD_REGEX.test(password);

    if (!chkUser || !chkEmail || !chkPassword) {
      setErrMsg("Please fill in all fields correctly.");
      return;
    }
    try {
      await register({ username: user, email: email, password: password });

      setSuccess(true);
    } catch (error) {
      if (!error?.response) {
        setErrMsg("An error occurred. Please try again.");
      } else {
        setErrMsg(error.response.data.message);
      }
      errRef.current.focus();
    }
  };

  const moveFocus = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form, e.target);
      const nextElement = form.elements[index + 1];

      if (nextElement) {
        nextElement.focus();
      } else {
        form.elements[0].focus();
      }
    }
  };

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center font-roboto">
      <img src="/images/iskript.png" alt="" className="mb-8" />
      {success ? (
        <section className="w-90 min-h-60 border border-gray-200 p-3 bg-gray-100 rounded-md shadow-lg">
          <h1 className="text-2xl mb-4 font-bold text-center">
            Registration Successful
          </h1>
          <p className="text-center">
            <CheckCircleOutlineIcon
              className="text-green-500 "
              sx={{ fontSize: 60 }}
            />
          </p>
          <p className="mt-2">You have successfully registered.</p>
          <Link to="/" className="text-blue-500 inline-block mt-6">
            Sign In
          </Link>
        </section>
      ) : (
        <section className="w-90 min-h-96 border border-gray-200 p-3 bg-gray-100 rounded-md shadow-lg">
          <p
            ref={errRef}
            className={`bg-red-600 text-white text-sm p-2 my-2 rounded-md ${
              errMsg ? "block" : "hidden"
            }`}
            aria-live="assertive"
          >
            <WarningAmberIcon className="text-white mr-2" fontSize="small" />
            {errMsg}
          </p>
          <h1 className="text-2xl mb-4 font-bold">Create an account</h1>
          <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
            <label htmlFor="user">
              Username
              <span className={`ml-2 ${validName ? "inline-block" : "hidden"}`}>
                <CheckCircleOutlineIcon
                  className="text-green-500"
                  fontSize="small"
                />
              </span>
              <span
                className={`ml-2 ${
                  validName || !user ? "hidden" : "inline-block"
                }`}
              >
                <HighlightOffIcon className="text-red-500" fontSize="small" />
              </span>
            </label>
            <input
              ref={userRef}
              type="text"
              id="username"
              className="border border-gray-300 p-2 rounded-md bg-white"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="usernote"
              required
              autoComplete="off"
              onKeyDown={moveFocus}
            />

            <p
              id="usernote"
              className={`bg-gray-800 text-white text-xs rounded-md p-2 ${
                userFocus && user && !validName ? "block" : "hidden"
              }`}
            >
              <InfoIcon className="mr-2" fontSize="small" />
              Username must be between 4 and 24 characters. Must begin with a
              letter. Can contain letters, numbers, hyphens, and underscores.
            </p>

            <label htmlFor="email">
              Email
              <span
                className={`ml-2 ${validEmail ? "inline-block" : "hidden"}`}
              >
                <CheckCircleOutlineIcon
                  className="text-green-500"
                  fontSize="small"
                />
              </span>
              <span
                className={`ml-2 ${
                  validEmail || !email ? "hidden" : "inline-block"
                }`}
              >
                <HighlightOffIcon className="text-red-500" fontSize="small" />
              </span>
            </label>
            <input
              type="email"
              id="email"
              className="border border-gray-300 p-2 rounded-md bg-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="emailnote"
              required
              autoComplete="off"
              onKeyDown={moveFocus}
            />

            <p
              id="emailnote"
              className={`bg-gray-800 text-white text-xs rounded-md p-2 ${
                emailFocus && email && !validEmail ? "block" : "hidden"
              }`}
            >
              <InfoIcon className="mr-2" fontSize="small" />
              Please enter a valid email address.
            </p>

            <label htmlFor="password">
              Password
              <span
                className={`ml-2 ${validPassword ? "inline-block" : "hidden"}`}
              >
                <CheckCircleOutlineIcon
                  className="text-green-500"
                  fontSize="small"
                />
              </span>
              <span
                className={`ml-2 ${
                  validPassword || !password ? "hidden" : "inline-block"
                }`}
              >
                <HighlightOffIcon className="text-red-500" fontSize="small" />
              </span>
            </label>

            <input
              type="password"
              id="password"
              className="border border-gray-300 p-2 rounded-md bg-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
              aria-invalid={validPassword ? "false" : "true"}
              aria-describedby="passwordnote"
              required
              onKeyDown={moveFocus}
            />

            <p
              id="passwordnote"
              className={`bg-gray-800 text-white text-xs rounded-md p-2 ${
                passwordFocus && password && !validPassword ? "block" : "hidden"
              }`}
            >
              <InfoIcon className="mr-2" fontSize="small" />
              Password must be between 8 and 24 characters. Must contain at
              least one uppercase letter, one lowercase letter, one digit, and
              one special character: <br />! @ # $ %.
            </p>

            <label htmlFor="confirm-password">
              Confirm Password
              <span
                className={`ml-2 ${
                  validConfirmPassword && confirmPassword
                    ? "inline-block"
                    : "hidden"
                }`}
              >
                <CheckCircleOutlineIcon
                  className="text-green-500"
                  fontSize="small"
                />
              </span>
              <span
                className={`ml-2 ${
                  validConfirmPassword || !confirmPassword
                    ? "hidden"
                    : "inline-block"
                }`}
              >
                <HighlightOffIcon className="text-red-500" fontSize="small" />
              </span>
            </label>

            <input
              type="password"
              id="confirm-password"
              className="border border-gray-300 p-2 rounded-md bg-white"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={() => setConfirmPasswordFocus(true)}
              onBlur={() => setConfirmPasswordFocus(false)}
              aria-invalid={validConfirmPassword ? "false" : "true"}
              aria-describedby="confirmnote"
              required
              onKeyDown={moveFocus}
            />

            <p
              id="confirmnote"
              className={`bg-gray-800 text-white text-xs rounded-md p-2 ${
                confirmPasswordFocus && confirmPassword && !validConfirmPassword
                  ? "block"
                  : "hidden"
              }`}
            >
              <InfoIcon className="mr-2" fontSize="small" />
              Please confirm your password.
            </p>

            <button
              className="bg-blue-500 text-white p-2 rounded-md my-2"
              type="submit"
              disabled={
                !validName ||
                !validEmail ||
                !validPassword ||
                !validConfirmPassword
                  ? true
                  : false
              }
            >
              Create account
            </button>

            <p className="my-4">
              Already registered?
              <Link to="/login" className="text-blue-500 ml-2 ">
                Sign In
              </Link>
            </p>
          </form>
        </section>
      )}
    </main>
  );
};

export default Register;
