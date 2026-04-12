"use client"

import { useState, useEffect } from "react"
import styles from "../../styles/login.module.css"
import { FaEye, FaEyeSlash, FaChalkboardTeacher } from "react-icons/fa"
import { useRouter } from "next/navigation"

export default function TeacherLogin(){

 const router = useRouter()
 const [show,setShow]=useState(false)
 const [email,setEmail]=useState("")
 const [password,setPassword]=useState("")
 const [message,setMessage]=useState("")
 const [type,setType]=useState("")
 const [loading, setLoading] = useState(false)

 useEffect(() => {
  const checkAuth = async () => {
   try {
    const res = await fetch("/api/auth/me", { credentials: "include" })
    if (res.ok) {
     const data = await res.json()
     if (data.role === "teacher") {
      router.push("/teacher/dashboard")
     }
    }
   } catch (e) {}
  }
  checkAuth()
 }, [router])

 async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
  e.preventDefault()
  setLoading(true)

  const res = await fetch("/api/auth/login", {
   method:"POST",
   credentials:"include",
   headers:{ "Content-Type":"application/json" },
   body:JSON.stringify({
    email,
    password,
    role:"teacher"
   })
  })

  const data = await res.json()

  if(data.success){
   setType("success")
   setMessage("Login successful! Redirecting to Teacher Dashboard...")
   setTimeout(()=>{
    window.location.href = "/teacher/dashboard"
   },1500)
  }
  else{
   setType("error")
   setMessage(data.message || "Invalid credentials. Please try again.")
   setEmail("")
   setPassword("")
   setTimeout(()=>{
    setMessage("")
   },4000)
  }
  setLoading(false)
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
   <div className={styles.bgOverlay}></div>
   <div className={styles.bgPattern}></div>
   <div className={`${styles.floatingOrb} ${styles.orb1}`}></div>
   <div className={`${styles.floatingOrb} ${styles.orb2}`}></div>
   <div className={`${styles.floatingOrb} ${styles.orb3}`}></div>

   <div className={styles.loginCard}>
    <div className={styles.cardHeader}>
     <div className={styles.roleIcon}>
      <FaChalkboardTeacher className={styles.roleIconInner} />
     </div>
     <h2 className={styles.title}>Welcome Back</h2>
     <p className={styles.subtitle}>Sign in to <span>Teacher Portal</span></p>
    </div>

     <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
      <div className={styles.inputGroup}>
       <label className={styles.inputLabel}>Email Address</label>
       <input
        type="email"
        className={styles.input}
        placeholder="teacher@school.edu"
        value={email}
        required
        autoComplete="new-email"
        onChange={handleEmailChange}
       />
      </div>

      <div className={styles.inputGroup}>
       <label className={styles.inputLabel}>Password</label>
       <div className={styles.passwordBox}>
        <input
         type={show ? "text":"password"}
         className={styles.input}
         placeholder="Enter your password"
         value={password}
         required
         autoComplete="new-password"
         onChange={handlePasswordChange}
        />
        <span className={styles.eye} onClick={()=>setShow(!show)}>
         {show ? <FaEyeSlash/> : <FaEye/>}
        </span>
       </div>
      </div>

      {message && (
       <div className={`${styles.statusBox} ${type==="success" ? styles.success : styles.error}`}>
        {message}
       </div>
      )}

      <button type="submit" className={styles.submitBtn} disabled={loading}>
       {loading ? "Signing In..." : "Sign In"}
      </button>

      <div className={styles.links}>
       <a href="/login/forgot-password">Forgot Password?</a>
      </div>
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
