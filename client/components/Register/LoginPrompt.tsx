import { NextPage } from "next";
import Link from "../common/Link";

// Handles redirect to login page
const LoginPrompt: NextPage = () => {
  return (
    <p className="font-bold text-lg">
      Already have an account? <Link text="Login here." href="/login" />
    </p>
  );
};

export default LoginPrompt;
