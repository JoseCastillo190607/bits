import { useEffect } from 'react'

import { useQuery } from '@apollo/client'
import styles from '../../styles/Header/headerStyles.module.css'
import { GET_NOTIFICATIONS_SINVER } from '../../Querys/querys'

const ContadorNotificaciones = ({cambioEstatus}:any) =>{


  const {loading, error, data, startPolling, stopPolling} = useQuery(GET_NOTIFICATIONS_SINVER,{})  

  useEffect(()=> {
    // startPolling(1000);
    return () =>{
      // stopPolling()
    }
  },[])

  const numeroNotifications = data?.GET_NOTIFICATIONS_SINVER
  
  console.log('Sin ver', numeroNotifications)

  if(numeroNotifications?.length > 0){
    return(
      <div 
        className={styles.nc_contenedor}
        onClick={()=> cambioEstatus()}
        >
        {numeroNotifications?.length}
      </div>
    )
  }else{
    return(
      null
    )
  }
}


export default ContadorNotificaciones
