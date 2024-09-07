import { PostType } from "@/app/_interfaces/home";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


let initialState: { allPosts: PostType[] | null; singlePost: PostType | null} = {
    allPosts: null,
    singlePost: null,
}

export let getAllPosts = createAsyncThunk( "postsSlice/getAllPosts" , async(limit?: number) => {
    return await axios.get(`https://linked-posts.routemisr.com/posts?limit=${limit || 25}`, {
        headers: {
            token: localStorage.getItem("userToken")
        }
    })
     .then((res)=> res)
     .catch((err)=> err)
  })

  export let getPost = createAsyncThunk( "postsSlice/getPost" , async(id: string) => {
    return await axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
        headers: {
            token: localStorage.getItem("userToken")
        }
    })
     .then((res)=> res)
     .catch((err)=> err)
  })

let postsSlice = createSlice({
    name: "postsSlice",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(getAllPosts.fulfilled, ( state , action )=>{
           console.log("action", action.payload.data.posts);
           state.allPosts = action.payload.data.posts
           
        })

        builder.addCase(getPost.fulfilled, ( state , action )=>{
           
            state.singlePost = action.payload.data.post
            
         })

    }
})

export let postsReducer = postsSlice.reducer