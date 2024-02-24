import axios from "axios";
import Cookies from "universal-cookie"
const cookie = new Cookies();
const token = cookie.get("Bearer");

export const fetchUsersAction = () => {
    return axios.get('http://127.0.0.1:8000/api/user/show',{
        headers: {
            Accept : "application/json",
            Authorization: "Bearer " + token,
        }
    });
}
export const deleteUsersAction = (id) => {
    return axios.delete(`http://127.0.0.1:8000/api/user/delete/${id}`, {
        headers: {
            Authorization: "Bearer " + token,
        }
    })
}
export const createUserAction = (userData) => {
    return axios.post("http://127.0.0.1:8000/api/user/create", userData, {
        headers: {
            Authorization: "Bearer " + token,
        }
    });
}
export const fetchUserbyIdAction = (id) => {
    return axios.get(`http://127.0.0.1:8000/api/user/showbyid/${id}`,{
        headers: {
            Authorization: "Bearer " + token,
        }
    });
}
export const updateUserAction = ({id, userData}) => {
    return axios.post(`http://127.0.0.1:8000/api/user/update/${id}`, userData,{
            headers: {
                Authorization: "Bearer " + token,
            }
        })
}