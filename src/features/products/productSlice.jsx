import { createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  deleteProducts,
  fetchProductbyId,
  fetchProducts,
  updateProduct,
} from "../../services/productService";

const initialState = {
  products: [],
  status: "idle",
  error: null,
  run: 0,
};
const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteProducts.pending, (state) => {
        state.status = "deleting";
      })
      .addCase(deleteProducts.fulfilled, (state) => {
        state.status = "succeeded";
        state.run++;
      })
      .addCase(deleteProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createProduct.pending, (state) => {
        state.status = "creating";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProductbyId.pending, (state) => {
        state.status = "getting";
      })
      .addCase(fetchProductbyId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProductbyId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateProduct.pending, (state) => {
        state.status = "updating";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Update the user data in the state, assuming action.payload contains updated user data
        state.products = state.products.map((product) => {
          if (product.id === action.payload.id) {
            return action.payload; // Update the user with the updated data
          } else {
            return product; // Keep other users unchanged
          }
        });
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default productSlice.reducer;
