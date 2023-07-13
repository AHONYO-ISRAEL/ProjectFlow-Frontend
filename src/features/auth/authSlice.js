import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  accessToken: null,
  refreshToken: null,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { userId, accessToken, refreshToken, role } = action.payload;
      state.userId = userId;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.role = role;
    },
    logout: (state) => {
      state.userId = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.role = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
