import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  userName: null,
  accessToken: null,
  refreshToken: null,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
        
      const { userId, userName,accessToken, refreshToken, role } = action.payload;
      state.userId = userId;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.role = role;
      state.userName = userName;
    },
    accessTokenUpdate:(state, action)=>{
      const newAccessToken = action.payload;
      state.accessToken = newAccessToken;
        },
    logout: (state) => {
      state.userId = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.role = null;
    },
  },
});

export const { loginSuccess, accessTokenUpdate, logout } = authSlice.actions;

export default authSlice.reducer;
