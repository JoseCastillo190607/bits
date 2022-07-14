import { Grid, TextField } from '@material-ui/core';
import  '../components/Login/login.css';
import React, {useState} from "react";
import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { useHistory } from "react-router-dom";
import { AttentionAlert2 } from "../alerts/attentionAlert2";

const RecoverPassword = () => {
    const history = useHistory();

    const [name, setName] = useState('')
    const obtenerNombre = (e: any) =>{
        if(e !== '') {
            setName(e)          
        }
    }

    const createModal = (Message: string) => {
        AttentionAlert2({text:Message})
        

    }

    const sendEmail = () =>{
        if(name !== '') {
            firebase.auth().sendPasswordResetEmail(name).then(() => {
                // Password reset email sent!
                // ..
                //console.log('Envio correo');
                createModal('Se envió correo para restablecer contaseña.')
              })
              .catch((error) => {
                //const errorCode = error.code;
                //const errorMessage = error.message;
                //console.log(errorCode,errorMessage);

                if(error.code === 'auth/wrong-password'){
                    createModal('Contraseña inválida.')
                    
                }

                if(error.code === 'auth/too-many-requests'){
                    createModal('Acceso inhabilitado temporalmente debido a intentos fallidos de inicio de sesión. Puede restableciendo la contraseña o intentar más tarde.')
                }

                if(error.code === 'auth/invalid-email'){
                    createModal('Dirección de correo electrónico no existe.')
                }

                if(error.code === 'auth/user-not-found'){
                    createModal('Usuario incorrecto.')
                }
                
                // ..
              });
        }else{
            createModal('Agregue correo para restablecer contraseña.')
        }
        
    }

    return (
        <div>
            <Grid item className="login" container direction="row">
                <Grid item className="container-full-recover-password" container justify="center">
                    <div className='conteiner-recoverpasword'>
                        <div className='recoverpasword'>
                            <div className='conteiner-text-recoverpasword'>
                                <b>
                                    Recupera tu cuenta
                                </b>
                                
                            </div>
                            <div className='Conteiner-input-recoverpasword'>
                                <div className="div-input-standard-recoverpasword">
                                    <TextField
                                    className="input-standard-recoverpasword"
                                    error={false}
                                    type="text"
                                    variant="outlined"
                                    placeholder='E-mail'
                                    onChange={(e: any) => obtenerNombre(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='conteiner-botton-recoverpasword'>
                                <button onClick={sendEmail} className="boton-Header-recoverpasword">
                                    <div className="text-BotonHeader-recoverpasword">
                                        <b>Restablecer contraseña</b>
                                    </div>
                                </button> 
                            </div>

                            <div className='conteiner-text-recoverpasword-return'
                            >
                                <div className='return-icon'
                                 onClick = {() => history.push('/login')}
                                >
                                Regresar a “Inicio de sesión”
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>
                </Grid>
            </Grid>
        </div>
    )
};

export default RecoverPassword;