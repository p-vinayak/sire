import type { NextPage } from "next";
import React from "react";
import Box from "../components/common/Box";
import Layout from "../templates/Layout";

// Terms of Service page
const TOS: NextPage = () => {
  return (
    <Layout pageTitle="Terms of Service">
      <div className="my-10 w-1/3 mx-auto">
        <Box>
          <div className="space-y-4">
            <div>
              <p className="font-bold text-2xl text-center">Terms of Service</p>
              <div className="p-2 space-y-3">
                <p>
                  Sire is an upload service designed for user convenience, and
                  reserves the right to uphold and amend these policies at any
                  time. This is not an exhaustive list of policies, and we
                  reserve the action to deliberate on, and take action against
                  users, their accounts, and the material uploaded, at any time,
                  and without warning or discourse.
                </p>
              </div>
            </div>
            <div className="divider font-bold text-2xl text-center">
              Responsibility
            </div>
            <div className="p-2 space-y-3">
              <div>
                <p>
                  Files uploaded to the service remain the property of their
                  original owner. The uploaded file will reside on an Sire
                  server, under the care of the user, and remains the
                  uploader&apos;s responsibility. Sire is not responsible for
                  the policing of uploads.
                </p>
              </div>
            </div>
            <div className="divider font-bold text-2xl text-center">
              Copyright
            </div>
            <div className="p-2 space-y-3">
              <p>
                If a file uploaded falls under a current, legal copyright. The
                owner of those copyrights may submit proof of their ownership to
                us in order to request a takedown of their property to
                prataap.vinayak@gmail.com. We reserve the right to deliberate on
                takedown matters.
              </p>
            </div>
            <div className="divider font-bold text-2xl text-center">Abuse</div>
            <div className="p-2 space-y-3">
              <p>
                Any attempt to exploit, damage or otherwise harm Sire will
                result in immediate termination.
              </p>
            </div>
            <div className="divider font-bold text-2xl text-center">
              Termination
            </div>
            <div className="p-2 space-y-3">
              <p>
                Abuse of our services are grounds for immediate termination, at
                the discretion of Sire staff. We reserve the right to terminate
                a user&apos;s account at any time, and do not owe explanation or
                discourse to the user.
              </p>
            </div>
          </div>
        </Box>
      </div>
    </Layout>
  );
};

export default TOS;
