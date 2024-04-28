import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    joiningDate: "",
    znumber: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("/api/profile");
        setUserDetails((prevDetails) => ({
          ...prevDetails,
          ...response.data,
          joiningDate: response.data.joiningDate
            ? new Date(response.data.joiningDate).toISOString().substr(0, 10)
            : "",
        }));
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/api/profile", userDetails);
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            name="name"
            className="input input-bordered"
            value={userDetails.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            className="input input-bordered"
            value={userDetails.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Z-number</span>
          </label>
          <input
            type="text"
            name="znumber"
            className="input input-bordered"
            value={userDetails.znumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Phone Number</span>
          </label>
          <input
            type="text"
            name="phoneNumber"
            className="input input-bordered"
            value={userDetails.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Joining Date</span>
          </label>
          <input
            type="date"
            name="joiningDate"
            className="input input-bordered"
            value={userDetails.joiningDate}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
