import {useState, useContext} from "react";
import {  Dialog } from "@material-ui/core"
import '../Payroll.css'
import styles from './PayrollModals.module.css'
import EventualPayrollProcessContext from "../../../context/PayrollProcess/EventualPayrollProcessContext";
import { clearEventualPayrollProcess } from "../../../context/PayrollProcess/EventualActions";
import { DELETE_EVENTUALPAYROLL, GET_ALL_EVENTUALPAYROLL } from "../../../Querys/querys";
import { useMutation } from "@apollo/client";


const EliminaPayroll = (props: any) =>{
    const {state, dispatch} = useContext(EventualPayrollProcessContext)
    const [activo, setactivo] = useState(false)

    const [deletePayroll] = useMutation(DELETE_EVENTUALPAYROLL, {
      refetchQueries: [{ query: GET_ALL_EVENTUALPAYROLL }],
    });

    const handleChange = (e: any) =>{ 
      if(e.target.value === 'ELIMINAR'){
          setactivo(true)
      }else{
          setactivo(false)
      }
    }

    const handleDelete = async () =>{ 
      deletePayroll({
        variables:{
            deleteEventualPayrollId:state._id
        }
      })
      handleClose()
    }

    const handleClose = () =>{
      clearEventualPayrollProcess({}, dispatch)
    }

    
    return(
      <Dialog aria-labelledby='costumized-dialog-title' open={state.deleteModal} fullWidth={false}  onClose={handleClose} maxWidth={"md"}>
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
            <div className={styles.em_titulo}>
              ¿Est&aacute;s seguro de que quieres eliminar la n&oacute;mina Eventual?
            </div>
            <div className={styles.em_mensajePrtincipal}>
                <span>Una vez eliminado no podr&aacute;s recuperar la informaci&oacute;n</span>
                <br />
                <span className={styles.em_textoPrincipal}>Escribe ELIMINAR para confirmar</span>
            </div>
            <div>
              <input 
                className={styles.input}
                type="text"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
        </div>
        <div className={styles.em_contenedorBotones}>
              <button 
                className={styles.em_botonCancelar}
                onClick={()=> handleClose()}
              >
                Cancelar
              </button>
              {(activo === true ? 
                <button 
                  className={styles.em_botonConfirmarActivo}
                  onClick={()=> handleDelete()}
                  >
                  <div className={styles.em_iconoConfirmarEliminar}></div>
                    <div>
                      Confirmar
                    </div>
                </button>
              :
                <button className={styles.em_botonConfirmarInactivo}>
                  <div className={styles.em_iconoConfirmarEliminar}></div>
                    <div>
                      Confirmar
                    </div>
                </button>
              )}

            </div>
      </Dialog>
    )
}

export default EliminaPayroll