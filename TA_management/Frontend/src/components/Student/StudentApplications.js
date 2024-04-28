import React, { useEffect, useState } from "react";
import axios from "axios";

const ApplicationCard = ({ appData, setApplication, index }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "badge-success";
      case "Pending":
        return "badge-warning";
      case "Rejected":
        return "badge-error";
      case "Reviewing":
        return "badge-info";
      case "Accepted":
        return "badge-success";
      default:
        return "";
    }
  };

  const acceptApplicationHandler = async () => {
    try {
      await axios.post("/api/application/changeStatus", {
        newStatus: "Accepted",
        appId: appData.applicationId,
        index: appData.index,
      });
      setApplication(index);
      alert("Application accepted!");
    } catch (error) {
      console.error("Error accepting application:", error);
    }
  };

  return (
    <div className="card mb-4 shadow-md glass">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h2 className="card-title">
            Course: <strong>{appData.course}</strong>
          </h2>
          <div
            className="badge badge-lg font-bold"
            data-color={getStatusColor(appData.status)}
          >
            {appData.status.toUpperCase()}
          </div>
          {appData.status === "Approved" && (
            <button
              className="btn btn-primary btn-sm"
              onClick={acceptApplicationHandler}
            >
              Accept
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const StudentApplications = ({ user }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`/api/applications`);
        const apps = [];
        response.data.applications.forEach((app) => {
          app.eligibleCourses.split(",").forEach((course, index) => {
            apps.push({
              ...app,
              applicationId: app._id,
              index,
              course,
              status:
                app.status.split(",").length > 1
                  ? app.status.split(",")[index]
                  : app.status,
            });
          });
        });
        setApplications(apps);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch applications", error);
      }
    };
    fetchApplications();
  }, []);

  const handleApplicationAccept = (index) => {
    const newApplications = [...applications];
    newApplications[index].status = "Accepted";
    setApplications(newApplications);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-8">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="flex justify-center items-center mt-8">
        <h2 className="text-2xl text-center">No applications found</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      {applications.map((app, index) => (
        <ApplicationCard
          key={index}
          appData={app}
          setApplication={handleApplicationAccept}
          index={index}
        />
      ))}
    </div>
  );
};

export default StudentApplications;
