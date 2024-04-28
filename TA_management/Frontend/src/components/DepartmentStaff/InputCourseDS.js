import axios from "axios";
import React, { useEffect, useState } from "react";

const InputCourseDS = () => {
  const [courseDetails, setCourseDetails] = useState({
    courseName: "",
    courseNumber: "",
    cap: "0",
    cot: "",
    len: "",
  });
  const [availableCourses, setAvailableCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/req-courses");
        setAvailableCourses(response.data);
      } catch (e) {
        alert("Error fetching courses");
      }
    };

    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("/api/add-course", courseDetails);
    setAvailableCourses([...availableCourses, courseDetails]);
    alert(response.data.message);
    setCourseDetails({
      courseName: "",
      courseNumber: "",
      cap: "",
      cot: "",
      len: "",
    }); // Reset form
  };

  const deleteCourse = async (id) => {
    const response = await axios.post("/api/delete-course", { id });
    alert(response.data.message);
    setAvailableCourses(availableCourses.filter((course) => course._id !== id));
  };

  const handleChange = (e) => {
    setCourseDetails({ ...courseDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto max-w-xl  px-6 py-8 shadow rounded-lg mb-8">
      <h2
        className="text-center mb-6 text-3xl font-bold"
        style={{ fontFamily: "Aoboshi One" }}
      >
        Input Course
      </h2>
      <form onSubmit={handleSubmit} className="form-control">
        <label className="label">
          <span className="label-text">Course Name</span>
        </label>
        <input
          type="text"
          name="courseName"
          className="input input-bordered w-full"
          value={courseDetails.courseName}
          onChange={handleChange}
        />

        <label className="label">
          <span className="label-text">Course Number</span>
        </label>
        <input
          type="text"
          name="courseNumber"
          className="input input-bordered w-full"
          value={courseDetails.courseNumber}
          onChange={handleChange}
        />

        <label className="label">
          <span className="label-text">Capacity</span>
        </label>
        <input
          type="number"
          name="cap"
          className="input input-bordered w-full"
          value={courseDetails.cap}
          onChange={handleChange}
        />

        <label className="label">
          <span className="label-text">
            Course Offering Type (Core, Elective, Mandatory)
          </span>
        </label>
        <select
          name="cot"
          className="select select-bordered w-full"
          value={courseDetails.cot}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select type
          </option>
          <option value="Core">Core</option>
          <option value="Elective">Elective</option>
          <option value="Mandatory">Mandatory</option>
        </select>

        <label className="label">
          <span className="label-text">Course Length (Hours)</span>
        </label>
        <input
          type="number"
          name="len"
          className="input input-bordered w-full"
          value={courseDetails.len}
          onChange={handleChange}
        />

        <div className="text-center mt-6">
          <button type="submit" className="btn btn-primary">
            Add Course
          </button>
        </div>
      </form>
      <div className="mt-8">
        <h3 className="mb-4 text-2xl font-bold">Available Courses</h3>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Number</th>
                <th>Capacity</th>
                <th>Type</th>
                <th>Hours</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {availableCourses.map((course, index) => (
                <tr key={index}>
                  <td>{course.courseName}</td>
                  <td>{course.courseNumber}</td>
                  <td>{course.cap}</td>
                  <td>{course.cot}</td>
                  <td>{course.len}</td>
                  <td>
                    <button
                      className="btn btn-error"
                      onClick={() => deleteCourse(course._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InputCourseDS;
