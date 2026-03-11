import Sidebar from "@/app/components/admin/Sidebar"
//import Topbar from "@/app/components/admin/Topbar"
import styles from "@/app/styles/AdminLayout.module.css"

export default function AdminLayout({ children }:{
 children:React.ReactNode
}){

 return(

  <div className={styles.container}>

    <Sidebar/>

    <div className={styles.main}>

      

      <div className={styles.content}>
        {children}
      </div>

    </div>

  </div>

 )

}