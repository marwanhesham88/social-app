"use client"
import { userRegister } from '@/lib/authslice';
import { store } from '@/lib/store';
import { Button, Container } from '@mui/material'
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';



export default function Register() {
let router = useRouter()
    let dispatch = useDispatch<typeof store.dispatch>()

    let formik = useFormik({
        initialValues:{
            name: "",
            email:"",
            password:"",
            rePassword:"",
            dateOfBirth:"",
            gender:""
        },
        onSubmit: (values) => {
            console.log(values); 
            dispatch(userRegister(values))
            .then((res)=>{
                if (res.payload.message == "success") {
                    toast.success("Welcome")
                    router.push("/")
                }else{
                    toast.error(res.payload)
                }
            })
            .catch((err)=> err)
        }
    })
  return <>
  <Container maxWidth="sm" sx={{marginBlock:"20px"}}>
    <Paper elevation={20} sx={{ padding:"15px" }}>
        <form onSubmit={formik.handleSubmit} style={{display:"flex", flexDirection:"column", gap:"10px"}}>
    <TextField value={formik.values.name} onChange={formik.handleChange} name='name' id="name" label="Name" variant="outlined" />
    <TextField value={formik.values.email} onChange={formik.handleChange} name='email' id="email" label="Email" variant="outlined" />
    <TextField value={formik.values.password} onChange={formik.handleChange} name='password' id="password" label="Password" variant="outlined" />
    <TextField value={formik.values.rePassword} onChange={formik.handleChange} name='rePassword' id="rePassword" label="RePassword" variant="outlined" />
    <TextField value={formik.values.dateOfBirth} onChange={formik.handleChange} name='dateOfBirth' id="dateOfBirth" label="DateOfBirth" variant="outlined" />
    <TextField value={formik.values.gender} onChange={formik.handleChange} name='gender' id="gender" label="Gender" variant="outlined" />
    <Button type='submit' sx={{backgroundColor:"#1976d2", color:"white", borderRadius:"10px",border:"1px solid transparent", ":hover":{color:"#1976d2",backgroundColor:"white", border:"1px solid #1976d2"}}}>Register</Button>
        </form>
   
    </Paper>
  </Container>
  </>
}
