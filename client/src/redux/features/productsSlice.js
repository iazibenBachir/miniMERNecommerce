import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts, searchProducts } from "../../services/productsService"

const initialState = {
    products: [],
    queryUrl: null,
    filter: null,
    total: null,
    limit: null,
    currentPage: 1,
    loading: false,
    error: null
}

export const fetchProducts = createAsyncThunk("products/fetchProducts", async (querr_url, thunkAPI) => {
    try {
        const data = await getProducts(querr_url);
        return { data: data };
    } catch (err) {
        return thunkAPI.rejectWithValue();
    }
})
export const querySearchProducts = createAsyncThunk("products/search", async (query, thunkAPI) => {
    try {

        const data = await searchProducts(query);
        console.log("####>:", data);
        return { products: data };
    } catch (err) {
        return thunkAPI.rejectWithValue();
    }
})
const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        removeSingleFilterOption: (state, action) => {
            state.queryUrl = action.payload
        },
        setFilter: (state, action) => {
            state.filter = action.payload
        },
        setPageToFiter: (state, action) => {
            // state.filter.page = action.payload 
            state.filter = { page: action.payload }
        },
        sortAlphbit: (state, action) => {
            const p = action.payload;
            console.log(p)
            let sortedProducts;
            if (p === "name asc") {
                sortedProducts = state.products.sort((a, b) => a.name > b.name ? 1 : -1,);
            }
            if (p === "name desc") {
                sortedProducts = state.products.sort((a, b) => a.name < b.name ? 1 : -1,);
            }

            if (p === "price asc") {
                sortedProducts = state.products.sort((a, b) => a.price.current - b.price.current);
            }
            if (p === "price desc") {
                sortedProducts = state.products.sort((a, b) => b.price.current - a.price.current);
            }

            if (p === "selling") {
                sortedProducts = state.products.sort((a, b) => a.review.votes - b.review.votes);

            }
            state.products = sortedProducts
            // const newItem = action.payload;
        },
    },
    extraReducers: {
        [fetchProducts.pending]: (state) => {
            state.loading = true;
        },
        [fetchProducts.fulfilled]: (state, action) => {
            state.loading = false;
            state.products = action.payload.data.products;
            state.total = action.payload.data.total;
            state.currentPage = action.payload.data.page;
            state.limit = action.payload.data.limit;
        },
        [fetchProducts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        [querySearchProducts.pending]: (state) => {
            state.loading = true;
        },
        [querySearchProducts.fulfilled]: (state, action) => {
            state.loading = false;
            state.products = action.payload.products;
        },
        [querySearchProducts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    }


})



const { reducer, actions } = productsSlice;
export default reducer;
//=====
export const { setQueryUrl, setFilter, setPageToFiter, sortAlphbit, setCurrentPage } = actions