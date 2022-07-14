import { firebase, googleAuthProvider } from '../../firebase/firebase-config';
import { AttentionAlert2 } from "../../alerts/attentionAlert2";

const GoogleButton = () => {

    const createModal = (Message: string) => {
        AttentionAlert2({text:Message})
        

    }


    const singIn = async () => {
        await firebase.auth().signInWithPopup(googleAuthProvider)
        .then((result) => {

        })
        .catch((error) => {
            // Handle error.
            //console.log('No entro',error);

            if(error.code === 'auth/wrong-password'){
                //WarningAlert({ text: 'La contraseña no es válida o el usuario no tiene contraseña.' });
                createModal('Contraseña inválida.')
            }

            if(error.code === 'auth/too-many-requests'){
                //WarningAlert({ text: 'El acceso a esta cuenta se ha inhabilitado temporalmente debido a muchos intentos fallidos de inicio de sesión. Puede restaurarlo inmediatamente restableciendo su contraseña o puede volver a intentarlo más tarde.' });
                createModal('Acceso inhabilitado temporalmente debido a intentos fallidos de inicio de sesión. Puede restableciendo la contraseña o intentar más tarde.')
            }

            if(error.code === 'auth/invalid-email'){
                //WarningAlert({ text: 'La dirección de correo electrónico está mal formateada.' });
                createModal('Dirección de correo electrónico no existe.')
            }

            if(error.code === 'auth/user-not-found'){
                //WarningAlert({ text: 'No existe registro de usuario correspondiente a este identificador.' });
                createModal('Usuario incorrecto.')
            }

            if(error.code === 'auth/account-exists-with-different-credential'){
                //WarningAlert({ text: 'Ya existe una cuenta con la misma dirección de correo electrónico pero con diferentes credenciales de inicio de sesión. Inicie sesión con un proveedor asociado con esta dirección de correo electrónico.' });
                createModal('Existe cuenta con la dirección de correo electrónico con diferentes credenciales de inicio de sesión. Inicie sesión con un proveedor de dirección de correo electrónico diferente.')
            }
            
        });
    };
    return (
        <>
        <button id="GoogleButton" onClick={singIn}><b>INICIAR SESIÓN CON GOOGLE</b></button>
        </>
        
    );
};

export default GoogleButton;