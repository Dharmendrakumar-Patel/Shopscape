import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: null,
    users: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => { 
            state.value = action.payload
        },
        removeUser: (state) => {
            state.value = null
        },
        addAllUser: (state, action) => {
            state.users = action.payload
        },
    }
});

export const { addUser, removeUser, addAllUser } = userSlice.actions;

export const selectUser = (state) => state.user.value;

export default userSlice.reducer;