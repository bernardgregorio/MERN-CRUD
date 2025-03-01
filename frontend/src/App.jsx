import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import RequireAuth from "./features/auth/RequireAuth";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Dashboard from "./features/Dashboard";
import Missing from "./components/Missing";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Route>
        <Route path="*" element={<Missing />} />
      </Routes>
    </>
  );
}

export default App;
