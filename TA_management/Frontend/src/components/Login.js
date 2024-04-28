import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosConfig";

const LoginForm = ({ setUser }) => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const showToast = (message, type) => {
    const toastContainer = document.getElementById("toast-container");
    toastContainer.innerHTML += `<div class="alert alert-${
      type === "error" ? "error" : "success"
    }">
			<span>${message}</span>
		</div>`;
    setTimeout(() => {
      toastContainer.children[0].remove();
    }, 5000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loginData?.username.length == 0 || loginData?.password.length == 0) {
      showToast("Enter Username and password", "error");
      return;
    }
    if (loginData?.password.length < 7) {
      showToast("Password too small", "error");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/api/login", {
        username: loginData.username,
        password: loginData.password,
      });

      setUser({ username: response.data.username, role: response.data.role });
      navigate("/");
      showToast("Logged in successfully!", "success");
    } catch (error) {
      console.error("Error during login:", error);
      showToast("Invalid credentials", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="hero min-h-screen bg-base-200 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="fill-current text-primary opacity-20"
        >
          <path d="M0,96L48,112C96,128,192,160,288,176C384,192,480,192,576,176C672,160,768,128,864,128C960,128,1056,160,1152,186.7C1248,213,1344,235,1392,245.3L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>
      </div>

      <div className="absolute top-1/3 left-3/4 w-64 h-64 border-4 border-secondary rounded-full opacity-20"></div>
      <div className="absolute top-1/2 right-0 w-80 h-80 border-4 border-accent rounded-full opacity-20"></div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-64 border-4 border-info rounded-full opacity-20"></div>

      <div id="toast-container" className="toast toast-start"></div>

      <div className="hero-content flex-col lg:flex-row-reverse relative z-10">
        <div className="text-center lg:text-left lg:ml-16">
          <h1 className="text-5xl font-bold text-primary mb-4">
            Welcome Back!
          </h1>
          <p className="py-6 text-xl">
            Securely access the TA Tracking System. Enter your credentials to
            continue.
          </p>
        </div>

        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <h4 className="text-3xl font-bold text-center mb-8">Login</h4>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-control">
                <label htmlFor="username" className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  className="input input-bordered w-full"
                  value={loginData.username}
                  onChange={(e) =>
                    setLoginData({ ...loginData, username: e.target.value })
                  }
                  disabled={loading}
                />
              </div>
              <div className="form-control">
                <label htmlFor="password" className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  disabled={loading}
                />
              </div>
              <div className="flex justify-between items-center">
                <button
                  className="btn btn-primary btn-block"
                  disabled={loading}
                >
                  {loading ? (
                    <i className="fas fa-spinner animate-spin"></i>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </div>
            </form>
            <div className="text-center mt-4">
              <a
                href="#"
                className="link link-hover text-lg"
                onClick={handleSignUp}
              >
                Don't have an Account? Register here.
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
