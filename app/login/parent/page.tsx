"use client"

import { useState } from "react"
import styles from "../../styles/login.module.css"
import { FaUsers } from "react-icons/fa"

export default function ParentLogin(){

 const [studentId,setStudentId] = useState("")
 const [phone,setPhone] = useState("")
 const [message,setMessage] = useState("")
 const [type,setType] = useState("")
 const [loading, setLoading] = useState(false)

 async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
  e.preventDefault()
  setLoading(true)

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
   setMessage(data.message || "Invalid Parent Credentials")
   setStudentId("")
   setPhone("")
   setTimeout(()=>{
    setMessage("")
   },4000)
  }
  setLoading(false)
 }

 function handleStudentChange(e: React.ChangeEvent<HTMLInputElement>){
  setStudentId(e.target.value)
  setMessage("")
 }

 function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>){
  setPhone(e.target.value)
  setMessage("")
 }

 return(
  <div className={styles.container}>
   <div className={styles.bgOverlay}></div>
   <div className={styles.bgPattern}></div>
   <div className={`${styles.floatingOrb} ${styles.orb1}`}></div>
   <div className={`${styles.floatingOrb} ${styles.orb2}`}></div>
   <div className={`${styles.floatingOrb} ${styles.orb3}`}></div>

   <div className={styles.loginCard}>
    <div className={styles.cardHeader}>
     <div className={styles.roleIcon}>
      <FaUsers className={styles.roleIconInner} />
     </div>
     <h2 className={styles.title}>Welcome Back</h2>
     <p className={styles.subtitle}>Sign in to <span>Parent Portal</span></p>
    </div>

    <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
     <input type="text" style={{display:"none"}} />
     <input type="password" style={{display:"none"}} />

     <div className={styles.inputGroup}>
      <label className={styles.inputLabel}>Student ID</label>
      <input
       type="text"
       className={styles.input}
       placeholder="Enter your child's student ID"
       value={studentId}
       required
       autoComplete="new-ID"
       onChange={handleStudentChange}
      />
     </div>

     <div className={styles.inputGroup}>
      <label className={styles.inputLabel}>Registered Phone Number</label>
      <input
       type="tel"
       className={styles.input}
       placeholder="Enter registered phone number"
       value={phone}
       required
       autoComplete="new-number"
       onChange={handlePhoneChange}
      />
     </div>

     {message && (
      <div className={`${styles.statusBox} ${type==="success" ? styles.success : styles.error}`}>
       {message}
      </div>
     )}

     <button type="submit" className={styles.submitBtn} disabled={loading}>
      {loading ? "Signing In..." : "Sign In"}
     </button>
    </form>

    <div className={styles.backLink}>
     <a href="/login">
      <span className={styles.backIcon}>&larr;</span>
      Back to Portal Selection
     </a>
    </div>
   </div>
  </div>
 )
}
