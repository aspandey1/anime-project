import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import Spinner from "./spinner";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) return toast.error("Error in logging out");
    if (isSuccess) navigate("/");
    dispatch(reset());
  }, [isSuccess, isError, message, user, navigate, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (isLoading) return <Spinner />;

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark py-4">
      <div className="container-xxl">
        <Link className="navbar-brand" to="/">
          <span className="text-light fw-bold d-flex justify-content-center">
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
            <li className="nav-item ms-2 d-md-inline navbar-links-md">
              {user == null ? (
                <Link className="btn btn-secondary w-100 my-2" to="/register">
                  Sign Up
                </Link>
              ) : (
                <></>
              )}
            </li>
            <li className="nav-item ms-2 d-md-inline navbar-links-md ">
              {user == null ? (
                <Link className="btn btn-primary w-100 my-2" to="/login">
                  Login
                </Link>
              ) : (
                <div
                  className="btn btn-danger w-100 my-2"
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
