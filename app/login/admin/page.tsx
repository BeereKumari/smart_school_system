"use client"

import { useState, useEffect } from "react"
import styles from "../../styles/login.module.css"
import { FaEye, FaEyeSlash } from "react-icons/fa"

import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/app/lib/firebase"

export default function AdminLogin(){

 const [show,setShow]=useState(false)

 const [email,setEmail]=useState("")
 const [password,setPassword]=useState("")

 const [message,setMessage]=useState("")
 const [type,setType]=useState("")


 /* GOOGLE LOGIN HANDLER */




 /* NORMAL LOGIN */

 async function handleSubmit(e: React.FormEvent<HTMLFormElement>){

  e.preventDefault()

  const res = await fetch("/api/auth/login",{
   method:"POST",
   credentials:"include",
   headers:{
    "Content-Type":"application/json"
   },
   body:JSON.stringify({
    email,
    password,
    role:"admin"
   })
  })

  const data = await res.json()

  console.log("LOGIN RESPONSE:",data)


  if(data.success){

   setType("success")
   setMessage("Login successful! Redirecting to Admin Dashboard")


   setTimeout(()=>{
    window.location.href = data.redirect
   },1500)

  }

  else{

   setType("error")
   setMessage("Invalid credentials. Please try again.")

   setEmail("")
   setPassword("")

   setTimeout(()=>{
    setMessage("")
   },3000)

  }

 }



 function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>){
  setEmail(e.target.value)
  setMessage("")
 }

 function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>){
  setPassword(e.target.value)
  setMessage("")
 }



 return(

  <div className={styles.container}>

   <div className={styles.loginCard}>

    <h2 className={styles.title}>Admin Login</h2>

    <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">

     <input
      type="email"
      placeholder="Admin Email"
      value={email}
      required
      autoComplete="new-email"
      onChange={handleEmailChange}
     />


     <div className={styles.passwordBox}>

      <input
       type={show ? "text":"password"}
       placeholder="Password"
       value={password}
       required
       autoComplete="new-password"
       onChange={handlePasswordChange}
      />

      <span
       className={styles.eye}
       onClick={()=>setShow(!show)}
      >
       {show ? <FaEyeSlash/> : <FaEye/>}
      </span>

     </div>


     {message && (
      <div className={`${styles.statusBox} ${type==="success" ? styles.success : styles.error}`}>
       {message}
      </div>
     )}


     <button type="submit">Login</button>


     {/* GOOGLE LOGIN */}



     <div className={styles.links}>
      <a href="/login/forgot-password">Forgot Password?</a>
     </div>

    </form>

   </div>

  </div>

 )
}