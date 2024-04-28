import { useEffect, useState } from "react";
import axios from "axios";
import {
  PersonalDetails,
  PreviousTACourses,
  EligibleCourses,
  ResumeUploader,
  StrengthsInput,
} from "./ta_application.js";

const TaApplication = ({ user }) => {
  const [fileName, setFileName] = useState("");
  const [personalDetails, setPersonalDetails] = useState({
    username: user.username,
    name: "",
    email: "",
    phoneNumber: "",
    joiningDate: "",
    znumber: "",
  });

  const [previousCourses, setPreviousCourses] = useState([""]);
  const [checkPreviousCourse, setCheckPreviousCourse] = useState(false);
  const [eligibleCourses, setEligibleCourses] = useState(["Select Course"]);
  const [resume, setResume] = useState(null);
  const [reqCourse, setReqCourse] = useState([]);
  const [strengths, setStrengths] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("/api/profile");
        const { name, email, phoneNumber, joiningDate, znumber } =
          response.data;
        setPersonalDetails((prevDetails) => ({
          ...prevDetails,
          name,
          email,
          phoneNumber,
          joiningDate: joiningDate
            ? new Date(joiningDate).toISOString().substr(0, 10)
            : "",
          znumber: znumber || "",
        }));
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/req-courses");
        setReqCourse(response.data);
      } catch (e) {
        alert("Error fetching courses");
      }
    };
    fetchUserProfile();
    fetchCourses();
  }, []);

  const handlePersonalDetailsChange = (e) => {
    setPersonalDetails({ ...personalDetails, [e.target.name]: e.target.value });
  };

  const handleCheckPC = (value) => {
    setCheckPreviousCourse(value);
  };

  const handlePreviousCoursesChange = (index, value) => {
    const newCourses = [...previousCourses];
    newCourses[index] = value;
    setPreviousCourses(newCourses);
  };

  const handleRemovePreviousCourse = (index) => {
    const newCourses = [...previousCourses];
    newCourses.splice(index, 1);
    setPreviousCourses(newCourses);
  };

  const handleEligibleCoursesChange = (index, value) => {
    const newCourses = [...eligibleCourses];
    newCourses[index] = value;
    setEligibleCourses(newCourses);
  };

  const handleRemoveEligibleCourse = (index) => {
    const newCourses = [...eligibleCourses];
    newCourses.splice(index, 1);
    setEligibleCourses(newCourses);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume(file);
      setFileName(file.name);
    }
  };

  const validateForm = () => {
    for (const key in personalDetails) {
      console.log(personalDetails);
      if (personalDetails[key] == undefined) {
        return {
          valid: false,
          message: `please fill out ${key} personal details in Profile.`,
        };
      }
      if (personalDetails[key].trim() === "") {
        return { valid: false, message: `Please fill out the ${key}.` };
      }
    }
    if (!resume) {
      return { valid: false, message: "Please upload your resume." };
    }
    if (
      checkPreviousCourse &&
      previousCourses.every((course) => course.trim() === "")
    ) {
      return {
        valid: false,
        message: "Please enter at least one previous TA course.",
      };
    }
    if (
      eligibleCourses.length === 0 ||
      eligibleCourses.every((course) => course === "Select Course")
    ) {
      return {
        valid: false,
        message: "Please enter at least one eligible course.",
      };
    }

    return { valid: true, message: "Form is valid." };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateForm();
    if (!validation.valid) {
      alert(validation.message);
      return;
    }

    const formData = new FormData();
    formData.append("username", personalDetails.username);
    formData.append("name", personalDetails.name);
    formData.append("course", personalDetails.course);
    formData.append("email", personalDetails.email);
    formData.append("joiningDate", personalDetails.joiningDate);
    formData.append("phoneNumber", personalDetails.phoneNumber);
    formData.append("strengths", strengths);
    formData.append("resume", resume);
    if (checkPreviousCourse) {
      formData.append(
        "previousCourses",
        previousCourses
          .filter((course) => course.trim() !== "")
          .map((course) => course.trim())
          .join(",")
      );
    }
    formData.append(
      "eligibleCourses",
      eligibleCourses
        .filter((course) => course !== "Select Course")
        .map((course) => course.trim())
        .join(",")
    );
    const pendingStatusArrayLength = eligibleCourses
      .filter((course) => course.trim() !== "")
      .map((course) => course.trim()).length;
    const pendingStatusArray = Array(pendingStatusArrayLength).fill("Pending");
    formData.append("status", pendingStatusArray.join(","));

    try {
      await axios.post("/api/ta-application", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Form submitted successfully!");

      setFileName("");
      setPersonalDetails({
        username: user.username,
        name: "",
        email: "",
        phoneNumber: "",
        joiningDate: "",
      });
      setPreviousCourses([""]);
      setEligibleCourses([""]);
      setResume(null);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container mx-auto bg-white rounded-3xl p-8">
      <h2 className="text-3xl font-bold mb-8">TA Application</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">Personal Details</h3>
          <PersonalDetails
            personalDetails={personalDetails}
            onChange={handlePersonalDetailsChange}
          />
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-4">Resume</h3>
          <ResumeUploader onChange={handleFileChange} fileName={fileName} />
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Strengths</h3>
        <StrengthsInput
          strengths={strengths}
          onChange={(e) => setStrengths(e.target.value)}
        />
      </div>
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Previous TA Courses</h3>
        <PreviousTACourses
          previousCourses={previousCourses}
          onChange={handlePreviousCoursesChange}
          addCourse={setPreviousCourses}
          removeCourse={handleRemovePreviousCourse}
          checkPreviousCourse={checkPreviousCourse}
          setCheckPreviousCourse={handleCheckPC}
        />
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Eligible Courses</h3>
        <EligibleCourses
          eligibleCourses={eligibleCourses}
          onChange={handleEligibleCoursesChange}
          addCourse={setEligibleCourses}
          removeCourse={handleRemoveEligibleCourse}
          availableCourses={reqCourse}
        />
      </div>

      <div className="mt-8 text-center">
        <button className="btn btn-primary btn-lg" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default TaApplication;
