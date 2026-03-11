"use client"

import { useEffect, useState } from "react"
import styles from "@/app/styles/students.module.css"

export default function Students(){

 const [students,setStudents] = useState<any[]>([])
 const [search,setSearch] = useState("")

 useEffect(()=>{
  fetchStudents()
 },[])

 async function fetchStudents(){

  try{

    const res = await fetch("/api/students")

    if(!res.ok){
      throw new Error("Failed to fetch students")
    }

    const data = await res.json()

    setStudents(data)

  }
  catch(error){

    console.error("Fetch students error:",error)

  }

}

 const filtered = students.filter((s)=>
  s.name.toLowerCase().includes(search.toLowerCase())
 )

 return(

  <div>

   <h1 className={styles.title}>Students</h1>

   <input
    placeholder="Search student..."
    className={styles.search}
    onChange={(e)=>setSearch(e.target.value)}
   />

   <table className={styles.table}>

    <thead>

     <tr>
      <th>Student ID</th>
      <th>Name</th>
      <th>Class</th>
      <th>Parent</th>
      <th>Status</th>
     </tr>

    </thead>

    <tbody>

     {filtered.map((s)=>(
      <tr key={s._id}>

       <td>{s.studentId}</td>

       <td>{s.name}</td>

       <td>{s.class}</td>

       <td>{s.parentId?.name}</td>

       <td>
        <span className={styles.active}>Active</span>
       </td>

      </tr>
     ))}

    </tbody>

   </table>

  </div>

 )

}