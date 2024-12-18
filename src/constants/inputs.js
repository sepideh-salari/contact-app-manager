import * as Yup from "yup";

const inputs = [
  {
    type: "text",
    name: "name",
    placeholder: "Enter your Name:",
    validation: Yup.string().required("First Name is required"),
  },
  {
    type: "text",
    name: "lastName",
    placeholder: "Enter your last name:",
    validation: Yup.string().required("Last Name is required"),
  },
  {
    type: "email",
    name: "email",
    placeholder: "Enter your email:",
    validation: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  },
  {
    type: "number",
    name: "phone",
    placeholder: "Enter your phone:",
    validation: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must be digits only")
      .required("Phone number is required"),
  },
];
export default inputs;
