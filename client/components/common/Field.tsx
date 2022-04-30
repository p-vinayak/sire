import { NextPage } from "next";
import { ErrorMessage, Field as FormikField } from "formik";

interface FieldProps {
  id: string;
  name: string;
  placeholder: string;
  label: string;
}

// Re-usable form field
const Field: NextPage<FieldProps> = ({ id, name, placeholder, label }) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <FormikField
        id={id}
        name={name}
        placeholder={placeholder}
        className="input input-bordered w-full"
      />
      <div className="font-bold text-red-500">
        <ErrorMessage name={id} />
      </div>
    </div>
  );
};

export default Field;
