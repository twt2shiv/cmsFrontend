import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import blogReducer from "../features/blog/blogSlice"
import selectReducer from "../features/reactSelect/reactSelectSlce"

export const store = configureStore({
    reducer:{
        auth:authReducer,
        blog:blogReducer,
        select:selectReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch