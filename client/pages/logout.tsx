import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMutation } from "react-query";
import Loading from "../components/common/Loading";
import ApiClient from "../utils/ApiClient";

// Logs user out and redirects to login page
const Logout: NextPage = () => {
  const router = useRouter();

  const logout = useMutation(
    async () => await ApiClient.post("/auth/logout", {}),
    {
      onSettled: async () => {
        router.push({ pathname: "/login" });
      },
    }
  );

  useEffect(() => {
    logout.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <Loading />
      </div>
    </div>
  );
};

export default Logout;
