"use client";

import { useRouter } from "next/navigation";
import styles from "@/app/styles/Dashboard.module.css";


export default function ParentDashboard(){

 const router = useRouter()

 async function handleLogout(){

  await fetch("/api/auth/logout",{
   method:"POST"
  })

  router.push("/login")

 }

 return(

  <div style={{padding:"40px"}}>

   <div style={{display:"flex",justifyContent:"space-between"}}>

    <h1>Parent Dashboard</h1>

    <button onClick={handleLogout}>
     Logout
    </button>

   </div>

  </div>

 )

}