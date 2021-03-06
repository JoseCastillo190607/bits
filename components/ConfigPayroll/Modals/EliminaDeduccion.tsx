import {useState, useContext} from "react";
import {
    TextField
  } from '@material-ui/core';
import { Box, Dialog, DialogContent } from "@material-ui/core"
import '../PayrollGroup.css'
import DeduccionContext from '../../../context/ConfigPayrollContext/DeduccionContext';
import { closeDeduccionModal } from "../../Team/Modals/ModalDeduccionModal";
import { inactiveDeduccion } from '../../../services/DeduccionService';
import { SuccessfulAlert } from '../../../alerts/successAlerts';
import { ErrorAlert } from '../../../alerts/errorAlert';
import styles from "../../Payroll/Payroll/PayrollStyles.module.css"

const EliminaDeduccion = (props: any) =>{
    const {state, dispatch} = useContext(DeduccionContext)
    const [activo, setactivo] = useState(false)
    console.log(state._id) 
    const handleChange = (e: any) =>{ 
        if(e.target.value === 'ELIMINAR'){
            setactivo(true)
        }else{
            setactivo(false)
        }
    }

    const handleDelete = async () =>{
        try{
                await inactiveDeduccion(state._id);
                await closeDeduccionModal(dispatch);
                setactivo(false)
                await props.getDatos();
                SuccessfulAlert({ title: "¡Éxito!", text: "¡Se ha eliminado la percepción correctamente!" })
        }
        catch{
            ErrorAlert({ text: "No se ha eliminado la percepción." });
        }
    }

    const handleClose =  async () => {
        state.showEliminar = false;
        await closeDeduccionModal(dispatch);
    }



    return(
        <Dialog aria-labelledby='costumized-dialog-title' open={state.showEliminar} fullWidth={true}  onClose={handleClose} maxWidth={"md"}>
            <Box>
                <div className="contenedorCentrado">
                    <p className="titulo">¿Confirmas eliminar esta deducción?</p>
                </div>
                <div className="contenedorCentrado">
                    <span className="nombreEliminar">{state.ConceptName}</span>
                </div>
                <div className="contenedorCentrado">
                    <span className="textoEliminar">Una vez eliminado no podrás recuperar la información</span>
                </div>
                <div className="contenedorCentrado">
                    <span className="textoEliminar" >Escribe ELIMINAR para confirmar</span>
                </div>
                <div className="contenedorCentrado">
                    <TextField
                        error={false}
                        type="text"
                        variant="outlined"
                        size="small"
                        className="inputEliminar"
                        onChange={(e) => handleChange(e)}
                />
                </div>
                {(activo === true)?
                <div className="contenedorCentrado">
                    <button className="botonEliminarPuesto" onClick = {handleDelete} >
                        Confirmar
                    </button>                            
                </div>
                :
                <div className="contenedorCentrado">
                    <button className="botonEliminarPuestoFalse">
                        Confirmar
                    </button>
                </div>
                }

            </Box>
            <DialogContent>

            </DialogContent>
        </Dialog>
    )
}

export default EliminaDeduccion