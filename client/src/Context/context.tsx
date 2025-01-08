import axios from "axios";
import {
  useContext,
  createContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
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

type flagTypeGetArrayElements = "get-shop-details" | "get-shops";
type flagTypeGetUniqueElement = "get-unique-shop-details";

//typing context variables
//categories variables
type FoodElemnt = {
  n: string;
  _id: string;
  v: number;
  ct: string;
  o: number;
  i: string;
  p: number;
};
interface CategoriesType {
  l: FoodElemnt[];
  _id: string;
  n: string;
  i: string;
  o: Number;
}
interface RecivedData {
  message?: string | void;
  token?: string | void;
}
interface data {
  message?: string | void;
  data?: Array<items> | void;
}
interface dataUnique {
  message?: string | void;
  data?: itemsUniqueShop | void;
}
interface items {
  ct: CategoriesType[];
  n: string;
  op: object[];
  cu: string[];
  t: number;
  busy: boolean;
  rv: number;
  se: any;
  sc: any;
  nm: string;
  ad: string;
  cc: string;
  loc: object;
  rd: number;
  rt: number;
  ofr: number;
  cs: number;
}

interface itemsUniqueShop {
  ct: CategoriesType[];
  n: string;
  ad: string;
  rt: number;
  i: string;
}

interface VariablesAndFunctions {
  AddToCart: (
    argument: itemsInCartArray
  ) => void | React.MutableRefObject<null>;
  DeleteFromCart: (argument: string) => void;
  Change: (
    element: React.MutableRefObject<Record<string, HTMLInputElement | null>>,
    name: string
  ) => void;
  post: (
    data: object,
    flag: flag
  ) => Promise<Promise<void | string | RecivedData>>;
  getArrayElements: (
    flag: flagTypeGetArrayElements,
    id?: string
  ) => Promise<Promise<void | string | data>>;
  getUniqueElement: (
    flag: flagTypeGetUniqueElement,
    id?: string
  ) => Promise<dataUnique | void | string>;
  StoreToken: (Token: string) => void;
  isError: string;
  isSuccess: string;
  isLoading: boolean;
  isCartOpen: boolean;
  set: string;
  total: number;
  CartElement: itemsInCartArray[] | undefined;
  ClearMessages: () => void;
  Total: () => void;
  SetIsError: Dispatch<SetStateAction<string>>;
  setTotal: Dispatch<SetStateAction<number>>;
  SetIsSuccess: Dispatch<SetStateAction<string>>;
  SetIsLoading: Dispatch<SetStateAction<boolean>>;
  setSrc: Dispatch<SetStateAction<string>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setCartelment: Dispatch<SetStateAction<itemsInCartArray[] | undefined>>;
  Categories: object[];
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
interface itemsInCartArray {
  n: string;
  p: number;
  qte: number;
}
function ContextProvider({ children }: ContextProviderProps) {
  //variables
  let URI = env.VITE_APP_LOCAL;
  let [isError, SetIsError] = useState("");
  let [isSuccess, SetIsSuccess] = useState("");
  let [isLoading, SetIsLoading] = useState(false);
  let [isCartOpen, setIsOpen] = useState(false);
  let [set, setSrc] = useState("");
  let [CartElement, setCartelment] = useState<itemsInCartArray[]>();
  let [total, setTotal] = useState<number>(0);
  console.log(CartElement);

  //categories
  let Categories = [
    {
      path: "/burger.png",
      text: "Burger",
    },
    {
      path: "/pizza.png",
      text: "Pizza",
    },
    {
      path: "/breakfast.png",
      text: "Breakfast",
    },
    {
      path: "/barbecue.png",
      text: "BBQ",
    },
    {
      path: "/croissant.png",
      text: "Pastry",
    },
    {
      path: "/drink.png",
      text: "Drinks",
    },
  ];
  useEffect(() => {
    Total();
  }, [CartElement]);
  //async functions
  // posting data function
  const post = async (
    data: object,
    flag: flag
  ): Promise<Promise<void | string | void | RecivedData>> => {
    switch (flag) {
      //admin login requeest
      case "login-admin":
        try {
          SetIsLoading(true);
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
            message: string | void;
            token: string | void;
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
            message: string | void;
            token: string | void;
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

  //getting data function and deleting function
  //typing flag
  //getting an arrays data
  const getArrayElements = async (
    flag: flagTypeGetArrayElements
  ): Promise<Promise<void | string | data>> => {
    switch (flag) {
      case "get-shop-details":
        try {
          SetIsLoading(true);
          const pending = await axios.get<data>(URI + "shop/shops-details");
          if (!pending) {
            SetIsLoading(false);
            return alert("didn't recived the data check your code");
          }
          if (pending.data.message == "success") {
            SetIsLoading(false);
            return pending.data;
          }
          if (pending.data.message && pending.data.message.includes("error")) {
            SetIsLoading(false);
            return pending.data.message;
          }
          return "intern server error";
        } catch (error) {
          throw error;
        }
    }
  };
  //getting an unique data
  const getUniqueElement = async (
    flag: flagTypeGetUniqueElement,
    id?: string
  ) => {
    switch (flag) {
      case "get-unique-shop-details":
        try {
          if (!id) {
            return "need the id to do this operation";
          }
          SetIsLoading(true);
          const pending = await axios.get<dataUnique>(
            URI + `shop/unique/${id}`
          );

          if (!pending) {
            // SetIsLoading(false)
            return alert("didn't recived the data check your code");
          }
          if (pending && pending.data.message == "success") {
            console.log("fetching error " + pending);
            // SetIsLoading(false)
            return pending.data;
          }
          if (pending && pending.data.message?.includes("error")) {
            // SetIsLoading(false)
            return pending.data.message;
          }
        } catch (error) {
          throw error;
        }
    }
  };

  //normal functions
  //storing a token in the local storage
  function StoreToken(Token: string) {
    window.localStorage.setItem("token", Token);
  }
  //adding item in  cart array
  const AddToCart = (argument: itemsInCartArray): void => {
    let tmp = CartElement ? [...CartElement] : [];
    for (let element of tmp) {
      if (element.n == argument.n) {
        return;
      }
      continue;
    }
    if (argument.n.length > 1 && argument.p > 0 && argument.qte >= 1) {
      setCartelment([...tmp, argument]);
      Total();
      return;
    }
    return alert("there is an error in the AddToCart");
  };
  const DeleteFromCart = (argument: string) => {
    let tmp = CartElement ? [...CartElement] : [];
    tmp = tmp.filter((e) => e.n != argument);

    setCartelment(tmp);
    Total();
    return;
  };
  //total item calculating
  const Total = () => {
    let total = 0;
    if (CartElement) {
      CartElement.map((e) => {
        total += e.p * e.qte;
      });
      setTotal(total);
    }
  };
  //onChange function
  const Change = (
    element: React.MutableRefObject<Record<string, HTMLInputElement | null>>,
    name: string
  ) => {
    let refelem = element.current ? element.current[name] : null;
    let tmp = CartElement ? [...CartElement] : [];
    if (refelem) {
      tmp.forEach((ele) => {
        if (ele.n == name) {
          ele.qte = parseInt(refelem.value);
        }
      });
      setCartelment(tmp);
      return;
    }
  };

  const value: VariablesAndFunctions = {
    post,
    getArrayElements,
    getUniqueElement,
    StoreToken,
    DeleteFromCart,
    Total,
    total,
    isError,
    isSuccess,
    set,
    isLoading,
    Categories,
    isCartOpen,
    CartElement,
    setSrc,
    Change,
    AddToCart,
    ClearMessages,
    setTotal,
    SetIsError,
    SetIsSuccess,
    setCartelment,
    SetIsLoading,
    setIsOpen,
  };
  //clearing the states that carry the error and success state messages
  function ClearMessages() {
    SetIsError("");
    SetIsSuccess("");
  }
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default ContextProvider;
