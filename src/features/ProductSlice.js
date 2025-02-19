import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    products: [],
    status: null,
    error: null,
};

export const productsFetch = createAsyncThunk(
    'products/productsFetch',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("http://localhost:5000/products");
            return response.data;
        } catch (err) {
            return rejectWithValue("Error fetching products");
        }
    }
);


export const productsCreate = createAsyncThunk(
    "products/productsCreate",
    async (values, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                "http://localhost:5000/products",
                values,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data;  
        } catch (error) {
            return rejectWithValue("Failed to add product");
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
