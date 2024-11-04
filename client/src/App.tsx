import { Routes, Route } from "react-router-dom";
import "./App.css";
import AdminRegistration from "./Regestration/Admin/AdminRegistration";
import AdminLogin from "./Login/Admin/AdminLogin";
import Dashboard from "./Dashboard/Dashboard";
import Home from "./Home/Home";
import Uniquepage from "./element/Uniquepage/Uniquepage";

function App() {
  //routes and sub routes
  return (
    <>
      <Routes>
        {/*NOT PROTECTED ROUTE*/}
        <Route path="/admin">
          <Route path="register" element={<AdminRegistration />} />
          <Route element={<AdminLogin />} path="login" />
          {/*dashboard need to be protected*/}
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<Home />} path="/" />
        <Route element={<Uniquepage />} path="/unique/:id" />

        {/*PROTECTED ROUTE*/}
      </Routes>
    </>
  );
}

export default App;
