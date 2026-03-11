"use client"

import {useState,useEffect} from "react"
import styles from "@/app/styles/Teachers.module.css"

export default function Teachers(){

  const [teachers,setTeachers] = useState([])
  const [form,setForm] = useState({
    name:"",
    email:"",
    password:"",
    phone:"",
    subject:""
  })

  useEffect(()=>{
    fetchTeachers()
  },[])

  async function fetchTeachers(){

    const res = await fetch("/api/teachers")

    const data = await res.json()

    setTeachers(data)

  }

  async function handleSubmit(e:any){

    e.preventDefault()

    await fetch("/api/teachers",{
      method:"POST",
      body:JSON.stringify(form)
    })

    fetchTeachers()

  }

  return(

    <div>

      <h1 className={styles.title}>Teachers</h1>

      <form className={styles.form} onSubmit={handleSubmit}>

        <input placeholder="Name" onChange={(e)=>setForm({...form,name:e.target.value})}/>

        <input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})}/>

        <input placeholder="Password" onChange={(e)=>setForm({...form,password:e.target.value})}/>

        <input placeholder="Phone" onChange={(e)=>setForm({...form,phone:e.target.value})}/>

        <input placeholder="Subject" onChange={(e)=>setForm({...form,subject:e.target.value})}/>

        <button>Add Teacher</button>

      </form>

      <table className={styles.table}>

        <thead>

          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
          </tr>

        </thead>

        <tbody>

          {teachers.map((t:any)=>(
            <tr key={t._id}>
              <td>{t.name}</td>
              <td>{t.email}</td>
              <td>{t.subject}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>

  )

}