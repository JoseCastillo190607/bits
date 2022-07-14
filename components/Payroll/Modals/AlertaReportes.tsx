import {useState, useContext, useEffect} from "react";
import styles from './PayrollModals.module.css'


import {Dialog} from "@material-ui/core"
import PayrollProcessContext from "../../../context/PayrollProcess/PayrollProcessContext";
import { clearPayrollProcess } from "../../../context/PayrollProcess/Actions";


const AlertaReporte = (mensaje:any) =>{
  const {state, dispatch} = useContext(PayrollProcessContext);

  const handleClose = () =>{
    clearPayrollProcess({}, dispatch)
  }

  return(
    <Dialog aria-labelledby='costumized-dialog-title' open={state.alertaReporte} fullWidth={false}  onClose={handleClose} maxWidth={"md"}>
      <div className={styles.contenedorPrincipal}>
        <div className={styles.contenedorCerrarModal}>
          <div 
            className={styles.cerrarModal}
            onClick={()=> handleClose()}
          >
          </div>
        </div>
        <div className={styles.contenedorPrincipal}>
          <div className={styles.fim_iconoPrincipal}> 
            <div className={styles.fim_iconoComplemento}>
            </div>
          </div>
        </div>
        <div className={styles.tituloAtencion}>
          ¡Atenci&oacute;n!
        </div>
        <div className={styles.em_mensajePrtincipal}>
          {mensaje.mensaje}
        </div>
        <div className={styles.em_contenedorBotones}>
          <button className={`${styles.botonesAtencion} ${styles.continuarAtencion}`}
            onClick={()=> handleClose()}
          >
            <div>
              Confirmar
            </div>
          </button>
        </div>
      </div>
    </Dialog>
  )
}

export default AlertaReporte