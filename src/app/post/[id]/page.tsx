"use client"
import Post from '@/app/_components/Post/Post'
import Loading from '@/app/loading'
import { getPost } from '@/lib/postsslice'
import { store } from '@/lib/store'
import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function page(props: any) {
    const dispatch = useDispatch<typeof store.dispatch>()
    let {singlePost} = useSelector((state: ReturnType<typeof store.getState>) => state.posts)

    useEffect(() => {
      dispatch(getPost(props.params.id))
    }, [])
    
  return singlePost ? <Box sx={{width:"50%", mx:"auto", marginTop:"20px"}}><Post postObject={singlePost} allComments={true}/></Box> : <Loading />
}
