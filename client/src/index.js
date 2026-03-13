import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Redux setup
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "state";
import authReducer from "./state/authSlice";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "state/api";

// Google OAuth
import { GoogleOAuthProvider } from "@react-oauth/google";

const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer,
    auth: authReducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});

setupListeners(store.dispatch);

const root = ReactDOM.createRoot(document.getElementById("root"));

// Verify Client ID in console (useful for debugging with judges/development)
const googleId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={googleId}>
      <App />
    </GoogleOAuthProvider>
  </Provider>
);