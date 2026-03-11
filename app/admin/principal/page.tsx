"use client"

import {useEffect,useState} from "react"
import styles from "@/app/styles/principal.module.css"

export default function Principal(){

 const [principal,setPrincipal] = useState<any>(null)

 const [form,setForm] = useState({
  name:"",
  email:"",
  password:"",
  phone:""
 })

 useEffect(()=>{
  fetchPrincipal()
 },[])

 async function fetchPrincipal(){

  const res = await fetch("/api/principal")

  const data = await res.json()

  setPrincipal(data[0])

 }

 async function handleSubmit(e:any){

  e.preventDefault()

  await fetch("/api/principal",{
   method:"POST",
   body:JSON.stringify(form)
  })

  fetchPrincipal()

 }

 return(

  <div>

   <h1 className={styles.title}>Principal Management</h1>

   {!principal && (

   <form className={styles.form} onSubmit={handleSubmit}>

    <input placeholder="Name"
    onChange={(e)=>setForm({...form,name:e.target.value})}/>

    <input placeholder="Email"
    onChange={(e)=>setForm({...form,email:e.target.value})}/>

    <input placeholder="Password"
    onChange={(e)=>setForm({...form,password:e.target.value})}/>

    <input placeholder="Phone"
    onChange={(e)=>setForm({...form,phone:e.target.value})}/>

    <button>Add Principal</button>

   </form>

   )}

   {principal && (

   <div className={styles.card}>

    <h3>{principal.name}</h3>

    <p>{principal.email}</p>

    <p>{principal.phone}</p>

   </div>

   )}

  </div>

 )

}