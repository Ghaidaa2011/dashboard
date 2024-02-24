import axios from "axios";
import Cookies from "universal-cookie";

const cookie = new Cookies();
const token = cookie.get("Bearer");

export const fetchProductsAction = () => {
  return axios.get("http://127.0.0.1:8000/api/product/show", {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
};
export const deleteProductsAction = (id) => {
  return axios.delete(`http://127.0.0.1:8000/api/product/delete/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
export const createProductAction = (formData) => {
  return axios.post("http://127.0.0.1:8000/api/product/create", formData, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
export const fetchProductbyIdAction = (idProduct) => {
  return axios.get(`http://127.0.0.1:8000/api/product/showbyid/${idProduct}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
export const updateProductAction = ({ idProduct, productData }) => {
  return axios.post(
    `http://127.0.0.1:8000/api/product/update/${idProduct}`,
    productData,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};
