"use client";

import { useEffect, useState } from "react";
import styles from "../../styles/AdminAdmissions.module.css";
import { FaClipboardList, FaUserPlus, FaSearch, FaUsers, FaClock, FaCheckCircle, FaTimesCircle, FaUserGraduate, FaFileAlt } from "react-icons/fa";

type ManualAdmissionForm = {
  studentName: string;
  dob: string;
  gender: string;
  classApplying: string;
  fatherName: string;
  motherName: string;
  phone: string;
  email: string;
  studentPhoto: File | null;
};

export default function AdminAdmissions() {

const [admissions,setAdmissions] = useState<any[]>([])
const [loading,setLoading] = useState(true)

const [search,setSearch] = useState("")
const [activeFilter,setActiveFilter] = useState("all")

const [selectedStudent,setSelectedStudent] = useState<any>(null)

const [showForm,setShowForm] = useState(false)
const [saving,setSaving] = useState(false)

const [message,setMessage] = useState({
show:false,
text:"",
type:"success"
})

const [form,setForm] = useState<ManualAdmissionForm>({
studentName:"",
dob:"",
gender:"",
classApplying:"",
fatherName:"",
motherName:"",
phone:"",
email:"",
studentPhoto:null
})

const [stats,setStats] = useState({
total:0,
pending:0,
approved:0,
declined:0
})

useEffect(()=>{
loadAdmissions()
},[])

async function loadAdmissions(){

try{

const res = await fetch("/api/admission",{cache:"no-store"})
const data = await res.json()

setAdmissions(data)

const total = data.length
const pending = data.filter((a:any)=>a.status==="pending").length
const approved = data.filter((a:any)=>a.status==="approved").length
const declined = data.filter((a:any)=>a.status==="declined").length

setStats({total,pending,approved,declined})

}catch(error){

console.error(error)

}finally{

setLoading(false)

}

}

async function approve(id:string){

  try{

    setAdmissions(prev =>
      prev.map(a =>
        a._id === id ? { ...a, status: "approved" } : a
      )
    )

    await fetch(`/api/admission/approve/${id}`,{ method:"POST" })

    loadAdmissions()

  }catch(error){

    console.error(error)

  }

}

async function decline(id:string){

  try{

    setAdmissions(prev =>
      prev.map(a =>
        a._id === id ? { ...a, status: "declined" } : a
      )
    )

    await fetch(`/api/admission/decline/${id}`,{ method:"POST" })

    loadAdmissions()

  }catch(error){

    console.error(error)

  }

}
function showMsg(text:string,type:"success"|"error"="success"){

setMessage({show:true,text,type})

setTimeout(()=>{
setMessage({show:false,text:"",type:"success"})
},3000)

}

async function handleManualAdmission(e:any){

e.preventDefault()
setSaving(true)

try{

const formData = new FormData()

Object.entries(form).forEach(([key,value])=>{
if(value){
formData.append(key,value as any)
}
})

const res = await fetch("/api/admission/manual",{
method:"POST",
body:formData
})

const data = await res.json()

if(!res.ok){
showMsg(data.message || "Failed","error")
setSaving(false)
return
}

showMsg("Admission Added Successfully","success")

setShowForm(false)

setForm({
studentName:"",
dob:"",
gender:"",
classApplying:"",
fatherName:"",
motherName:"",
phone:"",
email:"",
studentPhoto:null
})

loadAdmissions()

}catch(error){
console.error(error)
showMsg("Something went wrong","error")
}

setSaving(false)

}

function formatDate(date:string){
const d = new Date(date)
return d.toLocaleString("en-IN",{
day:"2-digit",
month:"short",
year:"numeric",
hour:"2-digit",
minute:"2-digit"
})
}

const filteredAdmissions = admissions
.filter((a:any)=>{
if(activeFilter==="all") return true
return a.status===activeFilter
})
.filter((a:any)=>
a.studentName?.toLowerCase().includes(search.toLowerCase()) ||
a.email?.toLowerCase().includes(search.toLowerCase())
)

 return(

<div className={styles.container}>

<div className={styles.headerRow}>

<h1 className={styles.title}>
<FaClipboardList />
Student Admission Requests
</h1>

<button
className={styles.addBtn}
onClick={()=>setShowForm(true)}
>
<FaUserPlus />
Add Admission
</button>

</div>

{message.show && (
<div className={`${styles.message} ${styles[message.type]}`}>
<span>{message.type==="success" ? "✓" : "!"}</span>
<p>{message.text}</p>
</div>
)}

<div className={styles.searchFilterRow}>

<input
className={styles.searchInput}
placeholder="Search by name or email..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

</div>

<div className={styles.statsGrid}>

<div
onClick={()=>setActiveFilter("all")}
className={`${styles.statCard} ${activeFilter==="all"?styles.activeStat:""}`}
>
<div className={styles.statIcon}>
<FaUsers />
</div>
<div className={styles.statContent}>
<p className={styles.statLabel}>All</p>
<p className={styles.statValue}>{stats.total}</p>
</div>
</div>

<div
onClick={()=>setActiveFilter("pending")}
className={`${styles.statCard} ${activeFilter==="pending"?styles.activeStat:""}`}
>
<div className={styles.statIcon}>
<FaClock />
</div>
<div className={styles.statContent}>
<p className={styles.statLabel}>Pending</p>
<p className={styles.statValue}>{stats.pending}</p>
</div>
</div>

<div
onClick={()=>setActiveFilter("approved")}
className={`${styles.statCard} ${activeFilter==="approved"?styles.activeStat:""}`}
>
<div className={styles.statIcon}>
<FaCheckCircle />
</div>
<div className={styles.statContent}>
<p className={styles.statLabel}>Approved</p>
<p className={styles.statValue}>{stats.approved}</p>
</div>
</div>

<div
onClick={()=>setActiveFilter("declined")}
className={`${styles.statCard} ${activeFilter==="declined"?styles.activeStat:""}`}
>
<div className={styles.statIcon}>
<FaTimesCircle />
</div>
<div className={styles.statContent}>
<p className={styles.statLabel}>Declined</p>
<p className={styles.statValue}>{stats.declined}</p>
</div>
</div>

</div>

{loading ? (
<div className={styles.loading}>
<div className={styles.loadingSpinner}></div>
</div>
) : filteredAdmissions.length === 0 ? (
<div className={styles.emptyState}>
<FaFileAlt />
<p>No admissions found</p>
</div>
) : (

<div className={styles.grid}>

{filteredAdmissions.map((a)=>(
<div key={a._id} className={styles.card} onClick={()=>setSelectedStudent(a)}>

<div className={styles.cardHeader}>

<div className={styles.photoWrapper}>
<img src={a.studentPhoto || "/default-avatar.png"} className={styles.studentPhoto} alt={a.studentName}/>
</div>

<div className={styles.studentInfo}>
<h3>{a.studentName}</h3>
<span className={`${styles.status} ${styles[a.status]}`}>
{a.status}
</span>
</div>

</div>

<div className={styles.cardBody}>

<div className={styles.detailRow}>
<span>Class</span>
<p>{a.classApplying}</p>
</div>

<div className={styles.detailRow}>
<span>DOB</span>
<p>{a.dob}</p>
</div>

<div className={styles.detailRow}>
<span>Gender</span>
<p>{a.gender}</p>
</div>

<div className={styles.detailRow}>
<span>Father</span>
<p>{a.fatherName}</p>
</div>

<div className={styles.detailRow}>
<span>Email</span>
<p>{a.email}</p>
</div>

<div className={styles.detailRow}>
<span>Phone</span>
<p>{a.phone}</p>
</div>

</div>

<div className={styles.cardFooter} onClick={(e)=>e.stopPropagation()}>

{a.status==="pending" && (
<div className={styles.actionButtons}>

<button 
  onClick={()=>approve(a._id)} 
  className={styles.approveBtn}
>
  ✓ Approve
</button>

<button 
  onClick={()=>decline(a._id)} 
  className={styles.declineBtn}
>
  ✕ Decline
</button>

</div>
)}

{a.status==="approved" && (
<button className={styles.approvedBtn}>✓ Approved</button>
)}

{a.status==="declined" && (
<button className={styles.declinedBtn}>✕ Declined</button>
)}

</div>

</div>
))}

</div>

)}

{selectedStudent && (

<div className={styles.modalOverlay} onClick={()=>setSelectedStudent(null)}>

<div className={styles.formModal} onClick={(e)=>e.stopPropagation()}>

<div className={styles.formHeader}>

<h2>Student Details</h2>

<button 
className={styles.closeIcon}
onClick={()=>setSelectedStudent(null)}
>
✕
</button>

</div>

<div style={{ textAlign: 'center', marginBottom: '20px' }}>
<div className={styles.photoWrapper} style={{ width: '90px', height: '90px', margin: '0 auto 14px' }}>
<img src={selectedStudent.studentPhoto || "/default-avatar.png"} className={styles.studentPhoto} alt={selectedStudent.studentName}/>
</div>
<h3 style={{ color: '#1e3a5f', margin: '0 0 6px 0', fontSize: '18px' }}>{selectedStudent.studentName}</h3>
<p style={{ color: '#64748b', margin: 0, fontSize: '13px' }}>{selectedStudent.email}</p>
</div>

<div className={styles.cardBody}>
<div className={styles.detailRow}>
<span>Class</span>
<p>{selectedStudent.classApplying}</p>
</div>
<div className={styles.detailRow}>
<span>DOB</span>
<p>{selectedStudent.dob}</p>
</div>
<div className={styles.detailRow}>
<span>Gender</span>
<p>{selectedStudent.gender}</p>
</div>
<div className={styles.detailRow}>
<span>Father</span>
<p>{selectedStudent.fatherName}</p>
</div>
<div className={styles.detailRow}>
<span>Mother</span>
<p>{selectedStudent.motherName}</p>
</div>
<div className={styles.detailRow}>
<span>Phone</span>
<p>{selectedStudent.phone}</p>
</div>
<div className={styles.detailRow}>
<span>Status</span>
<p style={{ textTransform: 'capitalize' }}>{selectedStudent.status}</p>
</div>
<div className={styles.detailRow}>
<span>Applied</span>
<p>{formatDate(selectedStudent.createdAt)}</p>
</div>
</div>

<div className={styles.formActions}>
<button 
className={styles.cancelBtn}
onClick={()=>setSelectedStudent(null)}
>
Close
</button>
</div>

</div>

</div>

)}

{showForm && (

<div 
className={styles.modalOverlay}
onClick={()=>setShowForm(false)}
>

<div 
className={styles.formModal}
onClick={(e)=>e.stopPropagation()}
>

<div className={styles.formHeader}>

<h2>Add Student Admission</h2>

<button 
className={styles.closeIcon}
onClick={()=>setShowForm(false)}
>
✕
</button>

</div>

<form onSubmit={handleManualAdmission}>

<input 
placeholder="Student Name" 
required
value={form.studentName}
onChange={(e)=>setForm({...form,studentName:e.target.value})}
/>

<input type="date"
value={form.dob}
onChange={(e)=>setForm({...form,dob:e.target.value})}
/>

<select
value={form.gender}
onChange={(e)=>setForm({...form,gender:e.target.value})}
required
>
<option value="">Select Gender</option>
<option value="Male">Male</option>
<option value="Female">Female</option>
</select>

<input placeholder="Class Applying" required
value={form.classApplying}
onChange={(e)=>setForm({...form,classApplying:e.target.value})}
/>

<input placeholder="Father Name" required
value={form.fatherName}
onChange={(e)=>setForm({...form,fatherName:e.target.value})}
/>

<input placeholder="Mother Name" required
value={form.motherName}
onChange={(e)=>setForm({...form,motherName:e.target.value})}
/>

<input placeholder="Phone" required
value={form.phone}
onChange={(e)=>setForm({...form,phone:e.target.value})}
/>

<input placeholder="Email" required
value={form.email}
onChange={(e)=>setForm({...form,email:e.target.value})}
/>

<input
type="file"
accept="image/*"
required
onChange={(e)=>{
const file = e.target.files?.[0] || null
setForm({...form,studentPhoto:file})
}}
/>

<div className={styles.formActions}>

<button type="button"
className={styles.cancelBtn}
 onClick={()=>setShowForm(false)}>
Cancel
</button>

<button type="submit"
className={styles.submitBtn}
 disabled={saving}>
{saving ? "Saving..." : "Save Admission"}
</button>

</div>

</form>

</div>

</div>

)}

</div>

)

}
