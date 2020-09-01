import { createAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  authState: false,
  name: null,
};

export const loginAction = createAction<string>('login');

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState: (state, action) => {
      state.authState = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { reducer: authReducer, actions: authActions } = authSlice;
