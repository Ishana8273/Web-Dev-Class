import { useState } from "react";

function Registration() {

  // ================= FORM STATE =================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    dob: "",
    gender: "",
    course: "",
    skills: [],
    country: "USA",
    address: "",
    website: "",
    time: "",
    color: "#0b0b0b",
    experience: 0,
    photo: "",
    terms: false
  });


  // ================= SUBMITTED DATA =================

  const [submittedData, setSubmittedData] = useState(null);


  // ================= HANDLE INPUT =================

  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };


  // ================= GENDER =================

  const handleGenderChange = (event) => {

    setFormData({
      ...formData,
      gender: event.target.value
    });
  };


  // ================= SKILLS =================

  const handleSkillChange = (event) => {

    const { value, checked } = event.target;

    if (checked) {

      setFormData({
        ...formData,
        skills: [...formData.skills, value]
      });

    } else {

      setFormData({
        ...formData,
        skills: formData.skills.filter(
          (skill) => skill !== value
        )
      });

    }
  };


  // ================= TERMS =================

  const handleTermsChange = (event) => {

    setFormData({
      ...formData,
      terms: event.target.checked
    });
  };


  // ================= PHOTO =================

  const handlePhoto = (event) => {

    const file = event.target.files[0];

    setFormData({
      ...formData,
      photo: file ? file.name : ""
    });
  };


  // ================= REGISTER =================

  const handleSubmit = (event) => {

    event.preventDefault();

    setSubmittedData({
      ...formData
    });

  };


  // ================= RESET =================

  const handleReset = () => {

    setFormData({
      name: "",
      email: "",
      password: "",
      age: "",
      dob: "",
      gender: "",
      course: "",
      skills: [],
      country: "USA",
      address: "",
      website: "",
      time: "",
      color: "#ff0055",
      experience: 0,
      photo: "",
      terms: false
    });

    setSubmittedData(null);
  };


  // ================= RETURN =================

  return (

    <div className="container-fluid mt-4 px-4">


      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="bg-warning text-start p-3 mb-4">

        <h1 className="mb-0">
          Registration Form
        </h1>

      </div>


      {/* ================================================= */}
      {/* FORM */}
      {/* ================================================= */}

      <form onSubmit={handleSubmit}>


        {/* ================= FULL NAME ================= */}

        <div className="mb-3">

          <label className="form-label">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

        </div>


        {/* ================= EMAIL ================= */}

        <div className="mb-3">

          <label className="form-label">
            Email
          </label>

          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

        </div>


        {/* ================= PASSWORD ================= */}

        <div className="mb-3">

          <label className="form-label">
            Password
          </label>

          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />

        </div>


        {/* ================= AGE ================= */}

        <div className="mb-3">

          <label className="form-label">
            Age
          </label>

          <input
            type="number"
            name="age"
            className="form-control"
            min="10"
            max="100"
            placeholder="Enter your age"
            value={formData.age}
            onChange={handleChange}
            required
          />

        </div>


        {/* ================= DATE OF BIRTH ================= */}

        <div className="mb-3">

          <label className="form-label">
            Date of Birth
          </label>

          <input
            type="date"
            name="dob"
            className="form-control"
            value={formData.dob}
            onChange={handleChange}
          />

        </div>


        {/* ================================================= */}
        {/* GENDER RADIO BUTTONS */}
        {/* ================================================= */}

        <div className="mb-3">

          <label className="form-label d-block">
            Gender
          </label>

          <div className="d-flex gap-4">

            {/* Male */}

            <div className="form-check">

              <input
                type="radio"
                name="gender"
                value="Male"
                className="form-check-input"
                checked={formData.gender === "Male"}
                onChange={handleGenderChange}
                required
              />

              <label className="form-check-label">
                Male
              </label>

            </div>


            {/* Female */}

            <div className="form-check">

              <input
                type="radio"
                name="gender"
                value="Female"
                className="form-check-input"
                checked={formData.gender === "Female"}
                onChange={handleGenderChange}
              />

              <label className="form-check-label">
                Female
              </label>

            </div>


            {/* Other */}

            <div className="form-check">

              <input
                type="radio"
                name="gender"
                value="Other"
                className="form-check-input"
                checked={formData.gender === "Other"}
                onChange={handleGenderChange}
              />

              <label className="form-check-label">
                Other
              </label>

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* COURSE PICKLIST */}
        {/* ================================================= */}

        <div className="mb-3">

          <label className="form-label">
            Course
          </label>

          <select
            name="course"
            className="form-select"
            value={formData.course}
            onChange={handleChange}
            required
          >

            <option value="">
              Select Course
            </option>

            <option value="B.Tech">
              B.Tech
            </option>

            <option value="BCA">
              BCA
            </option>

            <option value="MCA">
              MCA
            </option>

            <option value="BBA">
              BBA
            </option>

            <option value="MBA">
              MBA
            </option>

          </select>

        </div>


        {/* ================================================= */}
        {/* SKILLS MULTIPLE CHECKBOXES */}
        {/* ================================================= */}

        <div className="mb-3">

          <label className="form-label d-block">
            Skills
          </label>


          {/* HTML */}

          <div className="form-check">

            <input
              type="checkbox"
              value="HTML"
              className="form-check-input"
              checked={formData.skills.includes("HTML")}
              onChange={handleSkillChange}
            />

            <label className="form-check-label">
              HTML
            </label>

          </div>


          {/* CSS */}

          <div className="form-check">

            <input
              type="checkbox"
              value="CSS"
              className="form-check-input"
              checked={formData.skills.includes("CSS")}
              onChange={handleSkillChange}
            />

            <label className="form-check-label">
              CSS
            </label>

          </div>


          {/* JavaScript */}

          <div className="form-check">

            <input
              type="checkbox"
              value="JavaScript"
              className="form-check-input"
              checked={formData.skills.includes("JavaScript")}
              onChange={handleSkillChange}
            />

            <label className="form-check-label">
              JavaScript
            </label>

          </div>


          {/* React */}

          <div className="form-check">

            <input
              type="checkbox"
              value="React"
              className="form-check-input"
              checked={formData.skills.includes("React")}
              onChange={handleSkillChange}
            />

            <label className="form-check-label">
              React
            </label>

          </div>


          {/* Java */}

          <div className="form-check">

            <input
              type="checkbox"
              value="Java"
              className="form-check-input"
              checked={formData.skills.includes("Java")}
              onChange={handleSkillChange}
            />

            <label className="form-check-label">
              Java
            </label>

          </div>


          {/* Python */}

          <div className="form-check">

            <input
              type="checkbox"
              value="Python"
              className="form-check-input"
              checked={formData.skills.includes("Python")}
              onChange={handleSkillChange}
            />

            <label className="form-check-label">
              Python
            </label>

          </div>

        </div>


        {/* ================================================= */}
        {/* COUNTRY */}
        {/* ================================================= */}

        <div className="mb-3">

          <label className="form-label">
            Country
          </label>

          <select
            name="country"
            className="form-select"
            value={formData.country}
            onChange={handleChange}
          >

            <option value="USA">
              USA
            </option>

            <option value="India">
              India
            </option>

            <option value="UK">
              UK
            </option>

            <option value="Canada">
              Canada
            </option>

            <option value="Australia">
              Australia
            </option>

          </select>

        </div>


        {/* ================================================= */}
        {/* ADDRESS */}
        {/* ================================================= */}

        <div className="mb-3">

          <label className="form-label">
            Address
          </label>

          <textarea
            name="address"
            className="form-control"
            rows="4"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleChange}
          ></textarea>

        </div>


        {/* ================================================= */}
        {/* WEBSITE */}
        {/* ================================================= */}

        <div className="mb-3">

          <label className="form-label">
            Website
          </label>

          <input
            type="url"
            name="website"
            className="form-control"
            placeholder="https://example.com"
            value={formData.website}
            onChange={handleChange}
          />

        </div>


        {/* ================================================= */}
        {/* PREFERRED TIME */}
        {/* ================================================= */}

        <div className="mb-3">

          <label className="form-label">
            Preferred Time
          </label>

          <input
            type="time"
            name="time"
            className="form-control"
            value={formData.time}
            onChange={handleChange}
          />

        </div>


        {/* ================================================= */}
        {/* FAVORITE COLOR */}
        {/* ================================================= */}

        <div className="mb-3">

          <label className="form-label">
            Favorite Color
          </label>

          <br />

          <input
            type="color"
            name="color"
            className="form-control form-control-color"
            value={formData.color}
            onChange={handleChange}
          />

        </div>


        {/* ================================================= */}
        {/* EXPERIENCE */}
        {/* ================================================= */}

        <div className="mb-3">

          <label className="form-label">

            Experience:{" "}

            <strong>
              {formData.experience} Years
            </strong>

          </label>

          <input
            type="range"
            name="experience"
            className="form-range"
            min="0"
            max="20"
            value={formData.experience}
            onChange={handleChange}
          />

        </div>


        {/* ================================================= */}
        {/* PHOTO */}
        {/* ================================================= */}

        <div className="mb-3">

          <label className="form-label">
            Photo
          </label>

          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handlePhoto}
          />

          {formData.photo && (

            <small className="text-success">

              Selected: {formData.photo}

            </small>

          )}

        </div>


        {/* ================================================= */}
        {/* TERMS AND CONDITIONS */}
        {/* ================================================= */}

        <div className="form-check mb-3">

          <input
            type="checkbox"
            name="terms"
            className="form-check-input"
            checked={formData.terms}
            onChange={handleTermsChange}
            required
          />

          <label className="form-check-label">

            I agree to the Terms and Conditions

          </label>

        </div>


        {/* ================================================= */}
        {/* BUTTONS */}
        {/* ================================================= */}

        <div className="d-flex gap-2">

          <button
            type="submit"
            className="btn btn-warning"
          >
            Register
          </button>


          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleReset}
          >
            Reset
          </button>

        </div>

      </form>


      {/* ================================================= */}
      {/* DISPLAY SUBMITTED DATA */}
      {/* ================================================= */}

      {submittedData && (

        <div className="mt-5 mb-5">

          <div className="bg-success text-white p-3">

            <h2 className="mb-0">
              Registration Details
            </h2>

          </div>


          <div className="card mt-3">

            <div className="card-body">

              <p>
                <strong>Full Name:</strong>{" "}
                {submittedData.name}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {submittedData.email}
              </p>

              <p>
                <strong>Age:</strong>{" "}
                {submittedData.age}
              </p>

              <p>
                <strong>Date of Birth:</strong>{" "}
                {submittedData.dob}
              </p>

              <p>
                <strong>Gender:</strong>{" "}
                {submittedData.gender}
              </p>

              <p>
                <strong>Course:</strong>{" "}
                {submittedData.course}
              </p>

              <p>
                <strong>Skills:</strong>{" "}

                {submittedData.skills.length > 0
                  ? submittedData.skills.join(", ")
                  : "No skills selected"}

              </p>

              <p>
                <strong>Country:</strong>{" "}
                {submittedData.country}
              </p>

              <p>
                <strong>Address:</strong>{" "}
                {submittedData.address}
              </p>

              <p>
                <strong>Website:</strong>{" "}
                {submittedData.website}
              </p>

              <p>
                <strong>Preferred Time:</strong>{" "}
                {submittedData.time}
              </p>

              <p>
                <strong>Favorite Color:</strong>{" "}
                {submittedData.color}
              </p>

              <p>
                <strong>Experience:</strong>{" "}
                {submittedData.experience} Years
              </p>

              <p>
                <strong>Photo:</strong>{" "}
                {submittedData.photo || "No photo selected"}
              </p>

              <p>
                <strong>Terms:</strong>{" "}

                {submittedData.terms
                  ? "Agreed"
                  : "Not Agreed"}

              </p>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Registration;