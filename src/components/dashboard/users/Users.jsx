// import axios from "axios";
import { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { deleteUsers, fetchUsers } from "../../../services/userService";
export default function Users () {
    const dispatch = useDispatch();
    
    const {run ,users} = useSelector((state) => state.user);
    console.log(users);


    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch,run]);

    const ShowUsers = users.map((user, index)=> (
        <tr key={index}>
            <td>{index +1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
                <Link to={`${user.id}`}>
                    <FontAwesomeIcon icon={faPenToSquare} style={{color:"#74afb9", fontSize:"20px", padding:"4px"}}/>
                </Link>
                <FontAwesomeIcon icon={faTrash} onClick={()=> dispatch(deleteUsers(user.id))}
                style={{color:"red", fontSize:"20px", cursor:"pointer"}} />
            </td>
        </tr>
    ));
    return (
        <div style={{padding:"20px"}}>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>User</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {ShowUsers}
                </tbody>
            </table>
        </div>
    )
}