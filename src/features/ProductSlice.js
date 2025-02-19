import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/products"; 

const initialState = {
    products: [],
    status: null,
    error: null,
};



export const productsCreate = createAsyncThunk(
    "products/productsCreate",
    async (values, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL, values, {
                headers: { "Content-Type": "application/json" },
            });
            console.log("Response FROM THE SLICE:", response.data);
            dispatch(productsFetch());
            return response.data;
        } catch (error) {
            console.error("Error Response:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || "Failed to add product");
        }
    }
);

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(productsFetch.pending, (state) => {
                state.status = "loading";
            })
            .addCase(productsFetch.fulfilled, (state, action) => {
                state.status = "success";
                state.products = action.payload;
            })
            .addCase(productsFetch.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(productsCreate.pending, (state) => {
                state.status = "loading";
            })
            .addCase(productsCreate.fulfilled, (state, action) => {
                state.products.push(action.payload); 
                state.status = "success";
            })
            .addCase(productsCreate.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default productSlice.reducer;
