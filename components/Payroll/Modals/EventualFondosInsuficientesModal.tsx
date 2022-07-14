import {useState, useContext} from "react";
import {Dialog} from "@material-ui/core"
import styles from './PayrollModals.module.css'
import { clearPayrollProcess } from "../../../context/PayrollProcess/Actions";
import PayrollProcessContext from "../../../context/PayrollProcess/PayrollProcessContext";

const FondosInsufucientesModal = ()=>{
  const {state, dispatch} = useContext(PayrollProcessContext)

  const handleClose = () =>{
    clearPayrollProcess({}, dispatch)
  }

  console.log(state)
  return(
    <Dialog aria-labelledby='costumized-dialog-title' open={state.fondosInsuficientes} fullWidth={false}  onClose={handleClose} maxWidth={"md"}>
    <div className={styles.em_container}>
      <div className={styles.contenedorCerrarModal}>
        <div 
          className={styles.cerrarModal}
          onClick={()=> handleClose()}>
        </div>
      </div>
      <div className={styles.contenedorPrincipal}>
        <div className={styles.iconoEliminar}>
        </div>
      </div>
      <div className={styles.tituloAtencion}>
        ¡Atenci&oacute;n!
      </div>
      <div className={ styles.mensajeAtencion}>
        Lo sentimos, tus fondos son insuficientes para la dispersi&oacute;n seleccionada.
      </div>
      <div className={styles.contenedorBotonesAtencion}>
        <button 
          className={`${styles.botonesAtencion} ${styles.cerrarAtencion}`}
          onClick={() => handleClose()}
          >
          Cerrar
        </button>
        <button 
          className={`${styles.botonesAtencion} ${styles.continuarAtencion}`}
          onClick={() => handleClose()}
          >
          Entendido
        </button>
      </div>
    </div>
  </Dialog>
  )
}

export default FondosInsufucientesModal