import React, { useState } from "react";
import SubmitFormButton from "./SubmitFormButton";
import "../styles/ContactMeForm.css"; // Create a CSS file for styling

const ContactMeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if required fields are filled
    const requiredFields = ["name", "email", "message"];
    const emptyFields = requiredFields.filter((field) => !formData[field]);

    if (emptyFields.length > 0) {
      alert(
        `Please fill in the following required fields: ${emptyFields.join(
          ", "
        )}.`
      );
      return;
    }

    setShowModal(true);
  };

  return (
    <div>
      <form className="contact-me-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>
        <SubmitFormButton buttonText="Submit" onSubmit={handleSubmit} />
      </form>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2 className="space-heading">Jokes, who uses emails anymore?</h2>
            <p className="grey-background">
              Hey Andy, Love the site. I'm <strong>{formData.name}.</strong>
              <br />
              <strong>{formData.message}</strong>
              <br />
            </p>
            <div className="button-container">
              <button
                className="hundred-button"
                onClick={() => copyToClipboard(formData)}
              >
                Copy to Clipboard
              </button>
              <a
                href="https://www.linkedin.com/in/andrew-fraser-programmer/"
                target="_blank"
                rel="noopener noreferrer"
                className="fifty-button"
              >
                Visit my LinkedIn profile
              </a>
              <a
                href="https://twitter.com/MeditatingLemur"
                target="_blank"
                rel="noopener noreferrer"
                className="fifty-button"
              >
                Visit my Twitter/X profile
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const copyToClipboard = (formData) => {
  const textToCopy = `
  Hey Andy, Love the site. I'm ${formData.name}.
  ${formData.message}.
  If you want to reach me by email: ${formData.email}
  `;

  const dummyElement = document.createElement("textarea");
  dummyElement.value = textToCopy;
  document.body.appendChild(dummyElement);
  dummyElement.select();
  document.execCommand("copy");
  document.body.removeChild(dummyElement);

  alert("Text copied to clipboard!");
};

export default ContactMeForm;
