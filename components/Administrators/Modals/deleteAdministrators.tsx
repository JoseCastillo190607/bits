import { useContext } from "react"
import AdministratrosContext from "../../../context/AdministratorsContext/AdministratorsContext"
import { clearAdministratorsModal } from "../../../context/AdministratorsContext/Actions"
import { Dialog, Tooltip } from "@material-ui/core"

import styles from '../Administrators.module.css'

export const DeleteAdministrators = () =>{


  const {state, dispatch} = useContext(AdministratrosContext)
  const handleClose = ()=>{
    clearAdministratorsModal({}, dispatch);
  }

  return(
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={state.deleteModal} fullWidth={false} maxWidth={"sm"}>
      <div>
        <h1>¿Deseas eliminar el Administrador?</h1>
      </div>
      <div className="contenedorCentrado">
      <button className={styles.botonEliminar}>
                  Cancelar
              </button>
          <button className={styles.botonEliminar}>
              Eliminar
          </button>                            
      </div>
    </Dialog>
  )
}