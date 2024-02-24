import {useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createProduct } from "../../../services/productService";
export default function CreateProduct () {
    const [accept, setAccept] = useState(false);
    const [productData, setProductData] = useState({
        title: "",
        description: "",
        image: null,
    });
    console.log(productData)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function Submit (e) {
        e.preventDefault();
        setAccept(true);
        try {
            const formData = new FormData();
            formData.append('title', productData.title);
            formData.append('description', productData.description);
            formData.append('image', productData.image);
            console.log(formData);

            dispatch(createProduct(formData));
            navigate("/dashboard/products"); 
        } catch (error) { 
            setAccept(false);
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

                    <label htmlFor="image">Image:</label>
                    <input 
                        id="image" 
                        type="File" 
                        placeholder="Image..." 
                        // value={productData.image} 
                        onChange={async (e) => await setProductData((state) => ({ ...state, image: e.target.files.item(0) }))}
                        />
                    {/* {productData.password?.length < 8 && accept && (<p className="error">Password must be more than 8 charaters</p>)} */}
                    
                    <div style={{textAlign:"center"}}>
                        <button type="submit">Create product</button>
                    </div>
                    
                </form>
        </div>
        </div>
        </>
    )
}