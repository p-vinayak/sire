import axios, { AxiosError, AxiosResponse } from "axios";
import { NextPage } from "next";
import { useState } from "react";
import { useQuery, useMutation } from "react-query";
import ApiClient from "../../utils/ApiClient";
import { FileIcon } from "react-file-icon";
import Link from "../common/Link";
import { UserConsumer } from "../../context/UserContext";
import filesize from "filesize";
import { useRouter } from "next/router";

// General information about the files that we will get from the API
export interface FileMeta {
  id: string;
  name: string;
  mime: string;
  size: number;
  title: string;
  created_at: string;
}

// Files owned by user
const Files: NextPage = () => {
  const [files, setFiles] = useState<FileMeta[]>(new Array<FileMeta>()); // Used to store file data
  const [backendError, setBackEndError] = useState<string | null>(null); // Stores any backend errors
  const router = useRouter(); // Used for redirects and reloads

  // API request to fetch all files owned by a user
  const { refetch } = useQuery<
    unknown,
    Error | AxiosError,
    AxiosResponse<FileMeta[]>
  >("files", () => ApiClient.get("/files"), {
    onError: async () => {
      setFiles([]); // Set files array to empty on any error
    },
    onSuccess: async (response) => {
      setFiles([...response.data]); // Store API response in file array
    },
    refetchOnMount: true,
    refetchOnReconnect: true,
    staleTime: 0,
  });

  // API request to delete a file
  const DeleteFile = useMutation<
    unknown,
    Error | AxiosError,
    { id: string },
    unknown
  >((values) => ApiClient.delete(`/files/${values.id}`), {
    onError: async (error) => {
      router.reload(); // Reload page if there was any error in deletion
    },
    onSuccess: async (data) => {
      router.reload(); // Reload page on successful delete
    },
  });

  return (
    <div>
      <UserConsumer>
        {(user) => (
          <ul className="space-y-4">
            {files.map((file, index) => {
              return (
                <li key={index}>
                  <div className="flex items-stretch h-14 space-x-2 bg-base-100 p-2 shadow-md rounded-md">
                    <div className="w-8 my-auto">
                      <FileIcon extension={file.name.split(".").pop()} />
                    </div>
                    <div className="my-auto w-1/2 text-xl truncate ...">
                      <Link
                        href={`http://${user?.username}.${process.env.NEXT_PUBLIC_BASE_URL}/${file.name}`}
                        text={file.title}
                        target="_blank"
                      />
                    </div>
                    <div className="my-auto text-right w-1/2 font-bold space-x-2 flex flex-row justify-end">
                      <div>{filesize(file.size)}</div>
                      <div className="dropdown dropdown-end">
                        <button tabIndex={index}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block w-5 h-5 stroke-current"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                            ></path>
                          </svg>
                        </button>
                        <ul
                          tabIndex={index}
                          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                        >
                          <li>
                            <a
                              className="text-red-700"
                              onClick={() => DeleteFile.mutate({ id: file.id })}
                            >
                              Delete
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </UserConsumer>
    </div>
  );
};

export default Files;
