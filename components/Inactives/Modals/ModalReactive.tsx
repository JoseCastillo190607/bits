import { Button, Dialog, DialogActions, DialogContent, TextField } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import ModalContext from "../../../context/ModalContext/ModalContext";
import { putInactiveCollaborator } from "../../../services/InactivesService";
import { closeModal } from "../../Team/Modals/Modal";
import {REACTIVATE_USERS,GET_ALL_USERS_INACTIVOS,GET_ALL_USERS_COLLABORATOR} from "../../../Querys/querys";
import { useMutation } from "@apollo/client";
import { SuccessfulAlert } from "../../../alerts/successAlerts";

const ModalReactive = () => {
    const { state, dispatch } = useContext(ModalContext);
    const [reactivateUser] = useMutation(REACTIVATE_USERS, {
        refetchQueries:[{query:GET_ALL_USERS_INACTIVOS},{query:GET_ALL_USERS_COLLABORATOR}],
    })
    const [date, setDate] = useState<string>('');
    useEffect(() => {
        const current = new Date();
        const year = current.getFullYear();
        const month = current.getMonth() + 1;
        const day = current.getDate();
        setDate(`${year}-${month < 9 ? '0' : ''}${month}-${day < 9 ? '0' : ''}${day}`);
        
    }, []);
    
    console.log('id', state._id)
    const putReactivarCollaborator = async () => {
        
        reactivateUser({
            variables:{
                id:state._id,
                input: {
                    FechaIngreso: date,
                },
            },
        }).then(()=>{
            SuccessfulAlert({text:"El usuario se ha reactivado correctamente"})
        })
        await closeModal(dispatch);
    }
    return (
        <div>
            <Dialog open={state.open} aria-labelledby="form-dialog-title" maxWidth="xs" fullWidth={true}>
                <h2 id="form-dialog-title" data-testid="TitleModal">Reactivando Colaborador</h2>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        type="date"
                        fullWidth
                        defaultValue={date}
                        required
                        onChange={(e) => setDate(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button className="buttonCancel" onClick={() => closeModal(dispatch)}>
                    Cerrar
                    </Button>
                    <Button type="submit" className="buttonSave" onClick={putReactivarCollaborator}>
                        Reactivar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default ModalReactive;