"use client"
import { store } from '@/lib/store'
import React from 'react'
import { useSelector } from 'react-redux'



export default function Profile() {
    let {userToken,userData} = useSelector((state: ReturnType<typeof store.getState>) => state.auth)
  return <>
  
  </>
}
