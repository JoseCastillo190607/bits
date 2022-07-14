import { useQuery } from '@apollo/client';
import MenuHeader from './MenuHeader';
import { useState } from 'react';
import { Grid } from '@material-ui/core';
import styles from '../../styles/Header/headerStyles.module.css'
import Notifications from './Notifications'
import ContadorNotificaciones from './ContadorNotificaciones';

const Header = () => {
  const [verNotificaciones, setVerNotificaciones] = useState(false)

  const cambioEstatus = () => {
    setVerNotificaciones(!verNotificaciones)
  }

  return (
    <header>
      <div className={styles.h_contenedor}>
        <div className={styles.h_contenedorLogo}>
          <img src="/assets/logo_bits_header.svg" alt="BITS" className={styles.h_imagenLogo} />
        </div>
        <div className={styles.h_espacio}>
        </div>
        <div 
          className={styles.h_notificaciones}
          >
          <div className={styles.h_iconoNotificaciones}
          onClick={() => cambioEstatus()}
          ></div>
          <ContadorNotificaciones cambioEstatus={cambioEstatus}/>
          {(verNotificaciones === true) ?
            <Notifications />
          :

          null      
          }
        </div>
        <div className={styles.h_menuHeader}>
          <MenuHeader />
        </div>
      </div>
    </header>
  );
}

export default Header;