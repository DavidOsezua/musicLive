import React, { useState } from "react";
import styles from "./ContactUs.module.css";
import Button from "../../components/general/Button";
import Modal from "../../components/general/Modal";
import Success from "../../components/general/Success";
import Failed from "../../components/general/Failed";
import { useModal } from "../../App";
import { SubmitContactinfo } from "./router";

const ContactUs = () => {
  const { modal, modalHandler } = useModal();
  const [message, setMessage] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!contact.name.trim()) newErrors.name = "Required";
    if (!contact.email.trim()) newErrors.email = "Required";
    if (!contact.description.trim()) newErrors.description = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmitform = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Prevent submission if validation fails
    }

    const contactInfo = { ...contact };
    try {
      const response = await SubmitContactinfo(JSON.stringify(contactInfo));
      setIsSubmitted(true);
      setMessage(response.data.message);
      modalHandler();
    } catch (err) {
      setIsSubmitted(false);
      setMessage(err.response?.data?.detail || "Submission failed.");
      modalHandler();
    }
  };

  return (
    <>
      <section className={`section transition`}>
        <div className={`sectionContainer`}>
          <div className={`${styles.formContainer}`}>
            <h1 className={`${styles.title}`}>GET IN TOUCH</h1>
            <form className={`${styles.form}`} onSubmit={handleSubmitform}>
              {/* Name Input */}
              <div className={`${styles.inputGroup}`}>
                {errors.name && (
                  <p className={styles.errorText}>{errors.name}</p>
                )}
                <input
                  placeholder="Enter your name (Required)"
                  className={`${styles.input} ${
                    errors.name ? styles.errorInput : ""
                  }`}
                  value={contact.name}
                  onChange={(e) =>
                    setContact({ ...contact, name: e.target.value })
                  }
                />
              </div>

              {/* Email Input */}
              <div className={`${styles.inputContainer}`}>
                <div className="w-full">
                  {errors.email && (
                    <p className={styles.errorText}>{errors.email}</p>
                  )}
                  <input
                    placeholder="Email (Required)"
                    className={`${styles.input} ${
                      errors.email ? styles.errorInput : ""
                    }`}
                    value={contact.email}
                    onChange={(e) =>
                      setContact({ ...contact, email: e.target.value })
                    }
                  />
                </div>

                {/* Phone Input */}
                <input
                  placeholder="Phone (Optional)"
                  className={`${styles.input}`}
                  value={contact.phone}
                  onChange={(e) =>
                    setContact({ ...contact, phone: e.target.value })
                  }
                />
              </div>

              {/* Description Input */}
              <div>
                {errors.description && (
                  <p className={styles.errorText}>{errors.description}</p>
                )}
                <textarea
                  placeholder="Description (Required)"
                  className={`${styles.textArea} ${
                    errors.description ? styles.errorInput : ""
                  }`}
                  value={contact.description}
                  onChange={(e) =>
                    setContact({ ...contact, description: e.target.value })
                  }
                />
              </div>

              <Button text="Send" width="w-full" colored radius="rounded-sm" />
            </form>
          </div>
        </div>

        {modal && (
          <Modal>
            {isSubmitted ? (
              <Success
                modalHandler={modalHandler}
                message={message}
                description="Your email has been received. Thank you for reaching out to us!"
              />
            ) : (
              <Failed modalHandler={modalHandler} message={message} />
            )}
          </Modal>
        )}
      </section>
    </>
  );
};

export default ContactUs;
