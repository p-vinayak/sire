import { NextPage } from "next";
import { UserConsumer } from "../../context/UserContext";
import filesize from "filesize";
import Loading from "../common/Loading";

// Calculates storage information
const StorageInformation: NextPage = () => {
  return (
    <UserConsumer>
      {(user) => {
        if (!user) return <Loading />;
        const { storageAllocated, storageUsed } = user!; // Get storage information from user data
        // Calculate storage used as a percent
        const storagedUsedPercent = Math.round(
          (Number(storageUsed) / Number(storageAllocated)) * 100
        );
        // Show storage information
        return (
          <>
            <div>
              Storage Used -{" "}
              {`${filesize(Number(storageUsed))} out of ${filesize(
                Number(storageAllocated)
              )}`}{" "}
              - {storagedUsedPercent}%
            </div>
            <progress
              className="bg-base-100 progress progress-success w-full"
              value={storagedUsedPercent}
              max="100"
            ></progress>{" "}
          </>
        );
      }}
    </UserConsumer>
  );
};

export default StorageInformation;
