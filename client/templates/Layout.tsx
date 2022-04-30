import { NextPage } from "next";
import ErrorAlert from "../components/common/ErrorAlert";
import Head from "../components/common/Head";
import Loading from "../components/common/Loading";
import NavBar from "../components/NavBar/NavBar";
import { UserProvider } from "../context/UserContext";
import useUser from "../hooks/useUser";
import getErrorMessage from "../utils/getErrorMessage";

interface LayoutProps {
  pageTitle: string;
  redirectTo?: string;
  redirectIfFound?: boolean;
}

const Layout: NextPage<LayoutProps> = ({
  pageTitle,
  redirectTo = "",
  redirectIfFound = false,
  children,
}) => {
  // Get user
  const { isLoading, isRefetching, user, isError, error } = useUser(
    redirectTo,
    redirectIfFound
  );

  // When user is loading, return loading screen
  if (isLoading || isRefetching) {
    return (
      <div className="flex h-screen">
        <div className="m-auto">
          <Loading />
        </div>
      </div>
    );
  }

  // Once user API request is completed, render page with user passed as a prop
  return (
    <UserProvider value={user}>
      <Head pageTitle={pageTitle}></Head>
      <div id="nav">
        <NavBar />
      </div>
      {isError && error && getErrorMessage(error).code >= 500 && (
        <div className="w-96 mx-auto mt-10">
          <ErrorAlert message={getErrorMessage(error).message} />
        </div>
      )}
      <div id="content" className="p-4">
        {children}
      </div>
    </UserProvider>
  );
};

export default Layout;
