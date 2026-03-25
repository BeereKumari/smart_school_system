"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useLogout() {

 const router = useRouter();
 const [loading,setLoading] = useState(false);

 async function logout(){

  try{

   setLoading(true);

   await fetch("/api/auth/logout",{
    method:"POST",
    credentials:"include"
   });

   router.push("/login/admin");

  }
  catch(error){
   console.error("Logout error:",error);
  }
  finally{
   setLoading(false);
  }

 }

 return {logout,loading};
}