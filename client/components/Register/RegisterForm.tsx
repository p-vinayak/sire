import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { NextPage } from "next";
import Button from "../common/Button";
import Title from "../common/Title";
import { useMutation } from "react-query";
import { useState } from "react";
import ErrorAlert from "../common/ErrorAlert";
import ApiClient from "../../utils/ApiClient";
import * as Yup from "yup";
import { useRouter } from "next/router";
import getErrorMessage from "../../utils/getErrorMessage";

// Types for registration form
interface RegisterFormFields {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
}

// Validates registration form
const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email.").required("Email is required."),
  username: Yup.string()
    .min(4, "Username too short.")
    .max(20, "Username too long.")
    .required("Username is required."),
  password: Yup.string()
    .min(6, "Password too short.")
    .max(128, "Password too long.")
    .required("Password is required."),
  passwordConfirm: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

// Registration form itself
const RegisterForm: NextPage = () => {
  const [backendError, setBackendError] = useState<string | null>(null); // Stores any backend errors
  const router = useRouter(); // Used for redirects and reloads

  // Calls backend API to register user
  const register = useMutation(async (values: RegisterFormFields) => {
    try {
      await ApiClient.post("/users", values);
      router.push({ pathname: "/login", query: { register: "success" } }); // Redirect to login page on successful registration
    } catch (err) {
      setBackendError(getErrorMessage(err).message); // Set any backend errors and display them on frontend
    }
  });

  // Executes on form submit
  function onSubmit(
    values: RegisterFormFields,
    actions: FormikHelpers<RegisterFormFields>
  ) {
    setBackendError(null); // Remove any backend errors when the form is submitted
    register.mutate(values); // Call register API
    actions.setSubmitting(false);
  }

  // Initial values for registration form
  const initialValues: RegisterFormFields = {
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <Title>Join Sire</Title>
      </div>
      <div>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={RegisterSchema}
        >
          <Form className="space-y-6">
            <div>
              <label htmlFor="email">Email</label>
              <Field
                id="email"
                name="email"
                placeholder="Email"
                className="input input-bordered w-full"
              />
              <div className="font-bold text-red-500">
                <ErrorMessage name="email" />
              </div>
            </div>
            <div>
              <label htmlFor="username">Username</label>
              <Field
                id="username"
                name="username"
                placeholder="Username"
                className="input input-bordered w-full"
              />
              <div className="font-bold text-red-500">
                <ErrorMessage name="username" />
              </div>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field
                id="password"
                name="password"
                placeholder="Password"
                type="password"
                className="input input-bordered w-full"
              />
              <div className="font-bold text-red-500">
                <ErrorMessage name="password" />
              </div>
            </div>
            <div>
              <label htmlFor="passwordConfirm">Password Confirm</label>
              <Field
                id="passwordConfirm"
                name="passwordConfirm"
                placeholder="Password Confirm"
                type="password"
                className="input input-bordered w-full"
              />
              <div className="font-bold text-red-500">
                <ErrorMessage name="passwordConfirm" />
              </div>
            </div>
            <div>
              <Button type="submit">Submit</Button>
            </div>
          </Form>
        </Formik>
      </div>
      {backendError && <ErrorAlert message={backendError} />}
    </div>
  );
};

export default RegisterForm;
