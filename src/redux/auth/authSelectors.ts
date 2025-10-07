import { RootState } from "../store";

export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectAuthToken = (state: RootState) => state.auth.token;
