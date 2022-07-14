import {
    Button, Dialog,
    DialogActions, DialogContent,
    FormControl, TextField, Box, Grid
} from "@material-ui/core";
import OrganigramaContext from "../../../context/OrganigramaContext/OrganigramaContext";
import { ChangeEvent, useContext, useEffect, useState } from "react";


const AgregarPuesto = () =>{
    const { state, dispatch } = useContext(OrganigramaContext);
    const handleClose = () => {
        console.log('true')
    }

    return(
        <Dialog
            aria-labelledby='costumized-dialog-title' open={state.open} fullWidth={true} onClose={handleClose} maxWidth={"md"}
        >
            <h2>Hola</h2>
        </Dialog>
    )
}

export default AgregarPuesto