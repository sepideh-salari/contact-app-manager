import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "../Styles/ContactForm.module.css";
const ContactForm = ({ initialValues, buttonLabel, onSubmit }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^\d+$/, "Phone must be numeric")
      .min(10, "Phone number must be at least 10 digits")
      .required("Phone is required"),
  });
  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values);
    resetForm();
  };
  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.inputGroup}>
            <div>
              <label>
                Name
                <Field name="name" />
              </label>
              <ErrorMessage name="name" component="div" />
            </div>
            <div>
              <label>
                Last Name
                <Field name="lastName" />
              </label>
              <ErrorMessage name="lastName" component="div" />
            </div>
            <div>
              <label>
                Email
                <Field name="email" type="email" />
              </label>
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <label>
                Phone
                <Field name="phone" />
              </label>
              <ErrorMessage name="phone" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {buttonLabel || "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;
