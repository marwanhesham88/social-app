import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authslice";
import { postsReducer } from "./postsslice";


export let store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postsReducer
    }
})