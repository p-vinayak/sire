import { NextPage } from "next";
import Box from "../components/common/Box";
import LoginPrompt from "../components/Register/LoginPrompt";
import RegisterForm from "../components/Register/RegisterForm";
import Layout from "../templates/Layout";

// Register page
const Register: NextPage = () => {
  return (
    <Layout pageTitle="Register" redirectTo="/dashboard" redirectIfFound={true}>
      <div className="my-10 w-96 mx-auto space-y-3">
        <Box>
          <div>
            <RegisterForm />
          </div>
        </Box>
        <Box>
          <div className="text-center">
            <LoginPrompt />
          </div>
        </Box>
      </div>
    </Layout>
  );
};

export default Register;
