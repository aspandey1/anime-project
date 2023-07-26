import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { reset, login } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { BiLogInCircle } from "react-icons/bi";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess || user) navigate("/dashboard");
    dispatch(reset());
  }, [user, isSuccess, isError, message, dispatch, navigate]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Please fill out all fields");
    dispatch(login(formData));
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <form onSubmit={onSubmit} className="container-lg d-flex flex-column mt-4">
      <div className="container-lg cont-log">
        <div className="d-flex justify-content-center">
          <BiLogInCircle size={150} />
        </div>
        <div className="d-flex justify-content-center">
          <div className="h1 fs-2 fw-bold">Login</div>
        </div>
        <div className="d-flex justify-content-center mb-4">
          <div className="lead fs-5 fw-normal">
            Please fill out the form below
          </div>
        </div>
        <div className="input-items">
          <div className="form-group width mb-3">
            <label htmlFor="email" className="mb-1">
              Email address
            </label>
            <input
              type="email"
              className="form-control border border-dark border-3 input-bg"
              placeholder="e.g. name@example.com"
              id="email"
              name="email"
              value={email}
              autoComplete="email"
              onChange={onChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="form-group width mb-3">
            <label htmlFor="password" className="mb-1">
              Password
            </label>
            <input
              type="password"
              className="form-control border border-dark border-3 input-bg"
              placeholder="Password"
              id="password"
              name="password"
              value={password}
              autoComplete="current-password"
              onChange={onChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="form-group width">
            <button
              type="submit"
              className="btn btn-primary w-100 fs-5 fw-bold py-2"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
