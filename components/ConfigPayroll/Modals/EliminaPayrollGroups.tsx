import {useState, useContext} from "react";
import {
    TextField
  } from '@material-ui/core';
import { Box, Dialog, DialogContent } from "@material-ui/core"
import '../PayrollGroup.css'
import styles from '../../Payroll/Modals/PayrollModals.module.css'
import PayrollGroupContext from "../../../context/ConfigPayrollContext/PayrollGroupContext";
import { closePayrollGroupModal } from "../../Team/Modals/ModalPayrollGroupModal";
import { useMutation } from "@apollo/client";
import {  GET_ALL_PAYROLL_GROUP,DELETE_PAYROLL_GROUP } from "../../../Querys/querys";

const EliminaPayrollGroup = (props: any) =>{
    const {state, dispatch} = useContext(PayrollGroupContext)
    const [activo, setactivo] = useState(false)
    const handleChange = (e: any) =>{ 
        if(e.target.value === 'ELIMINAR'){
            setactivo(true)
        }else{
            setactivo(false)
        }
    }

    const [deletePayrollGroup] = useMutation(DELETE_PAYROLL_GROUP, {
        refetchQueries: [{ query: GET_ALL_PAYROLL_GROUP }],
      });


    const handleDelete = async () =>{
        try{
            deletePayrollGroup({
                variables: {
                    deletePayrollGroupId: state._id,
                },
              });
                // await inactivePayrollGroup(state._id);
            await closePayrollGroupModal(dispatch);
            setactivo(false)
            await props.getDatos();
        }
        catch{

        }
    }

    const handleClose =  async () => {
        state.showEliminar = false;
        await closePayrollGroupModal(dispatch);
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

export default EliminaPayrollGroup