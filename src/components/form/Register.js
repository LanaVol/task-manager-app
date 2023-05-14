import { React } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

export const SignupForm = () => {
  return (
    <Formik
      initialValues={{ firstName: "", lastName: "", email: "" }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string()
          .matches(/^[A-Za-zА-Яа-я]+$/, "Only letters are allowed")
          .min(2, "Too short!")
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        lastName: Yup.string()
          .matches(/^[A-Za-zА-Яа-я]+$/, "Only letters are allowed")
          .min(2, "Too short!")
          .max(20, "Must be 20 characters or less")
          .required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form>
        <div>
          <label htmlFor="firstName">First Name</label>
          <Field name="firstName" type="text" placeholder="Jane" />
          <ErrorMessage name="firstName" />
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <Field name="lastName" type="text" />
          <ErrorMessage name="lastName" />
        </div>

        <div>
          <label htmlFor="email">Email Address</label>
          <Field name="email" type="email" />
          <ErrorMessage name="email" />
        </div>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};
