"use client";

import { useState } from "react";
import styles from "../../styles/loginPortal.module.css";

export default function LoginForm({
  role,
  fields
}:{
  role:string,
  fields:any[]
}){

  const [form,setForm] = useState<any>({})

  function handleChange(name:string,value:string){
    setForm({...form,[name]:value})
  }

  async function handleSubmit(e:any){

    e.preventDefault()

    const res = await fetch(`/api/auth/${role}-login`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(form)
    })

    const data = await res.json()

    if(res.ok){
      window.location.href=`/${role}/dashboard`
    }else{
      alert(data.message)
    }

  }

  return(

    <form className={styles.form} onSubmit={handleSubmit}>

      {fields.map((f:any)=>(
        <input
          key={f.name}
          type={f.type}
          placeholder={f.placeholder}
          required
          onChange={(e)=>handleChange(f.name,e.target.value)}
        />
      ))}

      <button>Login</button>

      <div className={styles.links}>
        <a href="#">Forgot Password?</a>
      </div>

    </form>

  )

}