import { useContext, useState } from "react";
import { Button, Dialog, DialogContent, Grid, TextField } from "@material-ui/core";
import MuiDialogActions from '@material-ui/core/DialogActions';
import CollaboratorContext, { Types } from "../../../context/CollaboratorContext/CollaboratorContext";
import { updateCollaborator } from "../../../helpers/Collaborator/Collaborator";
import { rejectInformation } from "../../../services/candidateService";
import { useHistory, useParams } from "react-router-dom";
import { ErrorAlert } from "../../../alerts/errorAlert";

const RejectInformation = () => {
    const { state, dispatch } = useContext(CollaboratorContext);
    const [comment, setComment] = useState<string>('');
    const { token } = useParams<any>();
    const params = useParams<any>();
    const history = useHistory();

    const rejectData = async (): Promise<void> => {
        if (comment) {
            state.collaborator.Estatus = "rejected";
            updateCollaborator(state, dispatch);
            await rejectInformation(token, comment);
            dispatch({ type: Types.CANCEL_REJECT_DATA });
            history.push(`/candidate/register/${params.token}/2`);
        } else ErrorAlert({ text: "Ingrese su comentario" })
    }
    return (
        <Dialog aria-labelledby="customized-dialog-title" open={state.rejectModal} fullWidth={true}>
            <h2 id="form-dialog-title" className="text-center">Rechazar Información</h2>
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
                            placeholder="Detalla que datos son los incorrectos"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </DialogContent>

            <MuiDialogActions>
                <Button className="buttonCancel" onClick={() => dispatch({ type: Types.CANCEL_REJECT_DATA })}>
                    Cerrar
                </Button>
                <Button className="buttonSave" onClick={rejectData}>
                    Enviar Comentario
                </Button>
            </MuiDialogActions>
        </Dialog>
    )
}

export default RejectInformation;