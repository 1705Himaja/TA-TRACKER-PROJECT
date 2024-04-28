import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import {
  TaApplication,
  TaList,
  LoginForm,
  SignUpForm,
  Navigation,
  StudentApplications,
  InputCourseDS,
  TAListDS,
  FeedbackList,
  Feedback,
  FeedbackListTC,
  FeedbackListDS,
  FeedbackListStudent,
  ProfilePage,
} from "./components";
import { CircularProgress, Container } from "@mui/material";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleSetUser = (user) => {
    setUser(user);
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get("/api/validate-session");
        setUser(response.data.user);
        setLoading(false);
      } catch (error) {
        console.error("Session validation failed", error);
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="indicator">
          <div
            className="radial-progress animate-spin"
            style={{ "--value": 50 }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {user && <Navigation user={user} setUser={handleSetUser} />}

        <div className="flex-grow">
          {!user && (
            <Routes>
              <Route
                path="/signup"
                element={<SignUpForm setUser={handleSetUser} />}
              />
              <Route path="*" element={<LoginForm setUser={handleSetUser} />} />
            </Routes>
          )}

          {user && user.role === "Student" && (
            <Routes>
              <Route
                path="/applications"
                element={<TaApplication user={user} />}
              />
              <Route
                path="/feedbacks"
                element={<FeedbackListStudent user={user} />}
              />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<StudentApplications user={user} />} />
            </Routes>
          )}

          {user && user.role === "TA Committee Member" && (
            <Routes>
              <Route
                path="/feedbacks"
                element={<FeedbackListTC setUser={handleSetUser} user={user} />}
              />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<TaList />} />
            </Routes>
          )}

          {user && user.role === "Department Staff" && (
            <Routes>
              <Route
                path="/feedbacks"
                element={<FeedbackListDS setUser={handleSetUser} user={user} />}
              />
              <Route path="/input-new-course" element={<InputCourseDS />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<TAListDS />} />
            </Routes>
          )}

          {user && user.role === "Instructor" && (
            <Routes>
              <Route
                path="/feedback"
                element={<Feedback setUser={handleSetUser} user={user} />}
              />
              <Route path="/profile" element={<ProfilePage />} />
              <Route
                path="*"
                element={<FeedbackList setUser={handleSetUser} user={user} />}
              />
            </Routes>
          )}
        </div>
        {user && (
          <footer className="footer footer-center p-4 bg-base-300 text-base-content w-full">
            <div>
              <p>
                Copyright © 2024 - All right reserved by TA Management System
              </p>
            </div>
          </footer>
        )}
      </div>
    </Router>
  );
};

export default App;
