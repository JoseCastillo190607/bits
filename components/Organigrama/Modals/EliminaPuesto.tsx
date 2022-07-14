import  { useState, useContext } from "react";
import {
  Dialog,
} from "@material-ui/core";
import "../Organigrama.css";
import OrganigramaContext from "../../../context/OrganigramaContext/OrganigramaContext";
import { closeOrganigramaModal } from "../../Team/Modals/ModalOrganigramaModal";
import { useMutation } from "@apollo/client";
import { DELETE_PUESTO, GET_ALL_PUESTOS_USERS } from "../../../Querys/querys";
import styles from '../../Payroll/Modals/PayrollModals.module.css'

const EliminaPuesto = (props: any) => {
  const { state, dispatch } = useContext(OrganigramaContext);
  const [activo, setactivo] = useState(false);
  const handleChange = (e: any) => {
    if (e.target.value === "ELIMINAR") {
      setactivo(true);
    } else {
      setactivo(false);
    }
  };

  const [deletePuesto] = useMutation(DELETE_PUESTO, {
      refetchQueries:[{query:GET_ALL_PUESTOS_USERS },],
  });

  const handleDelete = async () => {
      try{
        deletePuesto({
            variables: {
              deletePuestosId: state._id,
            },
          });

          await closeOrganigramaModal(dispatch);
          setactivo(false);
          await props.getDatos();
          }
          catch{

          }
  };

  const handleClose = async () => {
    state.showEliminar = false;
    await closeOrganigramaModal(dispatch);
  };

  return (
    <Dialog
      aria-labelledby="costumized-dialog-title"
      open={state.showEliminar}
      fullWidth={false}
      onClose={handleClose}
      maxWidth={"md"}
    >
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
              {/* ¿Est&aacute;s seguro de que quieres eliminar la pre-n&oacute;mina? */}
              ¿Est&aacute;s seguro de que quieres eliminar el puesto?
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
  );
};

export default EliminaPuesto;
