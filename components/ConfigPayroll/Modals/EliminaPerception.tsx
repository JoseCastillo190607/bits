import {useState, useContext} from "react";
import {
    TextField
  } from '@material-ui/core';
import { Box, Dialog, DialogContent } from "@material-ui/core"
import styles from '../../Payroll/Modals/PayrollModals.module.css'

import '../PayrollGroup.css'
import PerceptionContext from '../../../context/ConfigPayrollContext/PerceptionContext';
import { closePerceptionModal } from "../../Team/Modals/ModalPerceptionModal";
import { useMutation } from "@apollo/client";
import {  GET_ALL_PERCEPTIONS,DELETE_PERCEPTIONS } from "../../../Querys/querys";
import {SuccessfulAlert} from "../../../alerts/successAlerts";

const EliminaPerception = (props: any) =>{
    const {state, dispatch} = useContext(PerceptionContext)
    const [activo, setactivo] = useState(false)
    const handleChange = (e: any) =>{ 
        if(e.target.value === 'ELIMINAR'){
            setactivo(true)
        }else{
            setactivo(false)
        }
    }


    const [deletePerception] = useMutation(DELETE_PERCEPTIONS, {
        refetchQueries: [{ query: GET_ALL_PERCEPTIONS }],
      });


    const handleDelete = async () =>{
        try{
            deletePerception({
                variables: {
                    deletePerceptionsId: state._id,
                },
              }).then(()=>{
                SuccessfulAlert({text:"Percepcion eliminada correctamente"});
            });

                // await inactivePerception(state._id);
                await closePerceptionModal(dispatch);
                setactivo(false)
                await props.getDatos();
        }
        catch{

        }
    }

    const handleClose =  async () => {
        state.showEliminar = false;
        await closePerceptionModal(dispatch);
    }



    return(
        <Dialog aria-labelledby='costumized-dialog-title' open={state.showEliminar} fullWidth={false}  onClose={handleClose} maxWidth={"md"}>
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
              ¿Est&aacute;s seguro de que quieres eliminar la pre-n&oacute;mina?
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

export default EliminaPerception