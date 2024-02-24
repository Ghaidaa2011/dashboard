import { createAsyncThunk } from "@reduxjs/toolkit";
import { createProductAction, deleteProductsAction, fetchProductbyIdAction, fetchProductsAction, updateProductAction } from "../features/products/productActions";
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await fetchProductsAction();
    return response.data;
});
export const deleteProducts = createAsyncThunk('products/deleteProducts', async (id)=> {
    await deleteProductsAction(id);
})

export const createProduct = createAsyncThunk('products/createProduct', async(formData)=> {
    const response = await createProductAction(formData);
    return response.data;
});
export const fetchProductbyId = createAsyncThunk('products/fetchProductbyId', async (idProduct)=> {
    const product = await fetchProductbyIdAction(idProduct);
    return product.data[0]; 
});
export const updateProduct = createAsyncThunk('products/updateUser', async (idProduct,productData)=> {
    await updateProductAction(idProduct, productData);
});