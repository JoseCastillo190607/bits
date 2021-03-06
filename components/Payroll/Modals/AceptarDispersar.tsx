import {useState, useContext} from "react";
import {Dialog} from "@material-ui/core"
import styles from './PayrollModals.module.css'
import { clearPayrollProcess } from "../../../context/PayrollProcess/Actions";
import PayrollProcessContext from "../../../context/PayrollProcess/PayrollProcessContext";
import { useMutation } from "@apollo/client";
import { SEND_DISPERSION } from "../../../Querys/querys";

const AceptarDispersar = (props:any) =>{
  const {totalesDispersar, totales, seleccionados} = props
  const {state, dispatch} = useContext(PayrollProcessContext)
  const [activo, setactivo] = useState(false)

  const [sendDispersion] = useMutation(SEND_DISPERSION,{
  })

  const handleClose = () =>{
    clearPayrollProcess({}, dispatch)
  }

  const handleChange = (e: any) =>{ 
    if(e.target.value === 'CONFIRMAR'){
        setactivo(true)
    }else{
        setactivo(false)
    }
  }

  console.log('Seleccionados',seleccionados)

  const agregaSeleccionados = async() =>{
    console.log('Seleccionados',seleccionados)   

    let Array:any = []
    
    seleccionados.map((lis:any)=>{
      Array.push({ id: parseInt(lis) })
    })

    console.log('Soy el array', Array)
  
    sendDispersion({
      variables:{
        sendDispersionId: Array
      }
    })
  }

  return(
    <Dialog aria-labelledby='costumized-dialog-title' open={state.aceptarDispersar} fullWidth={false}  onClose={handleClose} maxWidth={"md"}>
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
          Est&aacute;s por dispersar n&oacute;mina a {totalesDispersar}/{totales} colaboradores
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
                onClick={()=> agregaSeleccionados()}
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

export default AceptarDispersar