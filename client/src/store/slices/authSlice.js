import { createSlice } from "@reduxjs/toolkit";
import { clearSession, getSession, setDemoSession } from "../../services/demoStorage";

// Demo sessions are seeded in localStorage. The demo always starts as admin
// unless another demo user was selected during this browser session.
const getInitialSession = () => {
  try {
    return getSession() || setDemoSession();
  } catch {
    return null;
  }
};

const initialSession = getInitialSession();

const initialState = {
  user: initialSession?.user || null,
  accessToken: initialSession?.token || null,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      // Handle access token
      if (payload.accessToken) {
        state.accessToken = payload.accessToken;
      }
      // Handle user data
      if (payload.user) {
        state.user = payload.user;
      }
      // Once credentials are set, refresh is done
      state.isRefreshing = false;
    },
    sendLogout: (state) => {
      clearSession();
      state.user = null;
      state.accessToken = null;
      state.isRefreshing = false;
    },
    setIsRefreshing: (state, action) => {
      state.isRefreshing = action.payload;
    },
  },
});

export const { setCredentials, sendLogout, setIsRefreshing } = authSlice.actions;

// Switch the active browser-only identity and mirror it into Redux.
export const switchDemoUser = (userId) => (dispatch) => {
  const session = setDemoSession(userId);
  dispatch(
    setCredentials({
      accessToken: session.token,
      user: session.user,
    }),
  );
  return session;
};

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.accessToken;
export const selectIsAuthenticated = (state) => !!state.auth.accessToken;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
