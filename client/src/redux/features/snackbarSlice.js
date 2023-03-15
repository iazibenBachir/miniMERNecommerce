import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isDisplayed: false,
    message: null,
}

const snackbarSLice = createSlice({
    name: "snackbar",
    initialState: initialState,
    reducers: {
        showSnackbar: (state, action) => {
            state.isDisplayed = true
            state.message = action.payload
        },
        clearSnackbar: (state) => {
            state.isDisplayed = false
            state.message = null
        },
    }
})

const { reducer, actions } = snackbarSLice;
export default reducer;
export const { clearSnackbar, showSnackbar } = actions