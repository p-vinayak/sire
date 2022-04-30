import type { NextPage } from "next";
import React from "react";
import Box from "../components/common/Box";
import Layout from "../templates/Layout";

// Home page, general info
const Home: NextPage = () => {
  return (
    <Layout pageTitle="Login">
      <div className="my-10 w-1/3 mx-auto">
        <Box>
          <div className="space-y-4">
            <div>
              <p className="font-bold text-2xl text-center">Welcome to Sire!</p>
            </div>
            <div className="divider font-bold text-2xl text-center">About</div>
            <div className="p-2 space-y-3">
              <div>
                <p>
                  Sire is a simple, cloud-based, file-sharing service that
                  allows you to upload any kind of file with a share-able URL
                  that you can distribute everywhere! Curently, Sire supports
                  the following features:
                </p>
              </div>
              <div>
                <ul className="list-disc list-inside text-green-600">
                  <li>
                    Free-of-charge file uploads upto 1 GB of total storage.
                  </li>
                  <li>
                    Publically available, share-able URL for all of your files.
                  </li>
                  <li>
                    Serving static files such as images and PDFs, etc. and
                    providing downloadable URLs for other types of files.
                  </li>
                  <li>
                    Customized sub-domain for all your shared URLs. (e.g:
                    jsmith.sire.dev)
                  </li>
                </ul>
              </div>
            </div>
            <div className="divider font-bold text-2xl text-center">
              Contact
            </div>
            <div className="space-y-3 p-2">
              <p>
                Email:{" "}
                <a href="mailto:prataap.vinayak@gmail.com" className="link">
                  prataap.vinayak@gmail.com
                </a>
              </p>
              <p>Phone Number: +1 (123)-456-7890</p>
              <p>
                GitHub:{" "}
                <a href="https://github.com/p-vinayak" className="link">
                  p-vinayak
                </a>
              </p>
            </div>
          </div>
        </Box>
      </div>
    </Layout>
  );
};

export default Home;
