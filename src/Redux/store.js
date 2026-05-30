import { configureStore } from "@reduxjs/toolkit";
import { jsonPlaceholderAPI } from "./jsonPlaceholderAPI";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        [jsonPlaceholderAPI.reducerPath]: jsonPlaceholderAPI.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(jsonPlaceholderAPI.middleware)
});

// This line is mandatory to enable refetchOnFocus:true in createApi
setupListeners(store.dispatch);