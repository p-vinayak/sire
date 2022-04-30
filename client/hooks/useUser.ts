import axios, { AxiosError, AxiosResponse } from "axios";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { UserData } from "../context/UserContext";
import ApiClient from "../utils/ApiClient";

// Fetches user profile from backend API. Also used to check whether user is authenticated or not.
const useUser = (redirectTo: string = "", redirectIfFound: boolean = false) => {
  const [user, setUser] = useState<UserData | null>(null); // Initialize user state

  // API query to fetch user profile from backend
  const { isLoading, isRefetching, error, isError, status } = useQuery(
    "me",
    async () => {
      try {
        const res = await ApiClient.get("/users/me");
        setUser(res.data);
      } catch (err) {
        setUser(null);
      }
    },
    {
      refetchOnMount: true,
      refetchOnReconnect: true,
      staleTime: 0,
    }
  );

  // Executes on page load
  useEffect(() => {
    // Don't do anything if the API request is loading or we don't need to redirect on unauthenticated request
    if (!redirectTo) return;
    if (isLoading || isRefetching) return;

    // If redirection is required on unauthenticated user, redirect to desired location
    if (
      (redirectTo && !redirectIfFound && !user) ||
      (redirectIfFound && user)
    ) {
      Router.push(redirectTo);
    }
  }, [
    isLoading,
    user,
    redirectTo,
    redirectIfFound,
    isRefetching,
    isError,
    error,
    status,
  ]);

  // Return userful variables
  return { isLoading, isRefetching, isError, error, user, status };
};

export default useUser;
