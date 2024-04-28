import React, { useState, useEffect } from "react";
import axios from "axios";

const downloadFile = async (filename) => {
  try {
    filename = filename.split("/")[1];
    const response = await axios.get(`/api/download-resume/${filename}`, {
      responseType: "blob",
    });

    const file = new Blob([response.data], {
      type: "application/octet-stream",
    });

    const downloadUrl = window.URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", `${filename}.pdf`);
    document.body.appendChild(link);
    link.click();

    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};

const TaList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  const storeApplications = (applications) => {
    const newApps = [];
    applications.forEach((app) => {
      app.status?.split(",").forEach((status, index) => {
        if (status === "Reviewing") {
          newApps.push({
            ...app,
            eligibleCourses: app.eligibleCourses?.split(",")[index],
            index,
          });
        }
      });
    });
    setApplications(newApps);
  };

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/ta-applications");
        storeApplications(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching TA applications:", error);
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const approveApplication = (aIndex, index) => {
    const newApplications = [
      ...applications.slice(0, aIndex),
      ...applications.slice(aIndex + 1),
    ];
    setApplications(newApplications);
  };

  const handleApprove = async (aIndex, index) => {
    try {
      await axios.post("/api/application/changeStatus", {
        newStatus: "Approved",
        appId: applications[aIndex]._id,
        index: index,
      });
      approveApplication(aIndex, index);
      alert("Application accepted!");
    } catch (error) {
      console.error("Error accepting application:", error);
    }
  };
  const rejectApplication = (aIndex) => {
    const newApplications = [
      ...applications.slice(0, aIndex),
      ...applications.slice(aIndex + 1),
    ];
    setApplications(newApplications);
  };

  const handleReject = async (aIndex, index) => {
    try {
      await axios.post("/api/application/changeStatus", {
        newStatus: "Rejected",
        appId: applications[aIndex]._id,
        index: index,
      });
      rejectApplication(aIndex);
      alert("Application rejected!");
    } catch (error) {
      console.error("Error rejecting application:", error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto text-center">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  return (
    <div className="px-6 mx-4 text-center">
      {applications.length === 0 ? (
        <p className="mt-8 text-center">No Applications for approval</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="text-xl" style={{ fontFamily: "Dhurjati" }}>
                  Name
                </th>
                <th className="text-xl" style={{ fontFamily: "Dhurjati" }}>
                  Email
                </th>
                <th className="text-xl" style={{ fontFamily: "Dhurjati" }}>
                  Phone Number
                </th>
                <th className="text-xl" style={{ fontFamily: "Dhurjati" }}>
                  Joining Date
                </th>
                <th className="text-xl" style={{ fontFamily: "Dhurjati" }}>
                  Previous Courses
                </th>
                <th className="text-xl" style={{ fontFamily: "Dhurjati" }}>
                  Eligible Courses
                </th>
                <th className="text-xl" style={{ fontFamily: "Dhurjati" }}>
                  Strengths
                </th>
                <th className="text-xl" style={{ fontFamily: "Dhurjati" }}>
                  Resume
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application, aIndex) => (
                <tr key={application._id}>
                  <th>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold">{application.name}</div>
                        <div className="text-sm opacity-50">
                          {application.email}
                        </div>
                      </div>
                    </div>
                  </th>
                  <td>{application.email}</td>
                  <td>{application.phoneNumber}</td>
                  <td>
                    {new Date(application.joiningDate).toLocaleDateString()}
                  </td>
                  <td>
                    {application.previousCourses
                      ?.split(",")
                      .map((course, index) => (
                        <div
                          key={index}
                          className="badge badge-primary font-bold m-1 py-1"
                        >
                          {course}
                        </div>
                      ))}
                  </td>
                  <td>
                    <div
                      key={aIndex}
                      className="badge badge-secondary font-bold"
                    >
                      {application.eligibleCourses}
                    </div>
                  </td>
                  <td>
                    <div className="max-w-xs overflow-auto">
                      {application.strengths}
                    </div>
                  </td>
                  <td>
                    <button
                      className="btn btn-link"
                      onClick={() => downloadFile(application.resume)}
                    >
                      Download Resume
                    </button>
                  </td>
                  <th>
                    <div className="flex flex-row items-center space-x-2">
                      <button
                        className="btn btn-success"
                        onClick={() => handleApprove(aIndex, application.index)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-error"
                        onClick={() => handleReject(aIndex, application.index)}
                      >
                        Reject
                      </button>
                    </div>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TaList;
