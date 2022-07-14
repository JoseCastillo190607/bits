import {useQuery, useMutation} from "@apollo/client"
import styles from '../../styles/Header/headerStyles.module.css'
import MenuListPrincipal from './MenuListPrincipal'
import MenuListSecundario from './MenuListSecundario'
import {GET_NOTIFICATIONS, MARCAR_LEIDAS} from '../../Querys/querys'
import { useEffect } from "react"

const Notifications = () =>{
  const {loading, error, data, startPolling, stopPolling} = useQuery(GET_NOTIFICATIONS,{})
  const notifications = data?.GET_NOTIFICATIONS
  const [leidas] = useMutation(MARCAR_LEIDAS,{})

  useEffect(()=>{
    marcarLeidas()
    // startPolling(1000);
    return () =>{
      // stopPolling()
    }
  },[])

  const marcarLeidas = () =>{
    leidas({})
  }


  if(notifications?.length > 0){
    return(
      <div className={styles.n_contenedor}>
        <div className={styles.n_contenedorTitulo}>
          <div className={styles.n_titulo}>
            Notificaciones
          </div>
          <div className={styles.n_menu}>
            <MenuListPrincipal />
          </div>
        </div>
        <div className={styles.n_contenedorPrincipal}>
          {notifications?.map((lis:any)=>(
            (lis?.tipo === "Correcto")?
            <div className={styles.n_notificacion}>
              <div className={`${styles.n_flex} ${styles.n_iconoCorrecto}`}>
                <div className={styles.n_iconoCorrectoInterno}></div>
              </div>
              <div className={styles.n_textoNotificacion}>
                {lis?.mensaje}
              </div>
              <div className={styles.n_menuLista}>
                <MenuListSecundario idNotificacion={lis?.id}/>
              </div>
            </div>
            :
            (lis?.tipo === "Fallo")?
            <div className={styles.n_notificacion}>
            <div className={`${styles.n_flex} ${styles.n_iconoFallo}`}>
              </div>
              <div className={styles.n_textoNotificacion}>
                {lis?.mensaje}  
              </div>
              <div className={styles.n_menuLista}>
                <MenuListSecundario idNotificacion={lis?.id}/>
              </div>
            </div>
            :
            (lis?.tipo === "AtencionAzul")?
            <div className={styles.n_notificacion}>
              <div className={`${styles.n_flex} ${styles.n_iconoAtencionAzul}`}>
                <div className={styles.n_iconoAtencionAzulInterno}></div>
              </div>
              <div className={styles.n_textoNotificacion}>
                {lis?.mensaje}
              </div>
              <div className={styles.n_menuLista}>
                <MenuListSecundario 
                  idNotificacion={lis?.id}
                  Desde="AtencionAzul"
                  />
              </div>
            </div>
            : 
            (lis?.tipo === "AtencionAmarillo")?
            <div className={styles.n_notificacion}>
            <div className={styles.n_iconoNotificacion}>
              <div className={styles.n_iconoInternoNotificacion}></div>
            </div>
            <div className={styles.n_textoNotificacion}>
              {lis?.mensaje}
            </div>
            <div className={styles.n_menuLista}>
              <MenuListSecundario idNotificacion={lis?.id}/>
            </div>
          </div>:
            null
          ))}        
        </div>
      </div>
    )    
  }else{
    return(
      <div className={styles.n_contenedor}>
        <div className={styles.n_contenedorTitulo}>
          <div className={styles.n_titulo}>
            Notificaciones
          </div>
          <div className={styles.n_menu}>
            <MenuListPrincipal />
          </div>
        </div>
        <div className={styles.n_sinNotificaciones}>
          No tienes noficiaciones pendientes.
        </div>
      </div>
    )
  }

}

export default Notifications