import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import "./output.css";
import Header from "./components/header";
import Signup from "./components/signup";
import { useContext, useEffect } from "react";
import { GlobalData } from "./context/globalData";
import CreateAssignment from "./components/createAssignments";
import Profile from "./components/profile";
import Table from "./components/table";
import AllAssignments from "./components/allAssignments";

function App() {
  const { loggedIn } = useContext(GlobalData);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loggedIn) navigate("/login");
    else navigate("/");
  }, [loggedIn]);
  return (
    <>
      <Header />
      <Routes>
        <Route
          exact
          path='/'
          element={<Home />}
        />
        <Route
          exact
          path='/login'
          element={<Login />}
        />
        <Route
          exact
          path='/signup'
          element={<Signup />}
        />
        <Route
          exact
          path='/upload-assignment'
          element={<CreateAssignment />}
        />
        <Route
          exact
          path='/profile'
          element={<Profile />}
        />
        <Route
          exact
          path='/all-users'
          element={<Table />}
        />
        <Route
          exact
          path='/all-assignments'
          element={<AllAssignments />}
        />
      </Routes>
    </>
  );
}

export default App;
