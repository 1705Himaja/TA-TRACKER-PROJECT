import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "../utils/axiosConfig";

const Navigation = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [notifs, setNotifs] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchNotifs = async () => {
      if (user.role === "Student") {
        const res = await axios.get(`/api/notifications/${user.username}`);
        setNotifs(res.data);
      } else {
        const res = await axios.get(`/api/notifications/user/${user.role}`);
        setNotifs(res.data);
      }
    };
    fetchNotifs();
  }, [user]);

  const deleteNotification = async (index) => {
    await axios.delete(`/api/notifications/${notifs[index]._id}`);
    setNotifs((prev) =>
      prev.filter((notif) => notif._id !== notifs[index]._id)
    );
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <nav className="navbar bg-gradient-to-r from-indigo-600 to-purple-600 mb-6">
        <div className="navbar-start">
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => navigate(-1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>
        <div className="navbar-center">
          {user && user.role === "TA Committee Member" && (
            <>
              <NavLink
                to="/feedbacks"
                className={({ isActive }) =>
                  `btn btn-ghost normal-case text-xl ${
                    isActive ? "bg-purple-800" : ""
                  }`
                }
              >
                Feedbacks
              </NavLink>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `btn btn-ghost normal-case text-xl ${
                    isActive ? "bg-purple-800" : ""
                  }`
                }
              >
                TA Application
              </NavLink>
            </>
          )}
          {user && user.role === "Instructor" && (
            <>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `btn btn-ghost normal-case text-xl ${
                    isActive ? "bg-purple-800" : ""
                  }`
                }
              >
                All Feedbacks
              </NavLink>
              <NavLink
                to="/feedback"
                className={({ isActive }) =>
                  `btn btn-ghost normal-case text-xl ${
                    isActive ? "bg-purple-800" : ""
                  }`
                }
              >
                Fill Feedback
              </NavLink>
            </>
          )}
          {user && user.role === "Student" && (
            <>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `btn btn-ghost normal-case text-xl ${
                    isActive ? "bg-purple-800" : ""
                  }`
                }
              >
                Applications
              </NavLink>
              <NavLink
                to="/applications"
                className={({ isActive }) =>
                  `btn btn-ghost normal-case text-xl ${
                    isActive ? "bg-purple-800" : ""
                  }`
                }
              >
                TA Application Form
              </NavLink>
              <NavLink
                to="/feedbacks"
                className={({ isActive }) =>
                  `btn btn-ghost normal-case text-xl ${
                    isActive ? "bg-purple-800" : ""
                  }`
                }
              >
                Feedbacks
              </NavLink>
            </>
          )}
          {user && user.role === "Department Staff" && (
            <>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `btn btn-ghost normal-case text-xl ${
                    isActive ? "bg-purple-800" : ""
                  }`
                }
              >
                TA Applications
              </NavLink>
              <NavLink
                to="/feedbacks"
                className={({ isActive }) =>
                  `btn btn-ghost normal-case text-xl ${
                    isActive ? "bg-purple-800" : ""
                  }`
                }
              >
                Feedbacks
              </NavLink>
              <NavLink
                to="/input-new-course"
                className={({ isActive }) =>
                  `btn btn-ghost normal-case text-xl ${
                    isActive ? "bg-purple-800" : ""
                  }`
                }
              >
                Input TA Requirement
              </NavLink>
            </>
          )}
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                {notifs.length > 0 && (
                  <span className="badge badge-xs badge-primary indicator-item"></span>
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              {notifs.map((notif, index) => (
                <li key={index}>
                  <a>{notif.message}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="dropdown dropdown-end ml-4">
            <label tabIndex={0} className="">
              <div className="avatar placeholder">
                <div className="bg-neutral  text-neutral-content rounded-full  ring ring-primary ring-offset-base-100  w-12">
                  <span className="text-xs">FMA</span>
                </div>
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 z-50"
            >
              <li>
                <a href="/profile">Profile</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {notifs.length > 0 && (
        <div className="toast toast-end">
          {notifs.map((notif, index) => (
            <div key={index} className="alert alert-info">
              <div>
                <span>{notif.message}</span>
                <button
                  className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2"
                  onClick={() => deleteNotification(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Navigation;
