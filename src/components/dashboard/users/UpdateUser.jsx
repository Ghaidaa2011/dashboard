import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setInputValue } from "../../../features/user/userSlice";
import { fetchUserbyId, updateUser } from "../../../services/userService";

export default function UpdateUser() {
    const [accept, setAccept] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userId ,loadingUserID } = useSelector((state) => state.user);
    const { idUser } = useParams();

    console.log(userId)

    useEffect(() => {
    dispatch(fetchUserbyId(idUser));
    }, [dispatch, idUser]);

    async function handleSubmit(e) {
        e.preventDefault();
        setAccept(true);
        try {
            await dispatch(updateUser({ id: idUser, userData: userId  }));
            navigate("/dashboard/users");
        } catch (error) {
            console.log(error)
        }
    }
    const handleChangeUser = (e) => {
        const { name, value } = e.target;
        dispatch(setInputValue({ field: name, value: value }));
    }
    return (
        <>
        {loadingUserID && <span>Loading...</span>}
        {!loadingUserID && userId && (
            <div className="parent">
            <div className="register">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Name..."
                        value={userId.name}
                        onChange={handleChangeUser}
                    />
                    {userId.name === "" && accept && <p className="error">Name is required</p>}

                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email..."
                        required
                        value={userId.email}
                        name="email"
                        onChange={handleChangeUser}
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password..."
                        value={userId.password}
                        name="password"
                        onChange={handleChangeUser}
                    />
                    {userId.password?.length < 8 && accept && <p className="error">Password must be at least 8 characters</p>}

                    <label htmlFor="repeat">Repeat Password:</label>
                    <input
                        id="repeat"
                        type="password"
                        placeholder="Repeat Password..."
                        value={userId.password_confirmation}
                        name="password_confirmation"
                        onChange={handleChangeUser}
                    />
                    {userId.password_confirmation !== userId.password && accept && <p className="error">Passwords do not match</p>}

                    <div style={{ textAlign: "center" }}>
                        <button type="submit">Update User</button>
                    </div>
                </form>
            </div>
        </div>
        )}
        </>
    );
}
