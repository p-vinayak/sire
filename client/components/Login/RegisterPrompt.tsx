import { NextPage } from "next";
import Link from "../common/Link";

// Handles redirect to register page
const RegisterPrompt: NextPage = () => {
  return (
    <p className="font-bold text-lg">
      New to Sire? <Link text="Register here." href="/register" />
    </p>
  );
};

export default RegisterPrompt;
