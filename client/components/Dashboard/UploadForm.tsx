import { AxiosError } from "axios";
import { Field, Form, Formik, ErrorMessage, FormikHelpers } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useMutation } from "react-query";
import * as Yup from "yup";
import ApiClient from "../../utils/ApiClient";
import getErrorMessage from "../../utils/getErrorMessage";
import ErrorAlert from "../common/ErrorAlert";
import Title from "../common/Title";

// Types for upload form
interface UploadFormFields {
  title: string;
  file: File | null;
}

// Validates upload form
const UploadSchema = Yup.object().shape({
  title: Yup.string()
    .min(1, "Title must be atleast 1 character long")
    .max(100, "Title cannot be longer than 100 characters")
    .required(),
  file: Yup.mixed().required(),
});

// Upload form itself
const UploadForm: NextPage = () => {
  const [backendError, setBackendError] = useState<string | null>(null); // Stores any backend errors
  const [progress, setProgress] = useState<number | null>(null); // Progress bar for upload
  const router = useRouter(); // Used for redirects and reloads

  // Initial values for upload form
  const initialValues: UploadFormFields = {
    title: "",
    file: null,
  };

  // Upload backend API request
  const upload = useMutation(async (values: UploadFormFields) => {
    // Parse uploaded file and form data
    const fileData = new FormData();
    fileData.append("title", values.title);
    fileData.append("file", values.file!);
    // Make API request with parsed data
    try {
      await ApiClient.post("/upload", fileData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          // Updates upload progress
          const progress = (progressEvent.loaded / progressEvent.total) * 100;
          if (progress == 100) setProgress(null);
          else setProgress(progress);
        },
      });
      router.reload(); // Reload page on successful upload
    } catch (err) {
      setBackendError(getErrorMessage(err).message); // Set and display any backend errors to user
    }
  });

  function onSubmit(
    values: UploadFormFields,
    actions: FormikHelpers<UploadFormFields>
  ) {
    setBackendError(null); // Set backend errors to null on form submit
    upload.mutate(values); // Call upload API request
    actions.setSubmitting(false);
  }

  return (
    <div className="flex">
      <label htmlFor="my-modal-3" className="btn btn-success mx-auto">
        Upload File
      </label>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={UploadSchema}
          >
            {(formik) => {
              return (
                <Form encType="multipart/form-data">
                  <div className="space-y-2">
                    <div className="text-center">
                      <Title>Upload File</Title>
                      <p>
                        Note: Certain files will automatically be comparessed
                        and converted to ZIP to save storage space.
                      </p>
                    </div>
                    {backendError && <ErrorAlert message={backendError} />}
                    <div>
                      <label htmlFor="title">Title</label>
                      <Field
                        id="title"
                        name="title"
                        placeholder="Title"
                        className="input input-bordered w-full"
                      />
                      <div className="font-bold text-red-500">
                        <ErrorMessage name="title" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="file">File</label>
                      <div>
                        <input
                          id="file"
                          name="file"
                          type="file"
                          onChange={(event) => {
                            formik.setFieldValue(
                              "file",
                              event.currentTarget.files![0]
                            );
                          }}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-success w-full"
                      disabled={formik.isSubmitting}
                    >
                      Submit
                    </button>
                    {progress && (
                      <>
                        <p>Upload Progress</p>
                        <progress
                          className="progress progress-primary w-full"
                          value={progress || 0}
                          max="100"
                        ></progress>
                      </>
                    )}
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;
