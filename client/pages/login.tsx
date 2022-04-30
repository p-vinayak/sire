import { NextPage } from "next";
import Box from "../components/common/Box";
import LoginForm from "../components/Login/LoginForm";
import RegisterPrompt from "../components/Login/RegisterPrompt";
import Layout from "../templates/Layout";

// Login page
const Login: NextPage = () => {
  return (
    <Layout pageTitle="Login" redirectTo="/dashboard" redirectIfFound={true}>
      <div className="my-10 w-96 mx-auto space-y-3">
        <Box>
          <div>
            <LoginForm />
          </div>
        </Box>
        <Box>
          <div className="text-center">
            <RegisterPrompt />
          </div>
        </Box>
      </div>
    </Layout>
  );
};

export default Login;
