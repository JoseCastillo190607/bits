import { createRef, useContext } from 'react';
import { Button, Dialog, DialogContent, TextField, DialogActions } from '@material-ui/core';
import ModalContext from '../../../context/ModalContext/ModalContext';
import { closeModal } from './Modal';
import SaveIcon from '@material-ui/icons/Save';

interface IAddRegisterModal {
    addFunc?: any;
    updateFunc: (text: string) => void;
}

const AddRegisterModal = ({ addFunc, updateFunc }: IAddRegisterModal) => {
    const { state, dispatch } = useContext(ModalContext);
    const text = createRef<any>();

    const onSubmit = (): void => {
        closeModal(dispatch);
        addFunc(text.current.value);
    }

    const onUpdate = (): void => {
        closeModal(dispatch);
        updateFunc(text.current.value);
    }

    return (
        <div>
            <Dialog open={state.open} aria-labelledby="form-dialog-title" maxWidth="xs" fullWidth={true}>
                <h2 id="form-dialog-title" data-testid="TitleModal">{state.title}</h2>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        type="text"
                        fullWidth
                        placeholder={state.title}
                        defaultValue={state.value}
                        required
                        inputRef={text}
                    />
                </DialogContent>
                <DialogActions>
                    <Button className="buttonCancel" placeholder={state.title} onClick={() => closeModal(dispatch)}>
                    Cerrar
                    </Button>
                    <Button type="submit" className="buttonSave" onClick={state.value ? onUpdate : onSubmit}>
                        {state.value ? 'Actualizar' : 'Agregar'} <SaveIcon />
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddRegisterModal;