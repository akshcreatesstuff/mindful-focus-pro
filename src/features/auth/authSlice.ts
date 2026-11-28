import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser } from "./types";

type AuthState = {
  user: AuthUser | null;
  // false until Firebase has said whether someone is already logged in
  ready: boolean;
};

const initialState: AuthState = {
  user: null,
  ready: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userChanged(state, action: PayloadAction<AuthUser | null>) {
      state.user = action.payload;
      state.ready = true;
    },
  },
});

export const { userChanged } = authSlice.actions;
export default authSlice.reducer;
