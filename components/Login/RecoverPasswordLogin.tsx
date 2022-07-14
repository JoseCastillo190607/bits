import { Grid, TextField} from '@material-ui/core';
import  './login.css';
import React, {useState, useContext, useEffect} from "react";
import { firebase, googleAuthProvider } from '../../firebase/firebase-config';
import { useHistory } from "react-router-dom";
import LoginContext from "../../context/LoginContext/LoginContext";
import {createMessageLoginModal} from '../../context/LoginContext/Actions'
import {LoginMessageModal} from './Modals/LoginMessageModal'

const RecoverPasswordLogin = () => {

    const [message, setMessage] = useState('')
    const {state,dispatch} = useContext(LoginContext)

    const createModal = (id:string, createModal:boolean) => {
        if(message !== ''){
            createMessageLoginModal({id, createModal},dispatch)
        }
        

    }
    useEffect(() =>{
        createModal('0',true)
    },[message])

    const history = useHistory();

    const [name, setName] = useState('')
    const obtenerNombre = (e: any) =>{
        if(e !== '') {
            setName(e)          
        }
    }

    const sendEmail = () =>{
        if(name !== '') {
            firebase.auth().sendPasswordResetEmail(name).then(() => {
                // Password reset email sent!
                // ..
                //console.log('Envio correo');
                setMessage('Correo para restablecer contraseña enviado.')
                
              })
              .catch((error) => {
                //const errorCode = error.code;
                //const errorMessage = error.message;
                //console.log('No entro',error);
                if(error.code === 'auth/user-not-found'){
                    //WarningAlert({ text: 'No existe registro de usuario correspondiente a este identificador.' });
                    setMessage('Usuario incorrecto.')
                }
                if(error.code === 'auth/invalid-email'){
                    setMessage('Dirección de correo electrónico no existe.')
                    //WarningAlert({ text: 'La dirección de correo electrónico está mal formateada.' });
                }
                // ..
              });
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
            {state.createMessageLogin ? <LoginMessageModal message={message}/>: null}
        </div>
    )
};

export default RecoverPasswordLogin;