import { IUser } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthState = {
  token: string | null;
  isLoggedIn: boolean;
  currentUser: IUser | null;
};

const initialState: AuthState = {
  token: null,
  isLoggedIn: false,
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
    },
    saveAuthData: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    resetAuthData: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      state.currentUser = null;
    },
  },
});

export const { setUser, resetAuthData, saveAuthData } = authSlice.actions;
export const authReducer = authSlice.reducer;
