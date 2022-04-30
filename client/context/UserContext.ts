import { createContext } from "react";

export interface UserData {
  id: string;
  email: string;
  username: string;
  storageUsed: string;
  storageAllocated: string;
}

// Used for context state management of user data throughout the app
const UserContext = createContext<UserData | null>(null);
export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;

export default UserContext;
