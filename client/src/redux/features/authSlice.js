import Cookies from "js-cookie"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../services/authService";

const jwt = Cookies.get("jwt")
const username = Cookies.get("username")
//const user = JSON.parse(localStorage.getItem("user"));

export const register = createAsyncThunk(
    "auth/register",
    async ({ username, email, password }, thunkAPI) => {
        try {
            const response = await AuthService.register(username, email, password);
            return { user: response };;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.error);

        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, thunkAPI) => {
        try {
            const data = await AuthService.login(email, password);
            return { user: data };
        } catch (error) {

            return thunkAPI.rejectWithValue(error.response.data.error);

        }
    }
);

export const logout = createAsyncThunk("auth/logout", async () => {
    await AuthService.logout();
});

const initialState = jwt
    ? { user: { jwt, username }, error: null }
    : { user: null, error: null };

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        removeAuthError: (state) => {
            state.error = null;
        }
    },
    extraReducers: {
        [register.fulfilled]: (state, action) => {
            state.user = action.payload.user;
            state.error = null

        },
        [register.rejected]: (state, action) => {
            state.error = action.payload;
            state.user = null;

        },
        [login.fulfilled]: (state, action) => {
            state.user = action.payload.user;
            state.error = null
        },
        [login.rejected]: (state, action) => {
            state.user = null;
            state.error = action.payload;
        },
        [logout.fulfilled]: (state, action) => {
            state.user = null;
        },
    },
});



const { reducer, actions } = authSlice;
export default reducer;
export const { removeAuthError } = actions

