import React from "react";

const PersonalDetails = ({ personalDetails }) => {
  return (
    <div className="card mx-auto shadow py-6 px-4 bg-base-100 shadow-xl">
      <h2 className="text-2xl font-bold mb-4">PERSONAL DETAILS</h2>
      <p className="text-red-500 mb-4">
        * These details are non-editable. Please update them on your profile
        page.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            name="username"
            className="input input-bordered"
            value={personalDetails.username}
            disabled
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            name="name"
            className="input input-bordered"
            value={personalDetails.name}
            disabled
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            className="input input-bordered"
            value={personalDetails.email}
            disabled
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Phone Number</span>
          </label>
          <input
            type="text"
            name="phoneNumber"
            className="input input-bordered"
            value={personalDetails.phoneNumber}
            disabled
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Z-number</span>
          </label>
          <input
            type="text"
            name="name"
            className="input input-bordered"
            value={personalDetails.znumber}
            disabled
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Joining Date</span>
          </label>
          <input
            type="text"
            name="joiningDate"
            className="input input-bordered"
            value={personalDetails.joiningDate}
            disabled
          />
        </div>
      </div>
    </div>
  );
};
const PreviousTACourses = ({
  previousCourses,
  onChange,
  addCourse,
  removeCourse,
  checkPreviousCourse,
  setCheckPreviousCourse,
}) => {
  return (
    <div className="card mx-auto shadow py-6 px-4">
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={checkPreviousCourse}
          onChange={(e) => setCheckPreviousCourse(e.target.checked)}
          className="checkbox checkbox-primary"
        />
        <h2 className="text-2xl font-bold ml-2">PREVIOUSLY SERVED AS TA</h2>
      </div>
      {checkPreviousCourse && (
        <>
          {previousCourses.map((input, index) => (
            <div className="form-control mb-2" key={index}>
              <div className="flex items-center">
                <input
                  type="text"
                  className="input input-bordered flex-grow"
                  value={previousCourses[index]}
                  onChange={(e) => onChange(index, e.target.value)}
                />
                <button
                  className="btn btn-error ml-2"
                  onClick={() => removeCourse(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
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
          <div className="flex justify-end">
            <button
              className="btn btn-secondary mt-2"
              onClick={() => addCourse([...previousCourses, ""])}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const EligibleCourses = ({
  eligibleCourses,
  onChange,
  addCourse,
  removeCourse,
  availableCourses,
}) => {
  return (
    <div className="card mx-auto shadow py-6 px-4 glass">
      <h2 className="text-2xl font-bold mb-4">ELIGIBLE COURSES</h2>
      {eligibleCourses.map((course, index) => (
        <div className="form-control mb-2" key={index}>
          <div className="flex items-center">
            <select
              className="select select-bordered flex-grow"
              value={course}
              onChange={(e) => onChange(index, e.target.value)}
            >
              <option value="Select Course">Select Course</option>
              {availableCourses?.map((aCourse, index) => (
                <option key={index} value={aCourse.courseName}>
                  {aCourse.courseName}
                </option>
              ))}
            </select>
            <button
              className="btn btn-error ml-2"
              onClick={() => removeCourse(index)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
      <div className="flex justify-end">
        <button
          className="btn btn-secondary mt-2"
          onClick={() => addCourse([...eligibleCourses, "Select Course"])}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
const ResumeUploader = ({ onChange, fileName }) => {
  return (
    <div className="card mx-auto shadow py-6 px-4 glass">
      <h2 className="text-2xl font-bold mb-4">UPLOAD YOUR RESUME</h2>
      <div className="form-control mb-4">
        <input
          type="file"
          accept="application/pdf"
          className="file-input file-input-bordered"
          onChange={onChange}
        />
      </div>
      {fileName && (
        <div className="badge badge-error badge-lg mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          {fileName}
        </div>
      )}
    </div>
  );
};

const StrengthsInput = ({ strengths, onChange }) => {
  return (
    <div className="card glass p-4 mb-4">
      <label htmlFor="strengths" className="block mb-2 font-bold text-gray-700">
        Strengths
      </label>
      <textarea
        id="strengths"
        name="strengths"
        value={strengths}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none"
        rows="4"
        placeholder="Describe your strengths and why you would be a good fit for the TA position..."
      ></textarea>
    </div>
  );
};

export {
  PersonalDetails,
  PreviousTACourses,
  EligibleCourses,
  ResumeUploader,
  StrengthsInput,
};
