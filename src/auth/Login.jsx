import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { User } from "../context/UserContext";
import Header from "../components/header/Header";

export default function Login () {
    const [accept, setAccept] = useState(false);
    const [error, setError] = useState(false);
    const [userData, setUserData] = useState({
        email: "",  
        password: "",
    });
    const navigate = useNavigate();
        //cookie
        const cookie = new Cookies();
    const user= useContext(User);
    async function Submit (e) {
        e.preventDefault();
        setUserData((state)=> ({...state, accept: true}));
        try {
            let res = await axios.post("http://127.0.0.1:8000/api/login", userData);
            const token = res.data.data.token; 
            cookie.set("Bearer", token); 
            const userDetails = res.data.data.user;
            user.setAuth({ userDetails});
            navigate("/dashboard");
        } catch (error) {
            if (error.response && error.response.status === 401 ) {
                setError(true);
            }
            setAccept(true);
        }
    }
    return (
        <>
        <Header/>
        <div className="parent">
        <div className="register">
            <form  onSubmit={Submit}>
                    <label htmlFor="email">Email:</label>
                    <input 
                        id="email" 
                        type="email" 
                        placeholder="Email..." 
                        required value={userData.email} 
                        onChange={(e) => setUserData((state) => ({ ...state, email: e.target.value }))}
                        />
                    <label htmlFor="password">Password:</label>
                    <input 
                        id="password" 
                        type="password" 
                        placeholder="Password..." 
                        value={userData.password} 
                        onChange={(e) => setUserData((state) => ({ ...state, password: e.target.value }))}
                        />
                    {userData.password?.length < 8 && accept && (<p className="error">Password must be more than 8 charaters</p>)}

                    <div style={{textAlign:"center"}}>
                        <button type="submit">Log in</button>
                    </div>
                    {accept && error === 401 && <p className="error" >Wrong password or emial </p>}
                </form>
        </div>
        </div>
        </>
    )
}