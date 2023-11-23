import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: null
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
        }
    }
});

export const { addUser, removeUser } = userSlice.actions;

export const selectUser = (state) => state.user.value;

export default userSlice.reducer;