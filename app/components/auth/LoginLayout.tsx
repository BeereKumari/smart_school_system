import styles from "../../styles/loginModern.module.css";

export default function LoginLayout({
 title,
 children
}:{
 title:string,
 children:React.ReactNode
}){

 return(

  <div className={styles.container}>

   <div className={styles.overlay}></div>

   <div className={styles.loginCard}>

    <h1 className={styles.logo}>Smart School</h1>

    <h2>{title}</h2>

    {children}

   </div>

  </div>

 )

}