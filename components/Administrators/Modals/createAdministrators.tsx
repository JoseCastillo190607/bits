import { useContext } from "react"
import AdministratrosContext from "../../../context/AdministratorsContext/AdministratorsContext"
import { clearAdministratorsModal } from "../../../context/AdministratorsContext/Actions"
import { Button, Dialog, DialogContent, TextField, DialogActions  } from "@material-ui/core"

import SaveIcon from '@material-ui/icons/Save';

interface IAddRegisterModal {
  addFunc?: any;
}

export const CreateAdministrators = ({ addFunc }: IAddRegisterModal) =>{
  const {state, dispatch} = useContext(AdministratrosContext)
  const handleClose = ()=>{
    clearAdministratorsModal({}, dispatch);
  }

  const onSubmit = (): void => {
    handleClose();
    //   addFunc(text.current.value);
}

  return(
    <div>
    <Dialog open={state.createModal} aria-labelledby="form-dialog-title" maxWidth="xs" fullWidth={true}>
        <h2 id="form-dialog-title" data-testid="TitleModal">Agregar administrador</h2>
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                type="text"
                fullWidth
                placeholder="Agregar administrador"
                required
                // defaultValue={state.value}
                // inputRef={text}
            />
        </DialogContent>
        <DialogActions>
            <Button className="buttonCancel" placeholder="Agregar Administrador"onClick={() => handleClose()}>
            Cerrar
            </Button>
            <Button type="submit" className="buttonSave" onClick={onSubmit}>
                {'Agregar'} <SaveIcon />
            </Button>
        </DialogActions>
    </Dialog>
</div>
  )
}