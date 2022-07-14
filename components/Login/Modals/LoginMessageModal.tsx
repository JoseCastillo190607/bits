import { ChangeEvent,useContext, useState } from "react";
import LoginContext from "../../../context/LoginContext/LoginContext";
import {clearMessageLoginModal} from "../../../context/LoginContext/Actions";
import {FormHelperText, Button, Dialog, DialogContent, TextField, DialogActions,Select, InputLabel,FormControl,MenuItem,FormControlLabel,Checkbox, Tabs, Tab } from "@material-ui/core"

interface TabMessage {
  children?: React.ReactNode;
  message: any;
};


export const LoginMessageModal = (props: TabMessage) => {
    const {message} = props
    const {state, dispatch} = useContext(LoginContext)
    
    
    const handleClose = ()=>{

      clearMessageLoginModal({}, dispatch);

  }
        
  return(
    <Dialog open={state.createMessageLogin} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth={true}>
        <DialogContent>
            <div className='conteiner-title-message-img'>
              <div className='conteiner-title-message'>
                ¡Atención!
              </div>
            </div>
            <div className='conteiner-text-message'>
                {message}
            </div>
            <div className='conteiner-botton-message'>
              <button onClick={handleClose} className="boton-Header-login">
                  <div className="text-BotonHeader-login">
                      <b>Cerrar</b>
                  </div>
              </button> 
          </div>
        </DialogContent>
    </Dialog>
  )
}