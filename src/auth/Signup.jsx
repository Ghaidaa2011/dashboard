import { useContext,  useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { User } from "../context/UserContext";
import Header from "../components/header/Header";
export default function Signup () {
    const [accept, setAccept] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation:"",
    });
    const navigate = useNavigate();
    const cookie = new Cookies();
    const user= useContext(User);
    async function Submit (e) {
        e.preventDefault();
        setAccept(true);
        try {
            let res = await axios.post("http://127.0.0.1:8000/api/register",
            userData);
            const token = res.data.data.token;
            cookie.set("Bearer", token);
            const userDetails = res.data.data.user;
            user.setAuth({ userDetails});
            navigate("/dashboard"); 
            console.log(res)
        } catch (error) { 
            if (error.response && error.response.status === 422) {
                setEmailError(true);
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
                    <label htmlFor="name">Name:</label>
                    <input
                        id="name" 
                        type="text" 
                        placeholder="name..." 
                        value={userData.name} 
                        onChange={(e) => setUserData((state) => ({ ...state, name: e.target.value }))}
                        />
                    {userData.name === "" && accept && <p className="error">Name is required</p>}

                    <label htmlFor="email">Email:</label>
                    <input 
                        id="email" 
                        type="email" 
                        placeholder="Email..." 
                        required value={userData.email} 
                        onChange={(e) => setUserData((state) => ({ ...state, email: e.target.value }))}
                        />
                    {accept && emailError === 422 && <p className="error" >Emial is already been taken</p>}

                    <label htmlFor="password">Password:</label>
                    <input 
                        id="password" 
                        type="password" 
                        placeholder="Password..." 
                        value={userData.password} 
                        onChange={(e) => setUserData((state) => ({ ...state, password: e.target.value }))}
                        />
                    {userData.password?.length < 8 && accept && (<p className="error">Password must be more than 8 charaters</p>)}
                    
                    <label htmlFor="repeat">Repeat Password:</label>
                    <input 
                        id="repeat" 
                        type="password" 
                        placeholder="Repeat Password..." 
                        value={userData.password_confirmation} 
                        onChange={(e) => setUserData((state) => ({ ...state, password_confirmation: e.target.value }))}
                        />
                    {userData.password_confirmation !== userData.password && accept && (<p className="error">Password does not match</p>)}
                    
                    <div style={{textAlign:"center"}}>
                        <button type="submit">Register</button>
                    </div>
                    
                </form>
        </div>
        </div>
        </>
    )
}