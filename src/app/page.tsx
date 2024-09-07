"use client"
import Image from "next/image";
import styles from "./page.module.css";
import Grid from '@mui/material/Grid';
import Post from "./_components/Post/Post";
import { getAllPosts } from "@/lib/postsslice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { store } from "@/lib/store";
import { PostType } from "./_interfaces/home";
import Loading from "./loading";


export default function Home() {
  let dispatch = useDispatch<typeof store.dispatch>()

  let {allPosts} = useSelector((state: ReturnType<typeof store.getState>) => state.posts)

  useEffect(() => {
    dispatch(getAllPosts())
  }, [])
  
  return <>
  <Grid container spacing={3} sx={{marginBlock: "30px"}}>
  <Grid item sm={3}></Grid>

  <Grid item sm={6} sx={{paddingBlock: "10px"}}>
    
    {allPosts?.map((postObj: PostType) => <Post postObject={postObj} allComments={false}  key={postObj._id}/>)}
    
  </Grid>

  <Grid item sm={3}></Grid>
</Grid>
   
  </>
}
