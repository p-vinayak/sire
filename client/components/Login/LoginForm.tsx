import * as React from "react";
import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik";
import Button from "../common/Button";
import Title from "../common/Title";
import { NextPage } from "next";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import ErrorAlert from "../common/ErrorAlert";
import ApiClient from "../../utils/ApiClient";
import { useRouter } from "next/router";
import SuccessAlert from "../common/SuccessAlert";
import getErrorMessage from "../../utils/getErrorMessage";

// Login form types
interface LoginFormFields {
  email: string;
  password: string;
}

// Validates login form
const LoginSchema = Yup.object().shape({
  email: Yup.string().required(),
  password: Yup.string().required(),
});

// Login form itself
const LoginForm: NextPage = () => {
  const [backendError, setBackendError] = useState<string | null>(null); // Stores any backend errors
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Success message for any redirects
  const router = useRouter(); // Router for reloads and redirects

  // Executes on load
  useEffect(() => {
    // Shows message if we've just arrived from the registration page
    if (router.query.register === "success")
      setSuccessMessage("Registration successful. Please login.");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Login API request
  const login = useMutation(async (values: LoginFormFields) => {
    try {
      const res = await ApiClient.post("/auth/login", values);
      router.push("/dashboard"); // Redirect to dashboard on successful login
    } catch (err) {
      setBackendError(getErrorMessage(err).message); // Set and display any backend errors to user
    }
  });

  // Initial values for login form
  const initialValues: LoginFormFields = {
    email: "",
    password: "",
  };

  // Executes on form submit
  function onSubmit(
    values: LoginFormFields,
    actions: FormikHelpers<LoginFormFields>
  ) {
    setBackendError(null); // Remove any backend errors on form submit
    login.mutate(values); // Call login API request
    actions.setSubmitting(false);
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <Title>Login to Sire</Title>
      </div>
      <div>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={LoginSchema}
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
            </div>
            <div>
              <Button type="submit">Submit</Button>
            </div>
          </Form>
        </Formik>
      </div>
      {backendError && <ErrorAlert message={backendError} />}
      {successMessage && <SuccessAlert message={successMessage} />}
    </div>
  );
};

export default LoginForm;
