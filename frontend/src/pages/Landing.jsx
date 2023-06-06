import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Landing = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <section id="intro" className="bg-dark py-5">
      <div className="container-lg">
        <div className="row g-4 justify-content-center align-items-center">
          <div className="col-md-5 text-center text-md-start">
            <h1>
              <div className="display-2 fw-bold text-light">Anime</div>
              <div className="lead fs-2 text-light mb-5">
                Search and rate your favorite anime
              </div>
            </h1>
            {user == null ? (
              <div>
                {" "}
                <Link to="/register" className="btn btn-secondary btn-lg me-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-primary btn-lg">
                  Login
                </Link>{" "}
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="col-md-3 text-center d-md-block">
            <img
              src={require("./assets/1.png")}
              className="img-fluid"
              alt="anime"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
