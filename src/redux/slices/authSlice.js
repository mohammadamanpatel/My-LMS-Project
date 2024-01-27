import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast';
import axiosInstance from '../../config/axiosInstance';
const storedData = localStorage.getItem("userData");
console.log("storedData",storedData);
let parsedData = {};

try {
    parsedData = storedData ? JSON.parse(storedData) : {};
    console.log("parserData",parsedData);
} catch (error) {
    console.error('Error parsing stored data:', error);
    parsedData = {}; // Ensure parsedData is an object even in case of an error
}

const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
    role: localStorage.getItem("role") || "",
    data: parsedData
};
export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
    try {
        const response = axiosInstance.post("user/register", data);
        toast.promise(response, {
            loading: 'Wait! creating your account',
            success: (data) => {
                return data?.data?.message;
            },
            error: 'Failed to create your account'
        });
        return await response;
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
})
export const login = createAsyncThunk("auth/login", async (data) => {
    try {
        let res = axiosInstance.post("/user/login", data);

        await toast.promise(res, {
            loading: "Loading...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to log in",
        });

        // getting response resolved here
        res = await res;
        console.log("res of login in auth slice", res.data.userData);
        return res.data.userData;
    } catch (error) {
        toast.error(error.message);
    }
});
export const logout = createAsyncThunk("auth/logout", async () => {
    try {
        let res = axiosInstance.get("/user/logout");

        await toast.promise(res, {
            loading: "Loading...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to log out",
        });

        // getting response resolved here
        res = await res;
        console.log("response of logout in authSlice", res);
        return res.data;
    } catch (error) {
        toast.error(error.message);
    }
});
export const updateProfile = createAsyncThunk("/auth/updateProfile", async (data) => {
    try {
        const response = axiosInstance.put(`/user/update/${data[0]}`, data[1]);
        toast.promise(response, {
            loading: 'Wait! updating your account',
            success: (data) => {
                console.log(data);
                return data?.data?.message;
            },
            error: 'Failed to update your account'
        });
        const res = await response
        console.log("res in profileUpdate thunk",res);
        return res.data.data
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
})

export const getUserData = createAsyncThunk("/auth/getData", async () => {
    try {
        const response = axiosInstance.get("/user/me");
        return (await response).data;
    } catch (error) {
        toast.error(error?.message);
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // for user login
            .addCase(login.fulfilled, (state, action) => {
                console.log("action",action);
                localStorage.setItem("data", JSON.stringify(action?.payload));
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("role", action?.payload?.role || "");
                state.isLoggedIn = true;
                state.data = action?.payload;
                state.role = action?.payload?.role || "";
            })
            .addCase(logout.fulfilled, (state, action) => {
                localStorage.clear()
                state.isLoggedIn = false
                state.data = {}
                state.role = ""
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                if (!action?.payload?.user) return;
                console.log("action in getuserData",action);
                localStorage.setItem("data", JSON.stringify(action?.payload?.user));
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("role", action?.payload?.user?.role || "");
                state.isLoggedIn = true;
                state.data = action?.payload?.user;
                state.role = action?.payload?.user?.role || "";
            })
    }
})
export default authSlice.reducer;