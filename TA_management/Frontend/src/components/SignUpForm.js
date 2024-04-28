import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosConfig";

const SignUpForm = ({ setUser }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: "Student",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      showToast("Passwords do not match!", "error");
      return;
    }
    if (userData.username.length == 0) {
      showToast("Username cant be empty!", "error");
      return;
    }
    if (userData.password.length < 8) {
      showToast("Password should be at least 8 character long.", "error");
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post("/api/signup", {
        username: userData.username,
        password: userData.password,
        role: userData.role,
      });
      setUser({ username: response.data.username, role: response.data.role });
      navigate("/");
      showToast("Signed up successfully!", "success");
    } catch (error) {
      console.error("Error during signup:", error.data);
      showToast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
  const handleSignIn = () => {
    navigate("/");
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
          <h1 className="text-5xl font-bold text-primary mb-4">Sign Up Now!</h1>
          <p className="py-6 text-xl">
            Securely access the TA Tracking System. Enter your credentials to
            continue.
          </p>
        </div>

        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <h4 className="text-3xl font-bold text-center mb-8">Sign Up</h4>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-control">
                <input
                  className="input input-bordered w-full mb-4"
                  disabled={loading}
                  onChange={handleChange}
                  {...inputProps("username", "Enter your username")}
                />
                <input
                  className="input input-bordered w-full mb-4"
                  disabled={loading}
                  onChange={handleChange}
                  {...inputProps("password", "Enter your password", "password")}
                />
                <input
                  className="input input-bordered w-full mb-4"
                  disabled={loading}
                  onChange={handleChange}
                  {...inputProps(
                    "confirmPassword",
                    "Confirm your password",
                    "password"
                  )}
                />
                <select
                  className="select select-bordered w-full mb-4"
                  disabled={loading}
                  onChange={handleChange}
                  {...selectProps("role")}
                >
                  <option value="Student">Student</option>
                  <option value="Instructor">Instructor</option>
                  <option value="TA Committee Member">
                    TA Committee Member
                  </option>
                  <option value="Department Staff">Department Staff</option>
                </select>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                  >
                    {loading ? (
                      <i className="fas fa-spinner animate-spin"></i>
                    ) : (
                      "Register"
                    )}
                  </button>
                </div>
              </div>
            </form>
            <div className="text-center mt-4">
              <a
                href="#"
                className="link link-hover text-lg"
                onClick={handleSignIn}
              >
                Already have an Account? Log In here.
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function inputProps(name, placeholder, type = "text") {
  return {
    id: name,
    name,
    placeholder,
    type,
  };
}

function selectProps(name) {
  return {
    id: name,
    name,
  };
}

export default SignUpForm;
