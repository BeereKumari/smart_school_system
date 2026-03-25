"use client"

import { useState } from "react"
import styles from "../styles/Contact.module.css"
import { motion } from "framer-motion"

export default function Contact(){

const [form,setForm] = useState({
name:"",
email:"",
phone:"",
message:""
})

const [status,setStatus] = useState("idle")

/* INPUT CHANGE */

const handleChange = (e:any)=>{

setForm({
...form,
[e.target.name]:e.target.value
})

}

/* FORM SUBMIT */

const handleSubmit = async (e:any)=>{

e.preventDefault()

setStatus("sending")

try{

const res = await fetch("/api/contact",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(form)

})

const data = await res.json()

if(data.success){

setStatus("success")

setForm({
name:"",
email:"",
phone:"",
message:""
})

setTimeout(()=>{

setStatus("idle")

},4000)

}else{

setStatus("error")

}

}catch(error){

setStatus("error")

}

}

return(

<section id="contact" className={styles.section}>

<motion.h2
className={styles.title}
initial={{opacity:0,y:30}}
whileInView={{opacity:1,y:0}}
transition={{duration:0.6}}
>
Contact Us
</motion.h2>

<p className={styles.subtitle}>
We are here to assist students, parents and educators.
Feel free to reach out for admissions, academic inquiries or campus visits.
</p>


{/* CONTACT INFO */}

<div className={styles.infoGrid}>

<motion.div
className={styles.card}
initial={{opacity:0,y:40}}
whileInView={{opacity:1,y:0}}
transition={{duration:0.5}}
whileHover={{scale:1.05}}
>

<div className={styles.icon}>📍</div>

<h3>Campus Address</h3>

<p>
RGUKT RK Valley <br/>
Vempalli Mandal <br/>
Kadapa District <br/>
Andhra Pradesh 516330
</p>

</motion.div>


<motion.div className={styles.card} whileHover={{scale:1.05}}>

<div className={styles.icon}>📞</div>

<h3>Phone</h3>

<p>+91 98765 43210</p>
<p>+91 91234 56789</p>

</motion.div>


<motion.div className={styles.card} whileHover={{scale:1.05}}>

<div className={styles.icon}>✉️</div>

<h3>Email</h3>

<p>admissions@smartstudentsystem.com</p>
<p>support@smartstudentsystem.com</p>

</motion.div>

</div>


{/* CONTACT FORM */}

<div className={styles.formContainer}>

<h3>Send us a Message</h3>

<form className={styles.form} onSubmit={handleSubmit}>

<input
name="name"
placeholder="Full Name"
value={form.name}
onChange={handleChange}
required
/>

<input
name="email"
placeholder="Email Address"
value={form.email}
onChange={handleChange}
required
/>

<input
name="phone"
placeholder="Phone Number"
value={form.phone}
onChange={handleChange}
/>

<textarea
name="message"
placeholder="Your Message"
value={form.message}
onChange={handleChange}
required
/>

<button type="submit">

{status === "sending" ? "Sending..." : "Send Message"}

</button>


{/* SUCCESS MESSAGE */}

{status === "success" && (

<div className={styles.successMsg}>

✅ Your message has been sent successfully!  
Our team will contact you soon.

</div>

)}

{/* ERROR MESSAGE */}

{status === "error" && (

<div className={styles.errorMsg}>

❌ Failed to send message. Please try again.

</div>

)}

</form>

</div>


{/* GOOGLE MAP */}

<div className={styles.mapSection}>

<div className={styles.mapContainer}>

<iframe
src="https://maps.google.com/maps?q=RGUKT%20RK%20Valley%20Kadapa&t=&z=15&ie=UTF8&iwloc=&output=embed"
loading="lazy"
className={styles.map}
/>

<div className={styles.mapCard}>

<h3>RGUKT RK Valley Campus</h3>

<p>
IIIT RGUKT RK Valley <br/>
Vempalli Mandal <br/>
Kadapa District <br/>
Andhra Pradesh
</p>

<a
href="https://www.google.com/maps/place/RGUKT+RK+Valley"
target="_blank"
className={styles.directionBtn}
>
Get Directions
</a>

</div>

</div>

</div>


{/* SOCIAL MEDIA */}

<div className={styles.social}>

<h3>Follow Us</h3>

<div className={styles.icons}>

<a href="#">🌐</a>
<a href="#">📘</a>
<a href="#">📸</a>
<a href="#">▶️</a>

</div>

</div>

</section>

)

}