import { NextPage } from "next";
import React from "react";
import Box from "../components/common/Box";
import Files from "../components/Dashboard/Files";
import StorageInformation from "../components/Dashboard/StorageInformation";
import UploadForm from "../components/Dashboard/UploadForm";
import Layout from "../templates/Layout";

// Dashboard
const Dashboard: NextPage = () => {
  return (
    <Layout pageTitle="Dashboard" redirectTo="/login" redirectIfFound={false}>
      <div className="my-10 w-96 lg:w-1/3 mx-auto space-y-3">
        <div>
          <Box>
            <UploadForm />
          </Box>
        </div>
        <div className="max-h-96 overflow-y-auto">
          <Box>
            <Files />
          </Box>
        </div>
        <div>
          <Box>
            <StorageInformation />
          </Box>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
