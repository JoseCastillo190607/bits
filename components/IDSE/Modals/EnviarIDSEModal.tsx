import {Dialog} from "@material-ui/core"
import PayrollProcessContext from "../../../context/PayrollProcess/PayrollProcessContext";
import {useState, useContext, useEffect} from "react";
import { clearPayrollProcess } from "../../../context/PayrollProcess/Actions";
import styles from '../../Payroll/Modals/PayrollModals.module.css'


const EnviarIDSEModal = () =>{
  const {state, dispatch} = useContext(PayrollProcessContext)
  const [activo, setactivo] = useState(false)

  const handleClose = () =>{
    clearPayrollProcess({}, dispatch)
  
  }
  const reiniciaEstados = () =>{
    setactivo(false)
  } 

  const handleChange = (e: any) =>{ 
    if(e.target.value === 'CONFIRMAR'){
        setactivo(true)
    }else{
        setactivo(false)
    }
  }
 
  return(
    <Dialog aria-labelledby='costumized-dialog-title' open={state.alertaEnviarIDSE} fullWidth={false}  onClose={handleClose} maxWidth={"md"}>
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
          Est&aacute;s por Enviar movimientos al IDSE
          </div>
          <div className={styles.em_mensajePrtincipal}>
            Escribe CONFIRMAR para continuar
          </div>
          <div>
            <input 
              className={styles.input}
              type="text"
              onChange={(e) => handleChange(e)}
            />
          </div>
        <div className={styles.em_contenedorBotones}>
          <button 
                className={styles.em_botonCancelar}
                onClick={()=> handleClose()}
              >
                Cancelar
              </button>
              {(activo === true ? 
                <button className={`${styles.botonesAtencion} ${styles.continuarAtencion}`}
                >
                    <div>
                      Confirmar
                    </div>
                </button>
              :
                <button 
                  className={`${styles.botonesAtencion} ${styles.continuarAtencionInactivo}`}
                  >
                    <div>
                      Confirmar
                    </div>
                </button>
              )}
        </div>
      </div>
    </Dialog>
  )
}
export default EnviarIDSEModal 