import { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProducts, fetchProducts } from "../../../services/productService";
export default function Products () {
    // const [products, setProducts] = useState([]);
    const {products, run} = useSelector((state) => state.product);
    const dispatch = useDispatch();
    console.log(products);
    useEffect(()=>{
        dispatch(fetchProducts());
        // axios.get("http://127.0.0.1:8000/api/product/show", {
        //     headers: {
        //         Accept : "application/json",
        //         Authorization: "Bearer " + token,
        //     }
        // })
        // .then((data)=> setProducts(data.data))
        // .catch ((error)=>console.log(error))
    },[run, dispatch]);
    // async function deleteUser(id){
    //     try {
    //         const result = await axios.delete(`http://127.0.0.1:8000/api/product/delete/${id}`, {
    //             headers: {
    //                 Authorization: "Bearer " + token,
    //             }
    //         });
    //         if (result.status === 200) {
    //             setRun((prev)=> prev + 1)
    //         }
    //     } catch (error) { 
    //         console.log(error);
    //     }
    // } 
    const ShowProducts = products.map((product, index)=> (
        <tr key={index}>
            <td>{index +1}</td>
            <td>{product.title}</td>
            <td>{product.description}</td>
            <td>
                <Link to={`${product.id}`}>
                    <FontAwesomeIcon icon={faPenToSquare} style={{color:"#74afb9", fontSize:"20px", padding:"4px"}}/>
                </Link>
                <FontAwesomeIcon icon={faTrash} onClick={()=> dispatch(deleteProducts(product.id))}
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
                    {ShowProducts}
                </tbody>
            </table>
        </div>
    )
}