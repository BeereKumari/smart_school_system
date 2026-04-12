"use client"

import { useState,useEffect } from "react"
import OTPInput from "@/app/components/otp/OTPInput"
import styles from "@/app/styles/ForgotPassword.module.css"
import { useRouter } from "next/navigation"
import { FaLock, FaKey, FaCheckCircle, FaArrowLeft } from "react-icons/fa"

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

<div className={styles.bgOverlay}></div>
<div className={styles.bgPattern}></div>

<div className={`${styles.floatingOrb} ${styles.orb1}`}></div>
<div className={`${styles.floatingOrb} ${styles.orb2}`}></div>

<div className={styles.card}>

<h2 className={styles.title}>Forgot Password</h2>
<p className={styles.subtitle}>Enter your email to receive a verification code</p>


{/* PROGRESS BAR */}

<div className={styles.progressWrapper}>

<div className={styles.progressBar}>
<div
className={styles.progressFill}
style={{ width: `${(step-1)*50}%` }}
></div>
</div>

<div className={styles.steps}>

<div className={`${styles.step} ${step>=1 ? styles.active : ''} ${step>1 ? styles.completed : ''}`}>
 <div className={styles.stepNumber}>{step>1 ? <FaCheckCircle /> : '1'}</div>
 <span className={styles.stepLabel}>Email</span>
</div>

<div className={`${styles.step} ${step>=2 ? styles.active : ''} ${step>2 ? styles.completed : ''}`}>
 <div className={styles.stepNumber}>{step>2 ? <FaCheckCircle /> : '2'}</div>
 <span className={styles.stepLabel}>Verify</span>
</div>

<div className={`${styles.step} ${step>=3 ? styles.active : ''} ${step>3 ? styles.completed : ''}`}>
 <div className={styles.stepNumber}>{step>3 ? <FaCheckCircle /> : '3'}</div>
 <span className={styles.stepLabel}>Reset</span>
</div>

<div className={`${styles.step} ${step>=4 ? styles.active : ''}`}>
 <div className={styles.stepNumber}>4</div>
 <span className={styles.stepLabel}>Done</span>
</div>

</div>

</div>



{/* EMAIL STEP */}

{step===1 &&(

<div className={styles.form}>

<div className={styles.inputGroup}>

<label className={styles.inputLabel}>Email Address</label>

<input
 type="email"
 className={styles.input}
 placeholder="Enter your registered email"
 required
 value={email}
 onChange={(e)=>setEmail(e.target.value)}
/>

</div>

<button
className={styles.button}
onClick={sendOTP}
>
 <FaKey style={{marginRight: '8px'}} />
 Send OTP
</button>

</div>

)}



{/* OTP STEP */}

{step===2 &&(

<div className={styles.form}>

<OTPInput value={otp} setValue={setOtp}/>

<p className={styles.timer}>
 Resend OTP in {timer}s
</p>

<button
className={styles.button}
onClick={verifyOTP}
>
 <FaCheckCircle style={{marginRight: '8px'}} />
 Verify OTP
</button>

</div>

)}



{/* RESET PASSWORD STEP */}

{step===3 &&(

<div className={styles.form}>

<div className={styles.inputGroup}>

<label className={styles.inputLabel}>New Password</label>

<div className={styles.passwordBox}>

<input
 type={showPassword ? "text" : "password"}
 className={styles.input}
 value={password}
 onChange={(e)=>setPassword(e.target.value)}
 placeholder="Enter new password"
/>

<span
className={styles.eye}
onClick={()=>setShowPassword(!showPassword)}
>
 {showPassword ? "👁" : "🔒"}
</span>

</div>

</div>

<button
className={styles.button}
onClick={resetPassword}
>
 <FaLock style={{marginRight: '8px'}} />
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


<div className={styles.backLink}>
 <a href="/login">
  <span className={styles.backIcon}><FaArrowLeft /></span>
  Back to Login
 </a>
</div>

</div>

</div>

)
}
