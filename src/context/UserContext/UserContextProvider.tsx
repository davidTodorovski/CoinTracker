import { useState } from "react";
import { UserContext } from "./UserContext";

export type UserContextType = {
  user: boolean;
  userAvatar: string;
  setUserHandler: (value: boolean) => void;
  setUserAvatarHandler: (value: string) => void;
};

interface Props {
  children: React.ReactNode;
}

const isUserSingedIn = localStorage.getItem("isUserSingedIn");
const userAvatarLS = localStorage.getItem("userAvatar");

const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState(!!isUserSingedIn || false);
  const [userAvatar, setUserAvatar] = useState(userAvatarLS || "");

  const setUserHandler = (value: boolean) => {
    setUser(value);
  };

  const setUserAvatarHandler = (value: string) => {
    setUserAvatar(value);
  };

  const values = {
    user,
    userAvatar,
    setUserHandler,
    setUserAvatarHandler,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
