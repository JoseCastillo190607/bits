import {useState, useContext} from "react";
import {
    TextField
  } from '@material-ui/core';
import { Box, Dialog, DialogContent } from "@material-ui/core"

import '../Politic.css'

import PoliticContext from "../../../context/ConfigPayrollContext/PoliticContext";
import { closePoliticModal } from "../../Team/Modals/ModalPoliticModal";
import { inactivePolitic } from '../../../services/PoliticService';

import { useMutation } from "@apollo/client";
import {  GET_ALL_POLITIC,DELETE_POLITIC } from "../../../Querys/querys";

const EliminaPolitic = (props: any) =>{

    const [deletePolitic] = useMutation(DELETE_POLITIC, {
        refetchQueries: [{ query: GET_ALL_POLITIC }],
      });

    const {state, dispatch} = useContext(PoliticContext)
    const [activo, setactivo] = useState(false)
    const handleChange = (e: any) =>{ 
        if(e.target.value === 'ELIMINAR'){
            setactivo(true)
        }else{
            setactivo(false)
        }
    }

    const handleDelete = async () =>{
        try{

            deletePolitic({
                variables: {
                    deletePoliticId: state._id,
                },
              });
                await closePoliticModal(dispatch);
                setactivo(false)
                await props.getDatos();
        }
        catch{

        }
    }

    const handleClose =  async () => {
        state.showEliminar = false;
        await closePoliticModal(dispatch);
    }



    return(
        <Dialog aria-labelledby='costumized-dialog-title' open={state.showEliminar} fullWidth={true}  onClose={handleClose} maxWidth={"md"}>
            <Box>
                <div className="contenedorCentrado">
                    <p className="titulo">¿Confirmas eliminar esta política?</p>
                </div>
                <div className="contenedorCentrado">
                    <span className="nombreEliminar">{state.PolicyName}</span>
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

export default EliminaPolitic