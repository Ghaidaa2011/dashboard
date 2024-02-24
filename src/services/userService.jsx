import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserAction, deleteUsersAction, fetchUserbyIdAction, fetchUsersAction, updateUserAction } from "../features/user/userActions";


export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await fetchUsersAction ();
    return response.data;
});
export const deleteUsers = createAsyncThunk('users/deleteUsers', async (id)=> {
    await deleteUsersAction(id);
})
export const createUser = createAsyncThunk('users/createUser', async(userData)=> {
    const response = await createUserAction(userData);
    return response.data;
});
export const fetchUserbyId = createAsyncThunk('users/fetchUserbyId', async (id)=> {
    const user = await fetchUserbyIdAction(id);
    return user.data[0]; 
});
export const updateUser = createAsyncThunk('users/updateUser', async (id,userData)=> {
    const user = await updateUserAction(id,userData);
    return user.data;
});
