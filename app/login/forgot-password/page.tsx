"use client"

import { useState,useEffect } from "react"
import OTPInput from "@/app/components/otp/OTPInput"
import styles from "@/app/styles/ForgotPassword.module.css"
import { useRouter } from "next/navigation"

export default function ForgotPassword(){

const router = useRouter()

const [step,setStep] = useState(1)

const [email,setEmail] = useState("")
const [otp,setOtp] = useState("")
const [password,setPassword] = useState("")

const [message,setMessage] = useState("")

const [timer,setTimer] = useState(60)
const [showPassword,setShowPassword] = useState(false)

const [countdown,setCountdown] = useState(5)
const [role,setRole] = useState("")


/* OTP TIMER */

useEffect(()=>{

 if(step===2 && timer>0){

  const interval=setInterval(()=>{
   setTimer(prev=>prev-1)
  },1000)

  return ()=>clearInterval(interval)

 }

},[timer,step])



/* SUCCESS REDIRECT TIMER */

useEffect(()=>{

 if(step===4 && countdown>0){

  const timer=setTimeout(()=>{
   setCountdown(prev=>prev-1)
  },1000)

  return ()=>clearTimeout(timer)

 }

 if(step===4 && countdown===0){

  router.push(`/login/${role}`)

 }

},[step,countdown,router,role])



async function sendOTP(){

 setMessage("")

 const res = await fetch("/api/auth/forgot-password",{

  method:"POST",

  headers:{
   "Content-Type":"application/json"
  },

  body:JSON.stringify({email})

 })

 const data = await res.json()

 if(data.success){

  setRole(data.role)

  setStep(2)
  setTimer(60)

  setMessage("OTP sent to your email")

 }else{

  setMessage(data.message)

 }

}



async function verifyOTP(){

 setMessage("")

 const res = await fetch("/api/auth/verify-otp",{

  method:"POST",

  headers:{
   "Content-Type":"application/json"
  },

  body:JSON.stringify({email,otp})

 })

 const data = await res.json()

 if(data.success){

  setStep(3)

 }else{

  setMessage("Invalid OTP")

 }

}



async function resetPassword(){

 setMessage("")

 const res = await fetch("/api/auth/reset-password",{

  method:"POST",

  headers:{
   "Content-Type":"application/json"
  },

  body:JSON.stringify({

   email,
   newPassword:password

  })

 })

 const data = await res.json()

 if(data.success){

  setStep(4)
  setCountdown(5)

 }

}



return(

<div className={styles.container}>

<div className={styles.card}>

<h2>Forgot Password</h2>


{/* PROGRESS BAR */}

<div className={styles.progressWrapper}>

<div className={styles.progressBar}>
<div
className={styles.progressFill}
style={{ width: `${(step-1)*50}%` }}
></div>
</div>

<div className={styles.steps}>

<span className={step>=1?styles.active:""}>Email</span>
<span className={step>=2?styles.active:""}>OTP</span>
<span className={step>=3?styles.active:""}>Reset</span>
<span className={step>=4?styles.active:""}>Success</span>

</div>

</div>



{/* EMAIL STEP */}

{step===1 &&(

<div className={styles.field}>

<input
required
onChange={(e)=>setEmail(e.target.value)}
/>

<label>Email</label>

<button
className={styles.button}
onClick={sendOTP}
>
Send OTP
</button>

</div>

)}



{/* OTP STEP */}

{step===2 &&(

<>

<OTPInput value={otp} setValue={setOtp}/>

<p className={styles.timer}>
Resend OTP in {timer}s
</p>

<button
className={styles.button}
onClick={verifyOTP}
>
Verify OTP
</button>

</>

)}



{/* RESET PASSWORD STEP */}

{step===3 &&(

<div className={styles.field}>

<div className={styles.passwordBox}>

<input
type={showPassword ? "text" : "password"}
value={password}
onChange={(e)=>setPassword(e.target.value)}
placeholder="New Password"
/>

<span
className={styles.eye}
onClick={()=>setShowPassword(!showPassword)}
>
{showPassword ? " " : "👁"}
</span>

</div>

<label>New Password</label>

<button
className={styles.button}
onClick={resetPassword}
>
Reset Password
</button>

</div>

)}



{/* SUCCESS STEP */}

{step===4 &&(

<div className={styles.successBox}>

<div className={styles.checkmark}></div>

<h3>Password Reset Successfully</h3>

<p className={styles.redirectText}>
Redirecting to login in {countdown} seconds...
</p>

</div>

)}



<p className={styles.message}>{message}</p>


</div>

</div>

)

}