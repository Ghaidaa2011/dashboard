/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import Cookies from "universal-cookie";

export const User = createContext({});

const cookie = new Cookies();
const tokenCookie = cookie.get("Bearer");

export default function UserProvider ({children}) {
    const [auth, setAuth] = useState({token : tokenCookie ? tokenCookie : null});
    return <User.Provider value={{auth, setAuth}}>{children}</User.Provider>
}