import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { User } from "../context/UserContext";
import axios from "axios";
import Cookies from "universal-cookie"
import Loading from "../components/loading/Loading";
export default function PersistLogin () {
    //get current user
    const context = useContext(User);
    // const token = context.auth.token;

    const [loading, setLoading] = useState(true);
    //cookie 
    const cookie = new Cookies();
    const getToken = cookie.get("Bearer");
    //send refreash token
    useEffect(()=> {
        async function refresh () {
            try {
                await axios.post(`http://127.0.0.1:8000/api/refresh`, null, {
                    headers: {
                        Authorization: "Bearer " + getToken,
                    },
                }).then((data)=> {
                    const tokenCookie = data.data.token;
                    // setLoading(false);
                    console.log(data)
                    // cookie.remove("Bearer");
                    // cookie.set("Bearer", tokenCookie);
                    context.setAuth({ tokenCookie,userDetails: data.data.user});
            })
            } catch(error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }
        // refresh ()
        !getToken ? refresh() : setLoading(false);
    },[]);

    return loading? <Loading/> : <Outlet/> ;
}