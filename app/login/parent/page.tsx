"use client"

import {useState} from "react"
import {useRouter} from "next/navigation"
import styles from "../../styles/login.module.css"

export default function ParentLogin(){

 const router = useRouter()

 const [studentId,setStudentId] = useState("")
 const [phone,setPhone] = useState("")

 const [message,setMessage] = useState("")
 const [type,setType] = useState("")

 async function handleSubmit(e:any){

  e.preventDefault()

  const res = await fetch("/api/auth/login",{

   method:"POST",
   credentials: "include",

   headers:{
    "Content-Type":"application/json"
   },

   body:JSON.stringify({
    studentId,
    phone,
    role:"parent"
   })

  })

  const data = await res.json()

  if(data.success){

   setType("success")
   setMessage("Login successful! Redirecting to Parent Portal...")

   setTimeout(()=>{
    window.location.href = data.redirect
   },1500)

  }

  else{

   setType("error")
   setMessage("Invalid Parent Credentials")

   setStudentId("")
   setPhone("")

   setTimeout(()=>{
    setMessage("")
   },3000)

  }

 }

 function handleStudentChange(e:any){
  setStudentId(e.target.value)
  setMessage("")
 }

 function handlePhoneChange(e:any){
  setPhone(e.target.value)
  setMessage("")
 }

 return(

  <div className={styles.container}>

   <div className={styles.loginCard}>

    <h2 className={styles.title}>Parent Portal</h2>

    <form
     className={styles.form}
     onSubmit={handleSubmit}
     autoComplete="off"
    >

     {/* hidden fields to stop autofill */}

     <input type="text" style={{display:"none"}} />
     <input type="password" style={{display:"none"}} />

     <input
      type="text"
      placeholder="Student ID"
      value={studentId}
      required
      autoComplete="new-ID"
      onChange={handleStudentChange}
     />

     <input
      type="tel"
      placeholder="Registered Phone Number"
      value={phone}
      required
      autoComplete="new-number"
      onChange={handlePhoneChange}
     />

     {/* STATUS MESSAGE */}

     {message && (
      <div className={`${styles.statusBox} ${type==="success" ? styles.success : styles.error}`}>
       {message}
      </div>
     )}

     <button type="submit">
      Login
     </button>

    </form>

   </div>

  </div>

 )
}