"use client"

import { useState } from "react"
import styles from "../styles/admissionForm.module.css"
import Link from "next/link"
import { motion } from "framer-motion"

export default function AdmissionPage(){

// STEP CONTROL
const [step,setStep] = useState(1)

// PHOTO PREVIEW
const [photo,setPhoto] = useState("")

// SUCCESS POPUP
const [success,setSuccess] = useState(false)

// FORM STATE (IMPORTANT)
const [formData,setFormData] = useState({

studentName:"",
dob:"",
gender:"",
classApplying:"",

fatherName:"",
motherName:"",
phone:"",
email:""

})


// NEXT / PREVIOUS
const next = ()=> setStep(step+1)
const prev = ()=> setStep(step-1)


// HANDLE INPUT CHANGE
const handleChange = (e:any)=>{

setFormData({
...formData,
[e.target.name]:e.target.value
})

}


// PHOTO PREVIEW
const handlePhoto = (e:any)=>{

const file = e.target.files[0]

if(file){
setPhoto(URL.createObjectURL(file))
}

}


// SUBMIT FORM
const handleSubmit = async (e:any)=>{

e.preventDefault()

try{

const res = await fetch("/api/admission",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(formData)

})

const result = await res.json()

console.log(result)

setSuccess(true)

}catch(error){

console.log("Submission Error:",error)

}

}


return(

<section className={styles.section}>


{/* BACK BUTTON */}

<Link href="/">
<button className={styles.back}>← Back to Home</button>
</Link>


<h1>School Admission Form</h1>


{/* PROGRESS BAR */}

<div className={styles.progress}>
<div style={{width: step===1?"33%":step===2?"66%":"100%"}}/>
</div>



<form className={styles.form} onSubmit={handleSubmit}>



{/* STEP 1 */}

{step===1 && (

<motion.div
initial={{opacity:0,x:50}}
animate={{opacity:1,x:0}}
transition={{duration:0.5}}
>

<h3>Student Details</h3>

<input
name="studentName"
placeholder="Student Name"
value={formData.studentName}
onChange={handleChange}
required
/>

<input
type="date"
name="dob"
value={formData.dob}
onChange={handleChange}
required
/>

<select
name="gender"
value={formData.gender}
onChange={handleChange}
required
>

<option value="">Select Gender</option>
<option value="Male">Male</option>
<option value="Female">Female</option>

</select>

<select
name="classApplying"
value={formData.classApplying}
onChange={handleChange}
required
>

<option value="">Class Applying For</option>
<option value="Grade 1">Grade 1</option>
<option value="Grade 2">Grade 2</option>
<option value="Grade 3">Grade 3</option>
<option value="Grade 4">Grade 4</option>

</select>

<button
type="button"
onClick={next}
className={styles.next}
>

Next

</button>

</motion.div>

)}



{/* STEP 2 */}

{step===2 && (

<motion.div
initial={{opacity:0,x:50}}
animate={{opacity:1,x:0}}
transition={{duration:0.5}}
>

<h3>Parent Details</h3>

<input
name="fatherName"
placeholder="Father Name"
value={formData.fatherName}
onChange={handleChange}
/>

<input
name="motherName"
placeholder="Mother Name"
value={formData.motherName}
onChange={handleChange}
/>

<input
name="phone"
placeholder="Phone Number"
value={formData.phone}
onChange={handleChange}
/>

<input
name="email"
placeholder="Email Address"
value={formData.email}
onChange={handleChange}
/>

<div className={styles.buttons}>

<button type="button" onClick={prev}>
Back
</button>

<button type="button" onClick={next}>
Next
</button>

</div>

</motion.div>

)}



{/* STEP 3 */}

{step===3 && (

<motion.div
initial={{opacity:0,x:50}}
animate={{opacity:1,x:0}}
transition={{duration:0.5}}
>

<h3>Upload Student Photo</h3>

<input
type="file"
accept="image/*"
onChange={handlePhoto}
/>

{photo && (

<img
src={photo}
className={styles.preview}
/>

)}

<div className={styles.buttons}>

<button type="button" onClick={prev}>
Back
</button>

<button type="submit">
Submit Application
</button>

</div>

</motion.div>

)}


</form>



{/* SUCCESS POPUP */}

{success && (

<div className={styles.popup}>

<motion.div
initial={{scale:0}}
animate={{scale:1}}
transition={{duration:0.4}}
>

<h2>🎉 Application Submitted</h2>

<p>
Thank you for applying to our school.
Our admissions team will contact you soon.
</p>

<Link href="/">
<button>
Return Home
</button>
</Link>

</motion.div>

</div>

)}



</section>

)

}