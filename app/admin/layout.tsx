"use client"
import Sidebar from "@/app/components/admin/Sidebar"
//import Topbar from "@/app/components/admin/Topbar"
import styles from "@/app/styles/AdminLayout.module.css"
import { useState } from "react"


export default function AdminLayout({ children }: { children: React.ReactNode }) {

const [collapsed,setCollapsed] = useState(false)

return (

<div className={styles.layout}>

<Sidebar collapsed={collapsed} />

<button
className={`${styles.toggleBtn} ${collapsed ? styles.toggleCollapsed : ""}`}
onClick={()=>setCollapsed(!collapsed)}
>
{collapsed ? "➤" : "◀"}
</button>

<div className={`${styles.main} ${collapsed ? styles.mainExpanded : ""}`}>
{children}
</div>

</div>

)

}