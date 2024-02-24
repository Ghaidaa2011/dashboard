import { createSlice } from "@reduxjs/toolkit";
import {
  createUser,
  deleteUsers,
  fetchUserbyId,
  fetchUsers,
  updateUser,
} from "../../services/userService";

const initialState = {
  users: [],
  status: false,
  error: "",
  run: 0,

  loadingCreateUser: false,
  errorCreateUser: "",

  loadingDeletedUsers: false,
  errorDeletedUsers: "",

  loadingUserID: false,
  errorMessage: "",
  userId: {},

  loadingUpdateUser: false,
  errorUpdateUser: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setInputValue: (state, action) => {
      const { field, value } = action.payload;
      state.userId[field] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = false;
        state.users = action.payload;
        state.error = "";
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = false;
        state.users = [];
        state.error = action.error.message;
      })
      .addCase(deleteUsers.pending, (state) => {
        state.loadingDeletedUsers = true;
      })
      .addCase(deleteUsers.fulfilled, (state) => {
        state.loadingDeletedUsers = false;
        state.errorDeletedUsers = "";
        state.run++;
      })
      .addCase(deleteUsers.rejected, (state, action) => {
        state.loadingDeletedUsers = false;
        state.errorDeletedUsers = action.error.message;
      })

      .addCase(createUser.pending, (state) => {
        state.loadingCreateUser = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loadingCreateUser = false;
        state.users.push(action.payload);
        state.errorDeletedUsers = "";
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loadingCreateUser = false;
        state.users = [];
        state.errorDeletedUsers = action.error.message;
      })

      .addCase(fetchUserbyId.pending, (state) => {
        state.loadingUserID = true;
      })
      .addCase(fetchUserbyId.fulfilled, (state, action) => {
        state.loadingUserID = false;
        state.userId = action.payload;
        state.errorMessage = "";
      })
      .addCase(fetchUserbyId.rejected, (state, action) => {
        state.loadingUserID = false;
        state.userId = {};
        state.errorMessage = action.error.message;
      })

      .addCase(updateUser.pending, (state) => {
        state.loadingUpdateUser = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loadingUpdateUser = false;
        const updatedUserIndex = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (updatedUserIndex !== -1) {
          state.users[updatedUserIndex] = action.payload;
        }
        state.errorUpdateUser = "";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loadingUpdateUser = false;
        state.users = [];
        state.errorUpdateUser = action.error.message;
      });
  },
});

export const { setInputValue } = userSlice.actions;
export default userSlice.reducer;
