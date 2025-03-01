import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import useLocalStorage from "../../hooks/useLocalStorage";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useLocalStorage("username", "");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [auth] = useLocalStorage("auth", "");

  useEffect(() => {
    if (auth) navigate("/");
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login({ username, password }).unwrap();
      dispatch(setCredentials({ ...data, username }));

      setPassword("");
      navigate("/");
    } catch (err) {
      setErrMsg(err.data.detail);
    }
  };

  const content = isLoading ? (
    "Loading..."
  ) : (
    <main className="w-full min-h-screen flex flex-col justify-center items-center font-roboto">
      <img src="/images/iskript.png" alt="" className="mb-8" />
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
        <h1 className="text-2xl mb-4 font-bold">Sign In</h1>
        <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            ref={userRef}
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md bg-white"
            autoComplete="off"
            required
          />

          <label htmlFor="password" className="mt-3">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md bg-white"
            required
          />

          <button className="bg-blue-500 text-white p-2 rounded-md my-2 cursor-pointer">
            Sign In
          </button>

          <p className="mt-6">
            <span className="mr-2">Don&apos;t have an account?</span>
            <Link to="/register" className="text-blue-500">
              Sign Up
            </Link>
          </p>
        </form>
      </section>
    </main>
  );

  return content;
};

export default Login;
