import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import currentProd from "../../services/currentProdService"

export const getProductDetails = createAsyncThunk("currentProd/productDetails", async ({ id }, thunkAPI) => {
    try {
        const data = await currentProd.getProductDetails(id);
        return { productDetails: data };
    } catch (err) {
        return thunkAPI.rejectWithValue();
    }
})
export const getProductReviews = createAsyncThunk("currentProd/reviews", async ({ id }, thunkAPI) => {
    try {
        console.log("getting prod Revvvvvvvs")
        const data = await currentProd.getProductReviews(id);
        return { reviews: data };
    } catch (err) {
        return thunkAPI.rejectWithValue();
    }
})
export const postNewReview = createAsyncThunk("currentProd/newReviews", async (formData, thunkAPI) => {
    try {
        console.log("getting prod Revvvvvvvs")

        const data = await currentProd.postReview(formData);
        console.log(data)
        //   thunkAPI.dispatch(incrementReviews());

        return { review: data };
    } catch (err) {
        // thunkAPI.dispatch(setMessage(err));
        console.log(err)
        return thunkAPI.rejectWithValue();
    }
})


const initialState = {
    reviews: null,
    productDetails: null,
    message: null
}

const currentProdSlice = createSlice(
    {
        name: "currentProd",
        initialState,
        reducers: {
            incrementReviews: (state) => {
                state.productDetails.review.votes++
            }
        },
        extraReducers: {
            [getProductDetails.fulfilled]: (state, action) => {
                state.productDetails = action.payload.productDetails
            },
            [getProductDetails.rejected]: (state, action) => {
                state.productDetails = null
            },
            [getProductReviews.fulfilled]: (state, action) => {
                state.reviews = action.payload.reviews
            },
            [getProductReviews.rejected]: (state, action) => {
                state.reviews = false
            },
            [postNewReview.fulfilled]: (state, action) => {
                state.reviews.push({ ...action.payload.review });
                state.productDetails.review.votes++

            },
            [getProductReviews.rejected]: (state, action) => {

            }
        }
    },

);


const { reducer, actions } = currentProdSlice;
export default reducer;
export const { incrementReviews } = actions
