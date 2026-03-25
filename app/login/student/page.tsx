"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import styles from "../../styles/login.module.css"

export default function StudentLogin(){

 const router = useRouter()

 const [studentId,setStudentId] = useState("")
 const [dob,setDob] = useState("")

 const [message,setMessage] = useState("")
 const [type,setType] = useState<"success" | "error" | "">("")

 async function handleSubmit(e:any){

  e.preventDefault()

  setMessage("")
  setType("")

  try{

   const res = await fetch("/api/auth/login",{
    method:"POST",
    credentials: "include",
    headers:{
     "Content-Type":"application/json"
    },
    body:JSON.stringify({
     studentId,
     dob,
     role:"student"
    })
   })

   const data = await res.json()

   if(data.success){

    setType("success")
    setMessage("Login successful! Redirecting to Student Dashboard...")

    setTimeout(()=>{
     window.location.href = data.redirect
    },1500)

   }else{

    setType("error")
    setMessage("Invalid Student Details. Please try again.")

    setStudentId("")
    setDob("")

    setTimeout(()=>{
     setMessage("")
    },3000)

   }

  }catch(error){

   setType("error")
   setMessage("Something went wrong. Try again.")

  }

 }

 function handleStudentChange(e:any){
  setStudentId(e.target.value)
  setMessage("")
 }

 function handleDobChange(e:any){
  setDob(e.target.value)
  setMessage("")
 }

 return(

  <div className={styles.container}>

   <div className={styles.loginCard}>

    <h2 className={styles.title}>Student Portal</h2>

    <form
     className={styles.form}
     onSubmit={handleSubmit}
     autoComplete="off"
    >

     {/* Prevent browser autofill */}

     <input type="text" style={{display:"none"}} />
     <input type="password" style={{display:"none"}} />

     <input
      type="text"
      placeholder="Student ID"
      value={studentId}
      required
      autoComplete="new-Id"
      onChange={handleStudentChange}
     />

     <input
      type="date"
      value={dob}
      required
      autoComplete="off"
      onChange={handleDobChange}
     />

     {/* MESSAGE BOX */}

     {message && (
      <div className={`${styles.statusBox} ${type==="success" ? styles.success : styles.error}`}>
       {message}
      </div>
     )}

     <button type="submit">Login</button>

    </form>

   </div>

  </div>

 )
}