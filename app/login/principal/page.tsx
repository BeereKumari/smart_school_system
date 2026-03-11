"use client"

import {useState} from "react"
import {useRouter} from "next/navigation"
import styles from "../../styles/login.module.css"
import {FaEye,FaEyeSlash} from "react-icons/fa"

export default function PrincipalLogin(){

 const router = useRouter()

 const [show,setShow]=useState(false)

 const [email,setEmail]=useState("")
 const [password,setPassword]=useState("")

 const [message,setMessage]=useState("")
 const [type,setType]=useState("")

 async function handleSubmit(e:any){

  e.preventDefault()

  const res = await fetch("/api/auth/login",{

   method:"POST",

   headers:{
    "Content-Type":"application/json"
   },

   body:JSON.stringify({
    email,
    password,
    role:"principal"
   })

  })

  const data = await res.json()

  if(data.success){

   setType("success")
   setMessage("Login successful! Redirecting to Principal Dashboard...")

   setTimeout(()=>{
    router.push(data.redirect)
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

 /* clear message when typing */

 function handleEmailChange(e:any){
  setEmail(e.target.value)
  setMessage("")
 }

 function handlePasswordChange(e:any){
  setPassword(e.target.value)
  setMessage("")
 }

 return(

  <div className={styles.container}>

   <div className={styles.loginCard}>

    <h2 className={styles.title}>Principal Login</h2>

    <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">

     <input
      type="email"
      placeholder="Teacher Email"
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

     {/* MESSAGE BOX */}

     {message && (
      <div className={`${styles.statusBox} ${type==="success" ? styles.success : styles.error}`}>
       {message}
      </div>
     )}

     <button type="submit">Login</button>

     <div className={styles.links}>
      <a href="#">Forgot Password?</a>
     </div>

    </form>

   </div>

  </div>

 )
}