import axios from "axios";
import React, { useEffect, useState } from "react";

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

const TAList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const updateApplications = (apps) => {
    const newApps = [];
    apps.forEach((app) => {
      app.status.split(",").forEach((status, index) => {
        if (status === "Pending" || status === "Reviewing") {
          newApps.push({
            ...app,
            eligibleCourses: app.eligibleCourses.split(",")[index],
            index,
          });
        }
      });
    });
    setApplications(newApps);
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("/api/ta-applications");
        updateApplications(response.data);
        setLoading(false);
      } catch (e) {
        alert("Error fetching applications");
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
        newStatus: "Reviewing",
        appId: applications[aIndex]._id,
        index: index,
      });
      approveApplication(aIndex, index);
      alert("Application sent to TA committee!");
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
      <div className="container mx-auto">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  return (
    <div className="px-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {applications.length === 0 ? (
          <h2 className="text-2xl font-bold mt-8 text-center">
            No Applications to review
          </h2>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="text-xl" style={{ fontFamily: "Dhurjati" }}>
                    Name (username)
                  </th>
                  <th className="text-xl" style={{ fontFamily: "Dhurjati" }}>
                    Email
                  </th>
                  <th className="text-xl" style={{ fontFamily: "Dhurjati" }}>
                    Phone Number
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
                {applications.map((applicant, aIndex) => (
                  <tr key={aIndex}>
                    <td>
                      {applicant.name}{" "}
                      <span className="italic">({applicant.username})</span>
                    </td>
                    <td>{applicant.email}</td>
                    <td>{applicant.phoneNumber}</td>
                    <td>
                      {applicant.previousCourses
                        ?.split(",")
                        .map((course, index) => (
                          <div
                            key={index}
                            className="badge badge-primary font-bold m-1"
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
                        {applicant.eligibleCourses}
                      </div>
                    </td>
                    <td>
                      <div className="max-w-xs overflow-auto">
                        {applicant.strengths}
                      </div>
                    </td>
                    <td>
                      <button
                        className="btn btn-link"
                        onClick={() => downloadFile(applicant.resume)}
                      >
                        Download Resume
                      </button>
                    </td>
                    <td className="flex flex-row items-center space-x-2">
                      <button
                        className="btn btn-success"
                        onClick={() => handleApprove(aIndex, applicant.index)}
                        disabled={
                          applicant.status.split(",")[applicant.index] ===
                          "Reviewing"
                        }
                      >
                        Recommend
                      </button>
                      <button
                        className="btn btn-error"
                        disabled={
                          applicant.status.split(",")[applicant.index] ===
                          "Reviewing"
                        }
                        onClick={() => handleReject(aIndex, applicant.index)}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TAList;
