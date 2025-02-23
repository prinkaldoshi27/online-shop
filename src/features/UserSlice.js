import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    users: [],
    status: null,
    error: null,
};

export const usersFetch = createAsyncThunk(
    'users/usersFetch',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("https://online-shop-backend-production.up.railway.app/getUsers");
            return response.data;
        } catch (err) {
            return rejectWithValue("Error fetching users");
        }
    }
);


export const usersCreate = createAsyncThunk(
    "users/usersCreate",
    async (values, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                "https://online-shop-backend-production.up.railway.app/setUsers",
                values,
                { headers: { "Content-Type": "application/json" } }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue("Failed to add User");
        }
    }
);




const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(usersFetch.pending, (state) => {
                state.status = "loading";
            })
            .addCase(usersFetch.fulfilled, (state, action) => {
                state.status = "success";
                state.users = action.payload;
            })
            .addCase(usersFetch.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(usersCreate.pending, (state) => {
                state.status = "loading";
            })
            .addCase(usersCreate.fulfilled, (state, action) => {
                state.users.push(action.payload);
                state.status = "success";
            })
            .addCase(usersCreate.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;
