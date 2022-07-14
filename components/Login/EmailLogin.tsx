import React, {useState, useContext} from "react";
import {  TextField } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { firebase, googleAuthProvider } from '../../firebase/firebase-config';
import { AttentionAlert2 } from "../../alerts/attentionAlert2";

const EmailLogin = () =>{
    const history = useHistory();
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const createModal = (Message: string) => {
        AttentionAlert2({text:Message})
        

    }

    const obtenerNombre = (e: any) =>{        
        if(e !== '') {
            setName(e)          
        }
    }

    const obtenerPassword = (e: any) =>{
        if(e !== '') {
            setPassword(e)            
        }
    }

    const singIn = () =>{
        
        if(name != "" && password != "") {

            firebase.auth().signInWithEmailAndPassword(name,password)
            .then((result) => {
                // User is signed in.
                // IdP data available in result.additionalUserInfo.profile.
            
                // Get the OAuth access token and ID Token
                //const credential = OAuthProvider.credentialFromResult(result);
                //const accessToken = credential.accessToken;
                //const idToken = credential.idToken;
                //console.log('Entro',result);
            })
            .catch((error) => {
                // Handle error.
                //console.log('No entro',error);

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

                
            });
        }else{
            createModal('Ingrese datos de usuario y contraseña')
        }
        
    }
    return (
        <>
            <div className='Conteiner-input'>
                <div className="div-input-standard-login">
                    <TextField
                    className="input-standard-login"
                    error={false}
                    type="text"
                    variant="outlined"
                    placeholder='E-mail'
                    onChange={(e: any) => obtenerNombre(e.target.value)}
                    />
                </div>
            </div>
            <div>
                <div className="div-input-standard-login">
                    <TextField
                    className="input-password-login"
                    error={false}
                    type="password"
                    inputProps={{style: { textAlign: 'left' }}}
                    variant="outlined"
                    placeholder='Contraseña'
                    onChange={(e: any) => obtenerPassword(e.target.value)}
                    />
                    
                </div>
            </div>
            <div className='conteiner-text-login'
            onClick = {() => history.push('/RecoverPassword')} 
            >
                ¿Olvidaste tu contraseña?
            </div>
            <div className='conteiner-botton-login'>
                <button onClick={singIn} className="boton-Header-login">
                    <div className="text-BotonHeader-login">
                        <b>Inciar sesión</b>
                    </div>
                </button> 
            </div>
            
        </>
    )
}

export default EmailLogin