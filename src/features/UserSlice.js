import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    users: [],
    status: null,
    error: null,
};

// Fetch users
export const usersFetch = createAsyncThunk(
    "users/usersFetch",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("https://online-shop-backend-production.up.railway.app/getUsers");
            return response.data;
        } catch (err) {
            return rejectWithValue("Error fetching users");
        }
    }
);

// Create user
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

export const userUpdate = createAsyncThunk(
    "users/userUpdate",
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `https://online-shop-backend-production.up.railway.app/updateUser/${id}`,
                updatedData,
                { headers: { "Content-Type": "application/json" } }
            );
            return { id, updatedData: response.data };
            console.log("Update Response:", response.data);
        } catch (error) {
            return rejectWithValue("Failed to update User");
        }
    }
);
export const userDelete = createAsyncThunk(
    "users/userDelete",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`https://online-shop-backend-production.up.railway.app/deleteUser/${id}`);
            return id;
            console.log("Delete Response:", id);
        } catch (error) {
            return rejectWithValue("Failed to delete User");
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
            })
            .addCase(userUpdate.pending, (state) => {
                state.status = "loading";
            })
            .addCase(userUpdate.fulfilled, (state, action) => {
                state.status = "success";
                const { id, updatedData } = action.payload;
                const userIndex = state.users.findIndex(user => user.id === id);
                if (userIndex !== -1) {
                    state.users[userIndex] = { ...state.users[userIndex], ...updatedData }; 
                }
            })
            .addCase(userDelete.fulfilled, (state, action) => {
                state.status = "success";
                state.users = state.users.filter(user => user.id !== action.payload); 
            })
            .addCase(userUpdate.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(userDelete.pending, (state) => {
                state.status = "loading";
            })
            .addCase(userDelete.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;
