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
            const response = await axios.get("https://online-shop-backend-production.up.railway.app/getItems");
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
                "https://online-shop-backend-production.up.railway.app/setItems",
                values,
                { headers: { "Content-Type": "application/json" } }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue("Failed to add product");
        }
    }
);

export const itemUpdate = createAsyncThunk(
    "items/itemUpdate",
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `https://online-shop-backend-production.up.railway.app/updateitem/${id}`,
                updatedData,
                { headers: { "Content-Type": "application/json" } }
            );

            return { id, updatedData: response.data };
        } catch (error) {
            return rejectWithValue("Failed to update item");
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
            // .addCase(productsFetch.fulfilled, (state, action) => {
            //     state.status = "success";
            //     state.products = action.payload;
            // })
            .addCase(productsFetch.fulfilled, (state, action) => {
            state.status = "success";
            state.products = action.payload.length ? action.payload : [];
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
