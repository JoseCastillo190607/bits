import {useState, useContext} from "react";
import {
    TextField
  } from '@material-ui/core';
import { Box, Dialog, DialogContent } from "@material-ui/core"
import '../Payroll.css'
import SettlementPayrollProcessContext from "../../../context/PayrollProcess/SettlementPayrollProcessContext";
import { clearSettlementProcess } from "../../../context/PayrollProcess/SettlementActions";
import { DELETE_SETTLEMENTPAYROLL, GET_ALL_SETTLEMENTPAYROLL } from "../../../Querys/querys";
import { useMutation } from "@apollo/client";

const EliminaSettlement = (props: any) =>{
    const {state, dispatch} = useContext(SettlementPayrollProcessContext)
    const [activo, setactivo] = useState(false)

    const [deletePayroll] = useMutation(DELETE_SETTLEMENTPAYROLL, {
      refetchQueries: [{ query: GET_ALL_SETTLEMENTPAYROLL }],
    });

    const handleChange = (e: any) =>{ 
      if(e.target.value === 'ELIMINAR'){
          setactivo(true)
      }else{
          setactivo(false)
      }
    }

    const handleDelete = async () =>{ 
      const idPayroll = state._id
      console.log(idPayroll)
      deletePayroll({
        variables:{
            deleteSettlementPayrollId:state._id
        }
      })
      handleClose()
    }

    const handleClose = () =>{
      clearSettlementProcess({}, dispatch)
    }

    
    return(
        <Dialog aria-labelledby='costumized-dialog-title' open={state.deleteModal} fullWidth={true}  onClose={handleClose} maxWidth={"md"}>
            <Box>
                <div className="contenedorCentrado">
                    <p className="titulo">¿Confirmas eliminar esta baja?</p>
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

export default EliminaSettlement