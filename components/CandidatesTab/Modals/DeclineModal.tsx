import { useContext, useState } from "react";
import { Button, Dialog, DialogContent, Grid, TextField } from "@material-ui/core";
import MuiDialogActions from '@material-ui/core/DialogActions';
import CollaboratorContext, { Types } from "../../../context/CollaboratorContext/CollaboratorContext";
import { declineCandidate } from "../../../services/candidateService";
import { ErrorAlert } from "../../../alerts/errorAlert";
import { WarningAlert } from "../../../alerts/WarningAlert";
import {  DECLINE_USERS } from "../../../Querys/querys";
import { useMutation } from "@apollo/client";
const DeclineModal = () => {
    const { state, dispatch } = useContext(CollaboratorContext);
    const [comment, setComment] = useState<string>('');

    
    const [declineUsers] = useMutation(DECLINE_USERS);


    const rejectData = async (): Promise<void> => {
        let result = await WarningAlert({ title:"¡Atención!",text: "¿Estás seguro de declinar a este nuevo ingreso?", showDenyButton: true, confirmButtonText: "Declinar" });
        if (result.isConfirmed) {
            if (comment) {
                // await declineCandidate(state.collaborator.id, comment);
                declineUsers({
                    variables: {
                        declineUsersId: state.collaborator.id,
                    },
                  });

                dispatch({ type: Types.CANCEL_DECLINE_MODAL });
            } else ErrorAlert({ text: "Ingrese su comentario" })
        }
        setComment('');
    }
    return (
        <Dialog aria-labelledby="customized-dialog-title" open={state.declineModal} fullWidth={true}>
            <h2 id="form-dialog-title" className="text-center">Declinar Nuevo Ingreso</h2>
            <DialogContent>
                <Grid direction="row" container justify="center" alignItems="center">
                    <Grid item xs>
                        <TextField
                            variant="outlined"
                            type="text"
                            InputLabelProps={{ shrink: false, }}
                            name="Comentario"
                            size="small"
                            fullWidth={true}
                            multiline
                            rows={4}
                            placeholder="Detalla porque se quiere declinar al nuevo ingreso"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </DialogContent>

            <MuiDialogActions>
                <Button className="buttonCancel" onClick={() => dispatch({ type: Types.CANCEL_DECLINE_MODAL })}>
                    Cerrar
                </Button>
                <Button className="buttonSave" onClick={rejectData}>
                    Declinar
                </Button>
            </MuiDialogActions>
        </Dialog>
    )
}

export default DeclineModal;