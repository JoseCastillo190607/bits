import { useContext, useState} from "react"
import EmpresaContext from "../../../context/Empresa/EmpresaContext"
import {Dialog} from "@material-ui/core"
import { clearEmpresaModal } from "../../../context/Empresa/Actions"
import styles from '../../Payroll/Modals/PayrollModals.module.css'
import { DELETE_PROJECT, GET_ALL_PROJECT, GET_ALL_SEDE } from "../../../Querys/querys"
import { useMutation } from "@apollo/client"
import { SuccessfulAlert } from "../../../alerts/successAlerts"

const EliminaProject = () =>{
  const {state, dispatch} = useContext(EmpresaContext)
  const [activo, setactivo] = useState(false)
  const handleChange = (e: any) =>{ 
      if(e.target.value === 'ELIMINAR'){
          setactivo(true)
      }else{
          setactivo(false)
      }
  }

  const [deleteProject] = useMutation(DELETE_PROJECT,{
    refetchQueries:[{ query: GET_ALL_PROJECT}]
  })
  
  const handleClose = () => {
    clearEmpresaModal({}, dispatch)
  } 

  const handleDelete = () =>{
    deleteProject({
      variables: {
        deleteProjectId: state._id
      }
    })
    SuccessfulAlert({text:'Registro Actualizado'})
    handleClose() 
  }

  return(
    <Dialog open={state.deleteProject} aria-labelledby="form-dialog-title" onClose={handleClose} maxWidth={"md"}>
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
              ¿Est&aacute;s seguro de que quieres eliminar el registro?
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
                  onClick={() => handleDelete()}
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

export default EliminaProject