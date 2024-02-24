import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { createUser } from "../../../services/userService";
export default function CreateUser () {
    const [accept, setAccept] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation:"",
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const status = useSelector((state) => state.user.status);

    async function Submit (e) {
        e.preventDefault();
        setAccept(true);
        try{
            dispatch(createUser(userData));
            navigate("/dashboard/users"); 
        }catch(error) { 
                if (error.response && error.response.status === 422) {
                    setEmailError(true);
                }
                setAccept(true);
            }
    }
    return (
        <>
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
                        <button type="submit">Create user</button>
                    </div>
                    
                </form>
        </div>
        <div>{status}</div>
        </div>
        </>
    )
}