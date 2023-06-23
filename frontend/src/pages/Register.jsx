import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { MdPerson2 } from "react-icons/md";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const { email, firstName, lastName, password, confirmPassword } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess || user) navigate("/dashboard");
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !firstName || !lastName || password || confirmPassword)
      return toast.error("Please fill out all fields");
    if (password !== confirmPassword)
      return toast.error("Passwords do not match");
    else {
      const userData = {
        firstName,
        lastName,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <form onSubmit={onSubmit} className="container-lg d-flex flex-column mt-4">
      <div className="container-lg">
        <div className="d-flex justify-content-center">
          <MdPerson2 size={150} />
        </div>
        <div className="d-flex justify-content-center">
          <div className="h1 fs-2 fw-bold">Sign Up</div>
        </div>
        <div className="d-flex justify-content-center mb-4">
          <div className="lead fs-5 fw-normal">
            Please fill out the form below
          </div>
        </div>

        <div className="input-items">
          <div className="form-group width mb-3">
            <label className="mb-1" htmlFor="email">
              Email address
            </label>
            <input
              type="email"
              className="form-control border border-dark border-3"
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
            <label htmlFor="firstName" className="mb-1">
              First Name
            </label>
            <input
              type="text"
              className="form-control border border-dark border-3"
              placeholder="e.g. John"
              id="firstName"
              name="firstName"
              value={firstName}
              autoComplete="given-name"
              onChange={onChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="form-group width mb-3">
            <label htmlFor="lastName" className="mb-1">
              Last Name
            </label>
            <input
              type="text"
              className="form-control border border-dark border-3"
              placeholder="e.g. Doe"
              name="lastName"
              id="lastName"
              value={lastName}
              autoComplete="family-name"
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
              className="form-control border border-dark border-3"
              placeholder="Password"
              id="password"
              name="password"
              value={password}
              autoComplete="new-password"
              onChange={onChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="form-group width mb-4">
            <label htmlFor="confirmPassword" className="mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control border border-dark border-3"
              placeholder="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              autoComplete="new-password"
              onChange={onChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="form-group width">
            <button
              type="submit"
              className="btn btn-primary w-100 fs-5 fw-bold py-2"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Register;
