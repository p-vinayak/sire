import axios, { AxiosError } from "axios";

// Takes errors from API request and parses them into UI friendly format
export default function getErrorMessage(error: unknown) {
  // Handle axios errors
  if (axios.isAxiosError(error)) {
    if (error.response)
      return {
        code: error.response.status,
        message: error.response.data.details || error.response.data.error,
      };
  }
  // Handle any other errors
  return {
    code: 500,
    message: "Something went wrong, please contact the administrator",
  };
}
