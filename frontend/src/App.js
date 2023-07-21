import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NavBar from "./components/Navbar";
import "./App.css";
import PrivateRoutes from "./features/auth/privateRoutes";
import AnimeInfo from "./pages/AnimeInfo";
import Search from "./pages/Search";
import Library from "./pages/Library";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/anime/:animeID" element={<AnimeInfo />}></Route>
            <Route path="/search" element={<Search />}></Route>
            <Route path="/library" element={<Library />}></Route>
          </Route>
        </Routes>
        <Footer />
      </Router>

      <ToastContainer />
    </>
  );
}

export default App;
