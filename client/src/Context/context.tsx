import axios from "axios";
import { useContext, createContext, ReactNode, useState } from "react";
import Exporting from "../CONFIG";
let { env } = Exporting;
import { SetStateAction, Dispatch } from "react";
//verifcation of some variables that comes from dot env
Object.entries(env).forEach(([key, value]) => {
  if (value === undefined) {
    return console.log(`this one is undefined ${key}`);
  }
});
//typing argument function
type flag =
  | "login-public"
  | "register-public"
  | "login-admin"
  | "register-admin"
  | "post-shop"
  | "update-shop"
  | "update-admin"
  | "update-login";

//typing context variables
interface RecivedData {
  message?: string;
  token?: string;
}

interface VariablesAndFunctions {
  post: (
    data: object,
    flag: flag
  ) => Promise<Promise<void | string | RecivedData>>;
  StoreToken: (Token: string) => void;
  isError: string;
  isSuccess: string;
  ClearMessages: () => void;
  SetIsError: Dispatch<SetStateAction<string>>;
  SetIsSuccess: Dispatch<SetStateAction<string>>;
}

const Context = createContext<VariablesAndFunctions | undefined>(undefined);

export const useContexts = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useContexts must be used within a ContextProvider");
  }
  return context;
};

interface ContextProviderProps {
  children: ReactNode;
}

function ContextProvider({ children }: ContextProviderProps) {
  //variables
  let URI = env.VITE_APP_HOST || env.VITE_APP_LOCAL;
  let [isError, SetIsError] = useState("");
  let [isSuccess, SetIsSuccess] = useState("");
  //async functions
  // posting data function
  const post = async (
    data: object,
    flag: flag
  ): Promise<Promise<void | string | RecivedData>> => {
    switch (flag) {
      //admin login requeest
      case "login-admin":
        try {
          const pending = await axios.post<RecivedData>(
            URI + "admin/login",
            data
          );

          if (!pending) {
            return alert("didn't recived the data check your code");
          }
          if (pending.data.message == "success") {
            return pending.data;
          }
          if (pending.data.message != "success") {
            return pending.data;
          }
          return "intern server error";
        } catch (error) {
          throw error;
        }
      //public login request
      case "login-public":
        try {
          const pending = await axios.post<RecivedData>(
            URI + "/public/login",
            data
          );
          if (!pending) {
            return alert("didn't recived the data check your code");
          }
          if (pending) {
            return pending.data;
          }

          return "intern server error";
        } catch (error) {
          throw error;
        }
      //admin-register

      case "register-admin":
        try {
          interface RecivedData {
            message: string;
            token: string;
          }
          const pending = await axios.post<RecivedData>(
            URI + "admin/new",
            data
          );

          if (!pending) {
            return alert("didn't recived the data check your code");
          }
          if (pending.data.message == "success") {
            return pending.data;
          }
          if (pending.data.message && pending.data.message != "success") {
            return pending.data;
          }
          return "intern server error";
        } catch (error) {
          throw error;
        }
      //public register
      case "register-public":
        try {
          interface RecivedData {
            message: string;
            token: string;
          }
          const pending = await axios.post<RecivedData>(
            URI + "admin/new",
            data
          );
          if (!pending) {
            return alert("didn't recived the data check your code");
          }
          if (pending.data.message == "success") {
            return pending.data;
          }
          return "intern server error";
        } catch (error) {
          throw error;
        }
      default:
        "your request doesn't work ";
        break;
    }
  };
  //normal functions
  //storing a token in the local storage
  function StoreToken(Token: string) {
    window.localStorage.setItem("token", Token);
  }

  const value: VariablesAndFunctions = {
    post,
    StoreToken,
    isError,
    isSuccess,
    ClearMessages,
    SetIsError,
    SetIsSuccess,
  };
  //clearing the states that carry the error and success state messages
  function ClearMessages() {
    SetIsError("");
    SetIsSuccess("");
  }
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default ContextProvider;
