import { createSlice } from "@reduxjs/toolkit";
import adminModel from "@/Models/AdminModel";
import { redirect } from "react-router-dom";

const initialState = {
    admin: null,
}

export const slice = createSlice({
    name: "AdminModel",
    initialState: initialState,
    reducers: {
        setAdmin: (state, action) => {
            const res = adminModel.safeParse(action.payload);
            if (!res.success) return;
            state.admin = res.data;
        },
        
        logOut: (state) => {
            state.admin = null;
            state.counters = null;
            localStorage.removeItem('a_token');
            redirect('/admin/login');
        },
    },
});

export const { setAdmin, logOut } = slice.actions;
export default slice.reducer;