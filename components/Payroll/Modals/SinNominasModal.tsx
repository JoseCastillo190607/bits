import {useState, useContext} from "react";
import { Dialog } from "@material-ui/core"
import PayrollProcessContext from "../../../context/PayrollProcess/PayrollProcessContext";
import { clearPayrollProcess } from "../../../context/PayrollProcess/Actions";
import styles from './PayrollModals.module.css'

 

const SinNominasModal = (props: any) =>{
  const {state, dispatch} = useContext(PayrollProcessContext)
  
  const handleClose = () =>{
    clearPayrollProcess({}, dispatch)
  }

  return(
    <Dialog aria-labelledby='costumized-dialog-title' open={state.sinNominasSeleccionadas} fullWidth={false}  onClose={handleClose} maxWidth={"md"}>
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
          No tienes n&oacute;minas seleccionadas
        </div>
        <div className={styles.em_contenedorBotones}>
              <button 
                className={styles.em_botonCancelar}
                onClick={()=> handleClose()}
              >
                Cancelar
              </button>
                <button 
                  className={`${styles.botonesAtencion} ${styles.continuarAtencion}`}
                  onClick={()=> handleClose()}
                  >
                    <div>
                      Continuar
                    </div>
                </button>
            </div>
      </div>
    </Dialog>
  )

}


export default SinNominasModal