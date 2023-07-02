import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import { TiHome } from "react-icons/ti";
import { FaSearch } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);

  const { user, isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) return toast.error("Error in logging out");
    if (isSuccess) navigate("/");
    dispatch(reset());
  }, [isSuccess, isError, message, user, navigate, dispatch]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (isLoading) return <Spinner />;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-4">
      <div className="container-xxl">
        <Link className="navbar-brand" to="/">
          <span className="text-light fw-bold d-flex fs-1 justify-content-center">
            Anime Search
          </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#main-nav"
          aria-controls="main-nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end align-center "
          id="main-nav"
        >
          <ul className="navbar-nav">
            <li
              style={{ alignSelf: "center" }}
              className="nav-item  d-md-inline navbar-links-md"
            >
              {user != null ? (
                <Link to="/dashboard" className="link">
                  {width > 991 ? (
                    <TiHome size={46} color="white" />
                  ) : (
                    <p className="link-text">Home</p>
                  )}
                </Link>
              ) : (
                <></>
              )}
            </li>
            <li
              style={{ alignSelf: "center" }}
              className="nav-item  d-md-inline navbar-links-md"
            >
              {user != null ? (
                <Link to="/search" className="link">
                  {width > 991 ? (
                    <FaSearch size={38} color="white" />
                  ) : (
                    <p className="link-text">Search</p>
                  )}
                </Link>
              ) : (
                <></>
              )}
            </li>
            <li
              style={{ alignSelf: "center" }}
              className="nav-item  d-md-inline navbar-links-md"
            >
              {user != null ? (
                <Link to="/library" className="link">
                  {width > 991 ? (
                    <IoLibrary size={38} color="white" />
                  ) : (
                    <p className="link-text">Library</p>
                  )}
                </Link>
              ) : (
                <></>
              )}
            </li>
            <li className="nav-item mx-2">
              {user == null ? (
                <Link
                  style={{ height: 55, fontSize: 25, fontWeight: 600 }}
                  className="btn btn-secondary w-100 my-3 px-4"
                  to="/register"
                >
                  Sign Up
                </Link>
              ) : (
                <></>
              )}
            </li>
            <li className="nav-item mx-2">
              {user == null ? (
                <Link
                  style={{ height: 55, fontSize: 25, fontWeight: 600 }}
                  className="btn btn-primary w-100 my-3 px-4"
                  to="/login"
                >
                  Login
                </Link>
              ) : (
                <div
                  style={{ height: 55, fontSize: 25, fontWeight: 600 }}
                  className="btn btn-danger w-100 my-3 "
                  onClick={handleLogout}
                >
                  Logout
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
