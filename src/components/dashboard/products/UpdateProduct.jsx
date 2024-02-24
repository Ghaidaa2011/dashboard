import {useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie"
import { useDispatch } from "react-redux";
import { fetchProductbyId } from "../../../services/productService";

export default function UpdateProduct () {
    const [accept, setAccept] = useState(false);
    const [productData, setProductData] = useState({
        title: "",
        description: "",
    });
    const cookie = new Cookies();
    const token = cookie.get("Bearer");
    const navigate = useNavigate();
    // const id = window.location.pathname.split("/").slice(-1)[0];
    const {idProduct} = useParams()
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchProductbyId(idProduct)).then((action)=> {
            const {title, description} = action.payload;
            setProductData({...productData, title, description})
        })
        // axios.get(`http://127.0.0.1:8000/api/product/showbyid/${idProduct}`, {
        //     headers: {
        //         Accept : "application/json",
        //         Authorization: "Bearer " + token,
        //     }
        // })
        // .then((data)=> setProductData((state) => ({...state, title: data.data[0].title, description: data.data[0].description})))
        // .catch ((error)=>console.log(error))
    },[idProduct]);
    async function Submit (e) {
        e.preventDefault();
        setAccept(true);
        try {
            const formData = new FormData();
            formData.append("title", productData.title);
            formData.append("description", productData.description);
            formData.append("image", productData.image);

            let res = await axios.post(`http://127.0.0.1:8000/api/product/update/${idProduct}`,
            formData,{
                headers: {
                    Authorization: "Bearer " + token,
                }
            });
            navigate("/dashboard/products"); 
            console.log(res)
        } catch (error) { 
            setAccept(true);
            console.log(error);
        }
    }
    return (
        <>
        <div className="parent">
        <div className="register">
            <form  onSubmit={Submit}>
                    <label htmlFor="title">Title:</label>
                    <input
                        id="title" 
                        type="text" 
                        placeholder="title..." 
                        value={productData.title} 
                        onChange={(e) => setProductData((state) => ({ ...state, title: e.target.value }))}
                        />
                    {productData.title === "" && accept && <p className="error">Title is required</p>}

                    <label htmlFor="desc">Description:</label>
                    <input 
                        id="desc" 
                        type="text" 
                        placeholder="Description..." 
                        required value={productData.description} 
                        onChange={(e) => setProductData((state) => ({ ...state, description: e.target.value }))}
                        />
                    {/* {accept && emailError === 422 && <p className="error" >Emial is already been taken</p>} */}

                    <div style={{textAlign:"center"}}>
                        <button type="submit">Update product</button>
                    </div>
                    
                </form>
        </div>
        </div>
        </>
    )
}